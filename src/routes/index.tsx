import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [diceAnimation, setDiceAnimation] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const funnyMessages = [
    '🎲 Where luck meets skill... mostly luck though',
    '🎯 Five dice, infinite possibilities, questionable decisions',
    '⚡ Roll your way to glory (or spectacular failure)',
    '🏆 Yahtzee: Making statisticians cry since 1956',
  ]

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % funnyMessages.length)
    }, 5000)

    const diceInterval = setInterval(() => {
      setDiceAnimation(true)
      setTimeout(() => setDiceAnimation(false), 600)
    }, 4000)

    return () => {
      clearInterval(messageInterval)
      clearInterval(diceInterval)
    }
  }, [])

  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-12 min-h-svh text-white relative overflow-hidden">
      <header className="flex flex-col gap-6 text-center z-10 max-w-4xl px-4">
        <div className="relative">
          <h1
            className={`flex flex-col gap-4 text-7xl pb-8 md:text-8xl font-bold transition-transform duration-600 ${
              diceAnimation ? 'scale-110 rotate-2' : ''
            }`}
          >
            <span>🎲</span>YAHTZEE<span>🎲</span>
          </h1>
          <div className="absolute -top-4 -right-4 text-2xl animate-pulse">
            ✨
          </div>
        </div>

        <p className="text-xl md:text-2xl font-medium text-blue-200 transition-all duration-500 min-h-[3rem] flex items-center justify-center">
          {funnyMessages[currentMessage]}
        </p>

        <div className="text-sm text-gray-300 space-y-1">
          <p className="text-xs opacity-75">
            Warning: May cause uncontrollable excitement and victory dances
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 items-center z-10">
        <Link
          to="/game"
          className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 hover:from-green-400 hover:to-emerald-500"
        >
          <span className="relative z-10">
            <div className="inline-block animate-bounce">🚀</div> Start Your
            Adventure!
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </Link>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center">
        <p>Made with a lot of ☕</p>
        <p className="mt-1">May the odds be ever in your favour! 🍀</p>
      </div>
    </section>
  )
}
