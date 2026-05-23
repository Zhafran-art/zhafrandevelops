import { useEffect, useState } from 'react'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile

export function TerminalWidget() {
  const [lines, setLines] = useState<string[]>([])
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= data.terminalLines.length) return
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, data.terminalLines[lineIndex]!])
      setLineIndex((i) => i + 1)
    }, 400 + lineIndex * 300)
    return () => clearTimeout(timer)
  }, [lineIndex])

  return (
    <div
      className="glass rounded-xl overflow-hidden font-mono text-sm"
      role="region"
      aria-label="Terminal widget"
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)] bg-black/30">
        <span className="w-3 h-3 rounded-full bg-red-500/80" aria-hidden />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" aria-hidden />
        <span className="w-3 h-3 rounded-full bg-green-500/80" aria-hidden />
        <span className="ml-2 text-[var(--text-muted)] text-xs">terminal — zsh</span>
      </div>
      <div className="p-4 min-h-[160px] text-[var(--accent)]">
        {lines.map((line, i) => (
          <p key={i} className={line.startsWith('$') ? 'text-[var(--text-muted)] mt-2' : ''}>
            {line}
          </p>
        ))}
        <span className="inline-block w-2 h-4 bg-[var(--accent)] animate-pulse ml-1" aria-hidden />
      </div>
    </div>
  )
}
