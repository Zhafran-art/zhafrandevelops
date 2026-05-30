import { useRef, useState } from 'react'
import { assetUrl } from '@/lib/assetUrl'

interface BeforeAfterSliderProps {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, x)))
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-[var(--border)]"
      onPointerDown={(e) => updatePosition(e.clientX)}
      onPointerMove={(e) => e.buttons > 0 && updatePosition(e.clientX)}
      role="slider"
      aria-label="Compare before and after"
      aria-valuenow={position}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <img src={assetUrl(after)} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={assetUrl(before)}
          alt={beforeLabel}
          className="absolute inset-0 h-full max-w-none object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? 800 }}
          loading="lazy"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-[var(--accent)]"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center text-[var(--accent)] text-xs">
          ⟷
        </div>
      </div>
      <span className="absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-mono glass">{beforeLabel}</span>
      <span className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-mono glass">{afterLabel}</span>
    </div>
  )
}
