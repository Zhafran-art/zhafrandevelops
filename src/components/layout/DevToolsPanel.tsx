import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export function DevToolsPanel() {
  const { devPanelOpen, setDevPanelOpen, logs } = useApp()

  return (
    <AnimatePresence>
      {devPanelOpen && (
        <motion.div
          className="fixed bottom-4 right-4 z-[70] w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="glass rounded-xl overflow-hidden border border-[var(--accent)]/30 font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-[var(--border)]">
              <span className="text-[var(--accent)]">DevTools Console</span>
              <button
                type="button"
                onClick={() => setDevPanelOpen(false)}
                className="p-1 hover:text-[var(--accent)]"
                aria-label="Close dev panel"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4 max-h-48 overflow-y-auto space-y-1 text-[var(--text-muted)]">
              {logs.map((log, i) => (
                <p key={i} className="text-[#4ade80]">
                  {log}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
