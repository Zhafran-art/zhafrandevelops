import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ThemeId } from '@/types'

interface AppContextValue {
  theme: ThemeId
  setTheme: (t: ThemeId) => void
  soundOn: boolean
  toggleSound: () => void
  reducedMotion: boolean
  loading: boolean
  setLoading: (v: boolean) => void
  matrixMode: boolean
  setMatrixMode: (v: boolean) => void
  devPanelOpen: boolean
  setDevPanelOpen: (v: boolean) => void
  logs: string[]
  addLog: (msg: string) => void
  shortcutHelpOpen: boolean
  setShortcutHelpOpen: (v: boolean) => void
  playClick: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('dark')
  const [soundOn, setSoundOn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [matrixMode, setMatrixMode] = useState(false)
  const [devPanelOpen, setDevPanelOpen] = useState(false)
  const [shortcutHelpOpen, setShortcutHelpOpen] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] Portfolio boot sequence initiated`,
  ])

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const addLog = useCallback((msg: string) => {
    const line = `[${new Date().toLocaleTimeString()}] ${msg}`
    setLogs((prev) => [...prev.slice(-49), line])
  }, [])

  const setTheme = useCallback(
    (t: ThemeId) => {
      setThemeState(t)
      document.documentElement.setAttribute('data-theme', t)
      addLog(`Theme switched: ${t}`)
    },
    [addLog],
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const playClick = useCallback(() => {
    if (!soundOn || reducedMotion) return
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.08)
    } catch {
      /* ignore */
    }
  }, [soundOn, reducedMotion])

  const toggleSound = useCallback(() => {
    setSoundOn((s) => {
      addLog(s ? 'Sound disabled' : 'Sound enabled')
      return !s
    })
  }, [addLog])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      soundOn,
      toggleSound,
      reducedMotion,
      loading,
      setLoading,
      matrixMode,
      setMatrixMode,
      devPanelOpen,
      setDevPanelOpen,
      logs,
      addLog,
      shortcutHelpOpen,
      setShortcutHelpOpen,
      playClick,
    }),
    [
      theme,
      setTheme,
      soundOn,
      toggleSound,
      reducedMotion,
      loading,
      matrixMode,
      devPanelOpen,
      logs,
      addLog,
      shortcutHelpOpen,
      playClick,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
