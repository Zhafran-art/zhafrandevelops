import { useState } from 'react'
import { ChevronDown, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import studyData from '@/data/study.json'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { StudyTimeline } from '@/components/study/StudyTimeline'

export function StudySection() {
  const { current } = studyData
  const [expanded, setExpanded] = useState(false)

  return (
    <SectionWrapper
      id="study"
      title="Current Study"
      subtitle="Where I'm learning and what I'm building toward."
    >
      <div className="section-reveal glass rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
            <GraduationCap size={28} />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-semibold">{current.program}</h3>
            <p className="text-[var(--accent-secondary)] mt-1">{current.institution}</p>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Expected completion: {current.expectedCompletion}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-mono text-[var(--text-muted)]">Progress</span>
            <span className="font-mono text-[var(--accent)]">{current.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${current.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {current.focusAreas.map((area) => (
            <span key={area} className="tech-tag">
              {area}
            </span>
          ))}
        </div>

        <ul className="mt-6 space-y-2">
          {current.modules.map((mod) => (
            <li key={mod.name} className="flex items-center gap-3 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${mod.completed ? 'bg-[var(--accent)]' : 'bg-white/20'}`}
              />
              <span className={mod.completed ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}>
                {mod.name}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-6 flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? 'Hide details' : 'Show semester goals & syllabus'}
          <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 grid md:grid-cols-2 gap-6 border-t border-[var(--border)] mt-4">
                <div>
                  <h4 className="font-mono text-sm text-[var(--accent)] mb-2">Semester goals</h4>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                    {current.semesterGoals.map((g) => (
                      <li key={g}>• {g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-sm text-[var(--accent)] mb-2">Syllabus topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {current.syllabusTopics.map((t) => (
                      <span key={t} className="px-2 py-1 rounded text-xs glass">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="section-reveal mt-16">
        <h3 className="font-display text-2xl font-semibold mb-2">Study Journey</h3>
        <p className="text-[var(--text-muted)] text-sm mb-4">Scroll to explore my education path</p>
        <StudyTimeline />
      </div>
    </SectionWrapper>
  )
}
