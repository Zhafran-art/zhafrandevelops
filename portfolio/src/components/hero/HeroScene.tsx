import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { User } from 'lucide-react'
import profile from '@/data/profile.json'
import { useApp } from '@/context/AppContext'
import type { Profile } from '@/types'

const data = profile as Profile

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageSrc, setImageSrc] = useState(data.avatarPlaceholder)
  const [showPhotoHint, setShowPhotoHint] = useState(true)
  const { reducedMotion } = useApp()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const rotateX = useSpring(0, { stiffness: 120, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 })
  const glowX = useTransform(rotateY, (v) => `${v * 8}px`)
  const glowY = useTransform(rotateX, (v) => `${v * -8}px`)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageSrc(data.avatar)
      setShowPhotoHint(false)
    }
    img.src = data.avatar
  }, [])

  const onPointerMove = (e: React.PointerEvent) => {
    if (reducedMotion || isMobile || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * 10)
    rotateX.set(y * -10)
  }

  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full min-h-[320px] md:min-h-[420px] flex items-center justify-center perspective-[1200px]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ x: glowX, y: glowY }}
        aria-hidden
      >
        <motion.div
          className="absolute w-[88%] max-w-md aspect-[4/5] rounded-[2rem] border border-[var(--accent)]/20"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, var(--accent-glow), transparent 65%)',
            boxShadow: '0 0 80px var(--accent-glow), inset 0 0 40px rgba(167, 139, 250, 0.08)',
          }}
          animate={reducedMotion ? undefined : { scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute w-[92%] max-w-[22rem] aspect-[4/5] rounded-[2.25rem] border border-[var(--accent)]/10 opacity-60"
          style={{ transform: 'rotate(3deg)' }}
        />
        <motion.div
          className="absolute w-[84%] max-w-[20rem] aspect-[4/5] rounded-[2rem] border border-[var(--accent-secondary)]/15 opacity-40"
          animate={reducedMotion ? undefined : { rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'rotate(-4deg)' }}
        />
      </motion.div>

      <motion.figure
        className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden glass group"
        style={{
          rotateX: reducedMotion || isMobile ? 0 : rotateX,
          rotateY: reducedMotion || isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
        }}
      >
        <img
          src={imageSrc}
          alt={`Portrait of ${data.shortName}`}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 45%, rgba(15, 23, 42, 0.85) 100%)',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.15) 2px, rgba(34,211,238,0.15) 4px)',
          }}
          aria-hidden
        />

        {showPhotoHint && (
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6 text-center pointer-events-none">
            <div className="mb-3 rounded-full border border-[var(--accent)]/30 bg-[var(--bg)]/60 p-3 backdrop-blur-sm">
              <User className="text-[var(--accent)]" size={28} aria-hidden />
            </div>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[14rem] leading-relaxed">
              Add your photo at{' '}
              <span className="text-[var(--accent)]">public/photos/avatar.jpg</span>
            </p>
          </div>
        )}

        <figcaption className="sr-only">Profile portrait</figcaption>
      </motion.figure>

      <div
        className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 h-px w-3/4 max-w-sm bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
        aria-hidden
      />
    </motion.div>
  )
}
