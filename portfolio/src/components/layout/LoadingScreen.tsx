import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/context/AppContext'

export function LoadingScreen() {
  const { loading, setLoading, addLog } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      addLog('Animation: boot complete')
    }, 1800)
    return () => clearTimeout(timer)
  }, [setLoading, addLog])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="status"
          aria-label="Loading portfolio"
        >
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-[var(--accent)] border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.p
            className="mt-6 font-mono text-sm text-[var(--accent)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Initializing portfolio...
          </motion.p>
          <motion.div
            className="mt-4 w-48 h-1 rounded-full bg-white/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-[var(--accent)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </motion.div>
          <button
            type="button"
            className="mt-8 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            onClick={() => setLoading(false)}
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
