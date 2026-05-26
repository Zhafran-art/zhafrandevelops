import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import skillsData from '@/data/skills.json'
import { useApp } from '@/context/AppContext'
import type { Skill } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const skills = skillsData.skills as Skill[]

export function SkillsBars() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useApp()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (reducedMotion) {
      el.querySelectorAll('[data-bar]').forEach((bar) => {
        const level = bar.getAttribute('data-level')
        if (level) (bar as HTMLElement).style.width = `${Number(level) * 10}%`
      })
      return
    }

    const bars = el.querySelectorAll('[data-bar]')
    bars.forEach((bar) => {
      const level = Number(bar.getAttribute('data-level')) * 10
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        },
      )
    })
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="space-y-5">
      {skills.map((skill) => (
        <div key={skill.name} className="group">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {skill.name}
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">{skill.level}/10</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              data-bar
              data-level={skill.level}
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
              style={{ width: reducedMotion ? `${skill.level * 10}%` : '0%' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
