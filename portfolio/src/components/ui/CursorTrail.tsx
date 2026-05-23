import { useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'

interface Particle {
  x: number
  y: number
  life: number
  vx: number
  vy: number
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reducedMotion } = useApp()

  useEffect(() => {
    if (reducedMotion) return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const particles: Particle[] = []
    let mx = 0
    let my = 0
    let raf = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx,
          y: my,
          life: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2)
        ctx.fillStyle = accent || '#22d3ee'
        ctx.globalAlpha = p.life * 0.5
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      aria-hidden
    />
  )
}
