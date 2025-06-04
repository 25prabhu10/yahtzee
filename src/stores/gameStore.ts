import { create } from 'zustand'

export type Die = {
  value: number
  held: boolean
}

export type ScoreCategory =
  | 'ones'
  | 'twos'
  | 'threes'
  | 'fours'
  | 'fives'
  | 'sixes'
  | 'threeOfAKind'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'smallStraight'
  | 'largeStraight'
  | 'yahtzee'
  | 'chance'

export type Player = {
  name: string
  scores: Record<ScoreCategory, number | null>
  totalScore: number
  upperSectionBonus: boolean
}

export type GameState = {
  currentPlayer: 'human' | 'ai'
  dice: Die[]
  rollsLeft: number
  gamePhase: 'rolling' | 'scoring' | 'gameOver'
  turn: number
  human: Player
  ai: Player
  winner: 'human' | 'ai' | null
  lastScoredCategory: ScoreCategory | null
}

type GameActions = {
  rollDice: () => void
  toggleDieHold: (index: number) => void
  scoreCategory: (category: ScoreCategory) => void
  resetGame: () => void
  aiTurn: () => void
}

const initialPlayer = (): Player => ({
  name: '',
  scores: {
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    yahtzee: null,
    chance: null,
  },
  totalScore: 0,
  upperSectionBonus: false,
})

const rollDie = () => Math.floor(Math.random() * 6) + 1

const calculateScore = (dice: number[], category: ScoreCategory): number => {
  const counts = dice.reduce(
    (acc, die) => {
      acc[die] = (acc[die] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  const sum = dice.reduce((a, b) => a + b, 0)
  const sortedDice = [...dice].sort((a, b) => a - b)

  switch (category) {
    case 'ones':
      return dice.filter((d) => d === 1).length * 1
    case 'twos':
      return dice.filter((d) => d === 2).length * 2
    case 'threes':
      return dice.filter((d) => d === 3).length * 3
    case 'fours':
      return dice.filter((d) => d === 4).length * 4
    case 'fives':
      return dice.filter((d) => d === 5).length * 5
    case 'sixes':
      return dice.filter((d) => d === 6).length * 6
    case 'threeOfAKind':
      return Object.values(counts).some((count) => count >= 3) ? sum : 0
    case 'fourOfAKind':
      return Object.values(counts).some((count) => count >= 4) ? sum : 0
    case 'fullHouse':
      const hasThree = Object.values(counts).includes(3)
      const hasTwo = Object.values(counts).includes(2)
      return hasThree && hasTwo ? 25 : 0
    case 'smallStraight':
      const smallStraights = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
      ]
      return smallStraights.some((straight) =>
        straight.every((num) => dice.includes(num)),
      )
        ? 30
        : 0
    case 'largeStraight':
      const largeStraights = [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
      ]
      return largeStraights.some((straight) =>
        straight.every((num) => dice.includes(num)),
      )
        ? 40
        : 0
    case 'yahtzee':
      return Object.values(counts).includes(5) ? 50 : 0
    case 'chance':
      return sum
    default:
      return 0
  }
}

const calculateTotalScore = (player: Player): number => {
  let total = 0
  let upperSectionSum = 0

  // Upper section
  const upperCategories: ScoreCategory[] = [
    'ones',
    'twos',
    'threes',
    'fours',
    'fives',
    'sixes',
  ]
  upperCategories.forEach((category) => {
    const score = player.scores[category]
    if (score !== null) {
      total += score
      upperSectionSum += score
    }
  })

  // Upper section bonus
  if (upperSectionSum >= 63) {
    total += 35
  }

  // Lower section
  const lowerCategories: ScoreCategory[] = [
    'threeOfAKind',
    'fourOfAKind',
    'fullHouse',
    'smallStraight',
    'largeStraight',
    'yahtzee',
    'chance',
  ]
  lowerCategories.forEach((category) => {
    const score = player.scores[category]
    if (score !== null) {
      total += score
    }
  })

  return total
}

const getAIChoice = (
  dice: number[],
  availableCategories: ScoreCategory[],
): ScoreCategory => {
  const scores = availableCategories.map((category) => ({
    category,
    score: calculateScore(dice, category),
  }))

  // Priority logic for AI
  const yahtzeeScore = scores.find((s) => s.category === 'yahtzee')
  if (yahtzeeScore && yahtzeeScore.score > 0) return 'yahtzee'

  const largeStraightScore = scores.find((s) => s.category === 'largeStraight')
  if (largeStraightScore && largeStraightScore.score > 0) return 'largeStraight'

  const fullHouseScore = scores.find((s) => s.category === 'fullHouse')
  if (fullHouseScore && fullHouseScore.score > 0) return 'fullHouse'

  const smallStraightScore = scores.find((s) => s.category === 'smallStraight')
  if (smallStraightScore && smallStraightScore.score > 0) return 'smallStraight'

  // Choose highest scoring option
  scores.sort((a, b) => b.score - a.score)
  return scores[0].category
}

const getAIDiceStrategy = (dice: Die[], rollsLeft: number) => {
  if (rollsLeft === 0) return dice

  const values = dice.map((d) => d.value)
  const counts = values.reduce(
    (acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  // Check for Yahtzee potential
  const maxCount = Math.max(...Object.values(counts))
  if (maxCount >= 3) {
    const targetValue = parseInt(
      Object.keys(counts).find((key) => counts[parseInt(key)] === maxCount)!,
    )
    return dice.map((die) => ({
      ...die,
      held: die.value === targetValue,
    }))
  }

  // Check for straight potential
  const sortedUnique = Array.from(new Set(values)).sort((a, b) => a - b)
  if (sortedUnique.length >= 4) {
    // Keep dice that form potential straight
    return dice.map((die) => ({
      ...die,
      held: true,
    }))
  }

  // Keep pairs and higher
  return dice.map((die) => ({
    ...die,
    held: counts[die.value] >= 2,
  }))
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  currentPlayer: 'human',
  dice: Array(5)
    .fill(null)
    .map(() => ({ value: rollDie(), held: false })),
  rollsLeft: 3,
  gamePhase: 'rolling',
  turn: 1,
  human: { ...initialPlayer(), name: 'You' },
  ai: { ...initialPlayer(), name: 'AI' },
  winner: null,
  lastScoredCategory: null,

  rollDice: () => {
    const state = get()
    if (state.rollsLeft === 0 || state.gamePhase !== 'rolling') return

    const newDice = state.dice.map((die) =>
      die.held ? die : { ...die, value: rollDie() },
    )

    set({
      dice: newDice,
      rollsLeft: state.rollsLeft - 1,
      gamePhase: state.rollsLeft === 1 ? 'scoring' : 'rolling',
    })
  },

  toggleDieHold: (index: number) => {
    const state = get()
    if (state.currentPlayer !== 'human' || state.rollsLeft === 3) return

    const newDice = [...state.dice]
    newDice[index] = { ...newDice[index], held: !newDice[index].held }
    set({ dice: newDice })
  },

  scoreCategory: (category: ScoreCategory) => {
    const state = get()
    if (state.gamePhase !== 'scoring') return

    const currentPlayerData =
      state.currentPlayer === 'human' ? state.human : state.ai
    if (currentPlayerData.scores[category] !== null) return

    const diceValues = state.dice.map((d) => d.value)
    const score = calculateScore(diceValues, category)

    const updatedPlayer = {
      ...currentPlayerData,
      scores: { ...currentPlayerData.scores, [category]: score },
    }
    updatedPlayer.totalScore = calculateTotalScore(updatedPlayer)
    updatedPlayer.upperSectionBonus =
      ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].reduce(
        (sum, cat) => sum + (updatedPlayer.scores[cat as ScoreCategory] || 0),
        0,
      ) >= 63

    const isGameOver = Object.values(updatedPlayer.scores).every(
      (score) => score !== null,
    )
    const bothPlayersFinished =
      isGameOver &&
      Object.values(
        state.currentPlayer === 'human' ? state.ai.scores : state.human.scores,
      ).every((score) => score !== null)

    let winner = null
    if (bothPlayersFinished) {
      const humanTotal =
        state.currentPlayer === 'human'
          ? updatedPlayer.totalScore
          : state.human.totalScore
      const aiTotal =
        state.currentPlayer === 'ai'
          ? updatedPlayer.totalScore
          : state.ai.totalScore
      winner = humanTotal > aiTotal ? 'human' : 'ai'
    }

    set({
      [state.currentPlayer]: updatedPlayer,
      currentPlayer: state.currentPlayer === 'human' ? 'ai' : 'human',
      dice: Array(5)
        .fill(null)
        .map(() => ({ value: rollDie(), held: false })),
      rollsLeft: 3,
      gamePhase: bothPlayersFinished ? 'gameOver' : 'rolling',
      turn: state.currentPlayer === 'ai' ? state.turn + 1 : state.turn,
      winner,
      lastScoredCategory: category,
    })

    // Trigger AI turn if it's AI's turn next
    if (state.currentPlayer === 'human' && !bothPlayersFinished) {
      setTimeout(() => get().aiTurn(), 1000)
    }
  },

  aiTurn: () => {
    const state = get()
    if (state.currentPlayer !== 'ai') return

    // AI rolling strategy
    let currentDice = [...state.dice]
    let rollsLeft = 3

    const performAIRolls = () => {
      if (rollsLeft > 0) {
        // Apply AI strategy for holding dice
        currentDice = getAIDiceStrategy(currentDice, rollsLeft)

        // Roll unheld dice
        currentDice = currentDice.map((die) =>
          die.held ? die : { ...die, value: rollDie() },
        )

        rollsLeft--

        set({
          dice: currentDice,
          rollsLeft,
          gamePhase: rollsLeft === 0 ? 'scoring' : 'rolling',
        })

        if (rollsLeft > 0) {
          setTimeout(performAIRolls, 1000)
        } else {
          setTimeout(() => {
            // AI scoring
            const availableCategories = Object.keys(state.ai.scores).filter(
              (key) => state.ai.scores[key as ScoreCategory] === null,
            ) as ScoreCategory[]

            if (availableCategories.length > 0) {
              const choice = getAIChoice(
                currentDice.map((d) => d.value),
                availableCategories,
              )
              get().scoreCategory(choice)
            }
          }, 1000)
        }
      }
    }

    setTimeout(performAIRolls, 500)
  },

  resetGame: () => {
    set({
      currentPlayer: 'human',
      dice: Array(5)
        .fill(null)
        .map(() => ({ value: rollDie(), held: false })),
      rollsLeft: 3,
      gamePhase: 'rolling',
      turn: 1,
      human: { ...initialPlayer(), name: 'You' },
      ai: { ...initialPlayer(), name: 'AI' },
      winner: null,
      lastScoredCategory: null,
    })
  },
}))
