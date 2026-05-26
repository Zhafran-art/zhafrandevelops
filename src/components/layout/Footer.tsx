import { useState } from 'react'
import { motion } from 'framer-motion'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile
const year = new Date().getFullYear()

export function Footer() {
  const [bounce, setBounce] = useState(false)

  return (
    <footer className="border-t border-[var(--border)] py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
        <p>© {year} {data.shortName}. All rights reserved.</p>
        <button
          type="button"
          onClick={() => setBounce(true)}
          className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
          aria-label="Easter egg"
        >
          Built with
          <motion.span
            animate={bounce ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => setBounce(false)}
            className="text-[var(--accent)] font-mono"
          >
            {'</>'}
          </motion.span>
          React + Vite
        </button>
      </div>
    </footer>
  )
}
