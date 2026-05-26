import { useEffect } from 'react'
import { useApp } from '@/context/AppContext'

const SECTIONS: Record<string, string> = {
  p: 'projects',
  s: 'study',
  c: 'certificates',
  a: 'about',
  h: 'hero',
  o: 'contact',
}

export function useKeyboardShortcuts() {
  const { setShortcutHelpOpen, addLog, playClick } = useApp()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setShortcutHelpOpen(true)
        addLog('Shortcut help opened')
        return
      }

      if (e.key === 'Escape') {
        setShortcutHelpOpen(false)
        return
      }

      const section = SECTIONS[e.key.toLowerCase()]
      if (section) {
        e.preventDefault()
        const el = document.getElementById(section)
        el?.scrollIntoView({ behavior: 'smooth' })
        addLog(`Navigated to: ${section}`)
        playClick()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setShortcutHelpOpen, addLog, playClick])
}
