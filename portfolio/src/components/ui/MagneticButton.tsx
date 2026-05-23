import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'

interface MagneticButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  href,
  type = 'button',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const { playClick, reducedMotion } = useApp()

  const variants = {
    primary:
      'bg-[var(--accent)] text-[var(--bg)] hover:shadow-[0_0_30px_var(--accent-glow)]',
    ghost: 'bg-transparent text-[var(--text)] hover:bg-white/5',
    outline:
      'bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10',
  }

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${variants[variant]} ${className}`

  const handleClick = () => {
    playClick()
    onClick?.()
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.97 }}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  )
}
