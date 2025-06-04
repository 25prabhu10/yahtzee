import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useGameStore, type ScoreCategory } from '../stores/gameStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/game')({
  component: Game,
})

const DiceDisplay = ({ value }: { value: number }) => {
  const faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
  return <div className="text-6xl">{faces[value]}</div>
}

const ScoreCard = ({
  player,
  isCurrentPlayer,
  onScore,
}: {
  player: any
  isCurrentPlayer: boolean
  onScore?: (category: ScoreCategory) => void
}) => {
  const { dice, gamePhase } = useGameStore()
  const diceValues = dice.map((d) => d.value)

  const calculateScore = (category: ScoreCategory): number => {
    const counts = diceValues.reduce(
      (acc, die) => {
        acc[die] = (acc[die] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    const sum = diceValues.reduce((a, b) => a + b, 0)

    switch (category) {
      case 'ones':
        return diceValues.filter((d) => d === 1).length * 1
      case 'twos':
        return diceValues.filter((d) => d === 2).length * 2
      case 'threes':
        return diceValues.filter((d) => d === 3).length * 3
      case 'fours':
        return diceValues.filter((d) => d === 4).length * 4
      case 'fives':
        return diceValues.filter((d) => d === 5).length * 5
      case 'sixes':
        return diceValues.filter((d) => d === 6).length * 6
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
          straight.every((num) => diceValues.includes(num)),
        )
          ? 30
          : 0
      case 'largeStraight':
        const largeStraights = [
          [1, 2, 3, 4, 5],
          [2, 3, 4, 5, 6],
        ]
        return largeStraights.some((straight) =>
          straight.every((num) => diceValues.includes(num)),
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

  const ScoreRow = ({
    category,
    label,
    fixedScore,
  }: {
    category: ScoreCategory
    label: string
    fixedScore?: number
  }) => {
    const isScored = player.scores[category] !== null
    const potentialScore = fixedScore || calculateScore(category)
    const canScore =
      isCurrentPlayer && gamePhase === 'scoring' && !isScored && onScore

    return (
      <tr
        className={`border-b border-gray-600 ${canScore ? 'hover:bg-blue-900/30 cursor-pointer' : ''}`}
        onClick={() => canScore && onScore(category)}
      >
        <td className="px-4 py-2 text-left">{label}</td>
        <td className="px-4 py-2 text-center">
          {isScored ? (
            <span className="font-bold text-green-400">
              {player.scores[category]}
            </span>
          ) : canScore ? (
            <span className="text-yellow-400 font-bold">{potentialScore}</span>
          ) : (
            <span className="text-gray-500">-</span>
          )}
        </td>
      </tr>
    )
  }

  const upperSectionSum = [
    'ones',
    'twos',
    'threes',
    'fours',
    'fives',
    'sixes',
  ].reduce((sum, cat) => sum + (player.scores[cat as ScoreCategory] || 0), 0)

  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 ${isCurrentPlayer ? 'ring-2 ring-blue-400' : ''}`}
    >
      <h3 className="text-xl font-bold mb-4 text-center">
        {player.name}
        {isCurrentPlayer && (
          <span className="text-blue-400 ml-2">← Current</span>
        )}
      </h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-600">
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          <ScoreRow category="ones" label="Ones" />
          <ScoreRow category="twos" label="Twos" />
          <ScoreRow category="threes" label="Threes" />
          <ScoreRow category="fours" label="Fours" />
          <ScoreRow category="fives" label="Fives" />
          <ScoreRow category="sixes" label="Sixes" />

          <tr className="border-b-2 border-gray-400 bg-gray-700">
            <td className="px-4 py-2 font-bold">Upper Sum</td>
            <td className="px-4 py-2 text-center font-bold">
              {upperSectionSum}
            </td>
          </tr>
          <tr className="border-b border-gray-600">
            <td className="px-4 py-2">Bonus (63+)</td>
            <td className="px-4 py-2 text-center">
              {upperSectionSum >= 63 ? '+35' : '0'}
            </td>
          </tr>

          <ScoreRow category="threeOfAKind" label="3 of a Kind" />
          <ScoreRow category="fourOfAKind" label="4 of a Kind" />
          <ScoreRow category="fullHouse" label="Full House" fixedScore={25} />
          <ScoreRow
            category="smallStraight"
            label="Small Straight"
            fixedScore={30}
          />
          <ScoreRow
            category="largeStraight"
            label="Large Straight"
            fixedScore={40}
          />
          <ScoreRow category="yahtzee" label="YAHTZEE" fixedScore={50} />
          <ScoreRow category="chance" label="Chance" />

          <tr className="border-t-2 border-gray-400 bg-gray-700">
            <td className="px-4 py-2 font-bold text-lg">TOTAL</td>
            <td className="px-4 py-2 text-center font-bold text-lg text-yellow-400">
              {player.totalScore}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Game() {
  const {
    currentPlayer,
    dice,
    rollsLeft,
    gamePhase,
    turn,
    human,
    ai,
    winner,
    lastScoredCategory,
    rollDice,
    toggleDieHold,
    scoreCategory,
    resetGame,
    aiTurn,
  } = useGameStore()

  useEffect(() => {
    if (currentPlayer === 'ai' && gamePhase === 'rolling') {
      aiTurn()
    }
  }, [currentPlayer, gamePhase, aiTurn])

  if (winner) {
    return (
      <section className="flex flex-col items-center justify-center gap-8 min-h-svh bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold">🎉 Game Over! 🎉</h1>
          <div className="text-4xl">
            {winner === 'human' ? '🏆 You Win!' : '🤖 AI Wins!'}
          </div>
          <div className="text-xl space-y-2">
            <p>
              Your Score:{' '}
              <span className="font-bold text-yellow-400">
                {human.totalScore}
              </span>
            </p>
            <p>
              AI Score:{' '}
              <span className="font-bold text-yellow-400">{ai.totalScore}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              🎲 Play Again
            </button>
            <Link
              to="/"
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold"
            >
              🏠 Home
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-svh bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-1">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 grid-rows-1 mb-6">
          <div
            className={`p-1 rounded-sm ${
              currentPlayer === 'human' ? 'bg-red-600' : 'bg-red-900/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold">{human.totalScore}</div>
              <div className="text-sm text-gray-300">Batman</div>
            </div>
          </div>
          <div
            className={`px-4 rounded-lg ${
              currentPlayer === 'ai' ? 'bg-red-600' : 'bg-red-900/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl  font-bold">{ai.totalScore}</div>
              <div className="text-sm text-gray-300">Superman</div>
            </div>
          </div>
        </div>

          <div>
            <ScoreCard
              player={human}
              isCurrentPlayer={currentPlayer === 'human'}
              onScore={currentPlayer === 'human' ? scoreCategory : undefined}
            />

          {/* Game Area */}
          <div className="flex flex-col gap-6">
            {/* Current Player Indicator */}
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">
                {currentPlayer === 'human' ? '🎯 Your Turn' : '🤖 AI Turn'}
              </h2>
              <p className="text-gray-300">
                {gamePhase === 'rolling'
                  ? `${rollsLeft} rolls left`
                  : 'Choose a category to score'}
              </p>
              {lastScoredCategory && (
                <p className="text-sm text-blue-400 mt-2">
                  Last scored:{' '}
                  {lastScoredCategory.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </p>
              )}
            </div>

            {/* Dice Area */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-center gap-4 mb-6">
                {dice.map((die, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDieHold(index)}
                    disabled={currentPlayer !== 'human'}
                    className={`
                      w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all
                      ${
                        die.held
                          ? 'bg-yellow-600 border-yellow-400 shadow-lg'
                          : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                      }
                      ${currentPlayer === 'human' && rollsLeft < 3 ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    <DiceDisplay value={die.value} />
                  </button>
                ))}
              </div>

              {currentPlayer === 'human' &&
                gamePhase === 'rolling' &&
                rollsLeft > 0 && (
                  <div className="text-center">
                    <button
                      onClick={rollDice}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg"
                    >
                      🎲 Roll Dice ({rollsLeft} left)
                    </button>
                    {rollsLeft < 3 && (
                      <p className="text-sm text-gray-400 mt-2">
                        Click dice to hold them before rolling again
                      </p>
                    )}
                  </div>
                )}

              {currentPlayer === 'human' && gamePhase === 'scoring' && (
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-lg">
                    Choose a category to score in your scorecard!
                  </p>
                </div>
              )}

              {currentPlayer === 'ai' && (
                <div className="text-center">
                  <p className="text-blue-400 font-bold text-lg animate-pulse">
                    🤖 AI is thinking...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AI Scorecard */}
          <div>
            <ScoreCard player={ai} isCurrentPlayer={currentPlayer === 'ai'} />
          </div>
        </div>
      </div>
    </section>
  )
}
