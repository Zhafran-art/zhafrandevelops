import { Palette } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { PALETTE_OPTIONS } from '@/data/palettes'

export function PaletteSwitcher() {
  const { palette, reopenPalettePicker, playClick } = useApp()
  const label = PALETTE_OPTIONS.find((p) => p.id === palette)?.name ?? 'Palette'

  return (
    <button
      type="button"
      onClick={() => {
        playClick()
        reopenPalettePicker()
      }}
      className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
      aria-label={`Color palette: ${label}. Click to change.`}
      title={`Palette: ${label}`}
    >
      <Palette size={18} />
    </button>
  )
}
