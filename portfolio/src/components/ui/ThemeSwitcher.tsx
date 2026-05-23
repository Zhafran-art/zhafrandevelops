import { Palette } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import type { ThemeId } from '@/types'

const THEMES: { id: ThemeId; label: string }[] = [
  { id: 'dark', label: 'Dark' },
  { id: 'darker', label: 'Darker' },
  { id: 'retro', label: 'Terminal' },
]

export function ThemeSwitcher() {
  const { theme, setTheme, playClick } = useApp()

  const cycle = () => {
    const idx = THEMES.findIndex((t) => t.id === theme)
    const next = THEMES[(idx + 1) % THEMES.length]!
    setTheme(next.id)
    playClick()
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
      aria-label={`Theme: ${theme}. Click to change.`}
      title={`Theme: ${THEMES.find((t) => t.id === theme)?.label}`}
    >
      <Palette size={18} />
    </button>
  )
}
