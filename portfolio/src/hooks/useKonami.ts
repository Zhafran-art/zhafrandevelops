import { useEffect } from 'react'
import { useApp } from '@/context/AppContext'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonami() {
  const { setMatrixMode, addLog } = useApp()
  const indexRef = { current: 0 }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = KONAMI[indexRef.current]
      const match =
        expected === key ||
        (expected === 'b' && key === 'b') ||
        (expected === 'a' && key === 'a')

      if (match) {
        indexRef.current++
        if (indexRef.current === KONAMI.length) {
          setMatrixMode(true)
          addLog('Easter egg unlocked: Matrix mode')
          indexRef.current = 0
          setTimeout(() => setMatrixMode(false), 8000)
        }
      } else {
        indexRef.current = key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setMatrixMode, addLog])
}
