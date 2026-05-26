import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import studyData from '@/data/study.json'
import { useApp } from '@/context/AppContext'
import type { StudyTimelineEntry } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const entries = studyData.timeline as StudyTimelineEntry[]

export function StudyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useApp()

  useEffect(() => {
    const container = containerRef.current
    const line = lineRef.current
    if (!container || !line) return
    if (reducedMotion) {
      line.style.transform = 'scaleY(1)'
      return
    }
    gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: container, start: 'top 70%', end: 'bottom 30%', scrub: 1 },
    })
    container.querySelectorAll('[data-timeline-card]').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card, start: 'top 75%',
        onEnter: () => card.classList.add('timeline-active'),
        onLeaveBack: () => card.classList.remove('timeline-active'),
      })
      if (i === 0) card.classList.add('timeline-active')
    })
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="relative mt-12">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2 overflow-hidden">
        <div
          ref={lineRef}
          className="w-full h-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-secondary)] origin-top"
          style={{ transform: reducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
        />
      </div>
      <div className="space-y-12">
        {entries.map((entry, i) => (
          <div
            key={`${entry.year}-${entry.title}`}
            data-timeline-card
            className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''}`}
          >
            <div className={`hidden md:block ${i % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
              <span className="font-mono text-2xl font-bold text-[var(--accent)]">{entry.year}</span>
            </div>
            <div className={`glass rounded-xl p-6 transition-all duration-500 ${i % 2 === 0 ? 'md:ml-auto md:max-w-md' : 'md:mr-auto md:max-w-md'}`}>
              <span className="font-mono text-sm text-[var(--accent)] md:hidden">{entry.year}</span>
              <h4 className="font-display text-lg font-semibold mt-1">{entry.title}</h4>
              <p className="text-sm text-[var(--accent-secondary)] mt-1">{entry.institution}</p>
              <p className="text-[var(--text-muted)] mt-2 text-sm">{entry.description}</p>
            </div>
            <div className="timeline-dot absolute left-2 md:left-1/2 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--accent)] md:-translate-x-1/2 top-6" aria-hidden />
          </div>
        ))}
      </div>
      <style>{`
        [data-timeline-card].timeline-active .glass {
          border-color: var(--accent);
          box-shadow: 0 0 30px var(--accent-glow);
        }
        [data-timeline-card].timeline-active .timeline-dot {
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent-glow);
        }
      `}</style>
    </div>
  )
}
