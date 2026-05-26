import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/context/AppContext'

const SHORTCUTS = [
  { key: 'P', action: 'Go to Projects' },
  { key: 'S', action: 'Go to Study' },
  { key: 'C', action: 'Go to Certificates' },
  { key: 'A', action: 'Go to About' },
  { key: 'H', action: 'Go to Home' },
  { key: 'O', action: 'Go to Contact' },
  { key: '?', action: 'Show this help' },
  { key: 'Esc', action: 'Close overlays' },
]

export function ShortcutHelp() {
  const { shortcutHelpOpen, setShortcutHelpOpen } = useApp()

  return (
    <AnimatePresence>
      {shortcutHelpOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShortcutHelpOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-labelledby="shortcut-title"
            className="relative glass rounded-xl p-8 max-w-sm w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 id="shortcut-title" className="font-display text-xl font-bold mb-4">
              Keyboard Shortcuts
            </h2>
            <ul className="space-y-2">
              {SHORTCUTS.map(({ key, action }) => (
                <li key={key} className="flex justify-between text-sm">
                  <kbd className="px-2 py-0.5 rounded bg-black/40 font-mono text-[var(--accent)]">{key}</kbd>
                  <span className="text-[var(--text-muted)]">{action}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              Try the Konami code for a surprise ↑↑↓↓←→←→BA
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
