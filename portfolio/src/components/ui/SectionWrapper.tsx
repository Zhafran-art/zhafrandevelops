import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApp } from '@/context/AppContext'

gsap.registerPlugin(ScrollTrigger)

interface SectionWrapperProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function SectionWrapper({ id, title, subtitle, children, className = '' }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { reducedMotion, addLog } = useApp()

  useEffect(() => {
    const el = sectionRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.section-reveal'), {
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => addLog(`Section: ${title} loaded`),
        },
      })
    }, el)

    return () => ctx.revert()
  }, [id, title, reducedMotion, addLog])

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section-padding scroll-mt-24 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <header className="mb-12 md:mb-16">
        <p className="section-reveal font-mono text-sm text-[var(--accent)] mb-2">
          {'// '}
          {id}
        </p>
        <h2
          id={`${id}-heading`}
          className="section-reveal font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="section-reveal mt-3 text-[var(--text-muted)] max-w-2xl text-lg">{subtitle}</p>
        )}
      </header>
      {children}
    </section>
  )
}
