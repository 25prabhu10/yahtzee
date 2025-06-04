# Yahtzee Game

A simple implementation of the classic dice game Yahtzee in React. The game allows players to roll dice, score points based on combinations, and keep track of their scores. The game is designed to be played by one against an AI player, with each player taking turns to roll the dice and score points. The application is intended to be played on smartphones and has been optimized for mobile devices.

## Yahtzee

## Objective

Roll dice for scoring combinations, and get the highest score possible.

## Game Summary

On each turn, roll the dice up to 3 times to get the highest scoring combination for one of 13 categories. After you finish rolling, you must place a score or a zero in one of the 13 category boxes on your scorecard. The game ends when all players have filled in their 13 boxes. Scores are totalled, including any bonus points. The player with the highest total score wins.

### Turn Structure

1. **Roll the dice** - Roll all 5 dice
2. **Hold dice** (optional) - Select which dice to keep for your next roll
3. **Re-roll** (optional) - Roll remaining dice (up to 2 more times)
4. **Score** - Choose a category to score based on your final dice combination

### Scoring Categories

#### Upper Section (Ones through Sixes)

- **Ones**: Sum of all dice showing 1
- **Twos**: Sum of all dice showing 2  
- **Threes**: Sum of all dice showing 3
- **Fours**: Sum of all dice showing 4
- **Fives**: Sum of all dice showing 5
- **Sixes**: Sum of all dice showing 6

_Bonus: If upper section total ≥ 63 points, add 35 bonus points_

#### Lower Section (Combinations)

- **Three of a Kind**: At least 3 dice of same number → Sum of all dice
- **Four of a Kind**: At least 4 dice of same number → Sum of all dice
- **Full House**: 3 of one number + 2 of another → 25 points
- **Small Straight**: 4 consecutive numbers → 30 points
- **Large Straight**: 5 consecutive numbers → 40 points
- **Yahtzee**: All 5 dice same number → 50 points
- **Chance**: Any combination → Sum of all dice

### Special Rules

- **Yahtzee Bonus**: Additional Yahtzees after the first score 100 bonus points
- **Joker Rules**: If you roll a Yahtzee but already filled that category, you can use it as a "joker" in other categories
- **Scratching**: If you can't score in any category, you must enter 0 in a category of your choice

### Winning
The player with the highest total score (including bonuses) after all 13 categories are filled wins the game.
