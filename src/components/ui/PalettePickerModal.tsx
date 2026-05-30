import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { PALETTE_OPTIONS } from '@/data/palettes'
import type { PaletteId } from '@/types'

export function PalettePickerModal() {
  const { loading, paletteReady, palette, confirmPalette, playClick, reducedMotion } = useApp()

  const visible = !loading && !paletteReady

  const select = (id: PaletteId) => {
    playClick()
    confirmPalette(id)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-labelledby="palette-picker-title"
        >
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          <motion.div
            className="relative w-full max-w-3xl glass rounded-2xl p-6 sm:p-10 border border-[var(--border)] shadow-2xl"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <p className="font-mono text-xs text-[var(--accent)] mb-2">// boot_complete</p>
            <h2 id="palette-picker-title" className="font-display text-2xl sm:text-3xl font-bold">
              Select Main Color-Palette
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)] max-w-xl">
              Choose how the portfolio should feel. You can change this anytime from the palette
              button in the navigation bar.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {PALETTE_OPTIONS.map((option, index) => {
                const selected = palette === option.id
                return (
                  <li key={option.id}>
                    <motion.button
                      type="button"
                      onClick={() => select(option.id)}
                      className={`group w-full text-left rounded-xl border p-4 transition-colors ${
                        selected
                          ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                          : 'border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-white/5'
                      }`}
                      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * index }}
                      whileHover={reducedMotion ? undefined : { y: -4 }}
                      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    >
                      <div className="flex gap-2 mb-4">
                        {option.preview.map((color) => (
                          <span
                            key={color}
                            className="h-10 flex-1 rounded-lg border border-white/10 shadow-inner"
                            style={{ background: color }}
                            aria-hidden
                          />
                        ))}
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display font-semibold text-lg group-hover:text-[var(--accent)] transition-colors">
                            {option.name}
                          </h3>
                          <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                        {selected && (
                          <span className="shrink-0 rounded-full bg-[var(--accent)] p-1 text-[var(--bg)]">
                            <Check size={14} aria-hidden />
                          </span>
                        )}
                      </div>
                      <span className="mt-4 inline-block font-mono text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                        Apply palette →
                      </span>
                    </motion.button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
