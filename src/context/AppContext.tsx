import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PALETTE_STORAGE_KEY } from '@/data/palettes'
import type { PaletteId } from '@/types'

function isPaletteId(value: string | null): value is PaletteId {
  return value === 'crimson' || value === 'emerald' || value === 'violet'
}

function readStoredPalette(): PaletteId | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(PALETTE_STORAGE_KEY)
  return isPaletteId(stored) ? stored : null
}

interface AppContextValue {
  palette: PaletteId
  paletteReady: boolean
  confirmPalette: (palette: PaletteId) => void
  reopenPalettePicker: () => void
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
  const storedOnMount = readStoredPalette()
  const [palette, setPalette] = useState<PaletteId>(storedOnMount ?? 'crimson')
  const [paletteReady, setPaletteReady] = useState(false)
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

  const applyPalette = useCallback((next: PaletteId) => {
    setPalette(next)
    document.documentElement.setAttribute('data-theme', next)
  }, [])

  const confirmPalette = useCallback(
    (next: PaletteId) => {
      applyPalette(next)
      localStorage.setItem(PALETTE_STORAGE_KEY, next)
      setPaletteReady(true)
      addLog(`Color palette applied: ${next}`)
    },
    [addLog, applyPalette],
  )

  const reopenPalettePicker = useCallback(() => {
    setPaletteReady(false)
    addLog('Palette picker reopened')
  }, [addLog])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', palette)
  }, [palette])

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
      palette,
      paletteReady,
      confirmPalette,
      reopenPalettePicker,
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
      palette,
      paletteReady,
      confirmPalette,
      reopenPalettePicker,
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
