import { useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { matrixMode } = useApp()

  useEffect(() => {
    if (!matrixMode) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコサシスセソ'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = Array(Math.floor(columns)).fill(1)

    let raf = 0
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#4ade80'
      ctx.font = `${fontSize}px monospace`

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)]!
        ctx.fillText(text, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]! += 1
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(raf)
  }, [matrixMode])

  return (
    <canvas
      ref={canvasRef}
      className={`matrix-overlay ${matrixMode ? 'active' : ''}`}
      aria-hidden
    />
  )
}
