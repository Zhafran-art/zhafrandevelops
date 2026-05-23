import { ExternalLink, Code2 } from 'lucide-react'
import type { Project } from '@/types'
import { BeforeAfterSlider } from '@/components/projects/BeforeAfterSlider'
import { MagneticButton } from '@/components/ui/MagneticButton'

interface FeaturedCaseStudyProps {
  project: Project
}

export function FeaturedCaseStudy({ project }: FeaturedCaseStudyProps) {
  if (!project.caseStudy) return null

  return (
    <div className="section-reveal mt-16 glass rounded-2xl p-6 md:p-10 border border-[var(--accent)]/20">
      <p className="font-mono text-sm text-[var(--accent)] mb-2">// featured_case_study</p>
      <h3 className="font-display text-2xl md:text-3xl font-bold">{project.name}</h3>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="space-y-6">
          {(['problem', 'approach', 'outcome'] as const).map((key) => (
            <div key={key}>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">{key}</h4>
              <p className="mt-2 text-[var(--text-muted)] text-sm leading-relaxed">
                {project.caseStudy![key]}
              </p>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          {project.beforeImage && project.afterImage && (
            <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} />
          )}
          <div className="flex flex-wrap gap-4 text-sm">
            {project.role && (
              <span>
                <strong className="text-[var(--text)]">Role:</strong>{' '}
                <span className="text-[var(--text-muted)]">{project.role}</span>
              </span>
            )}
            {project.timeline && (
              <span>
                <strong className="text-[var(--text)]">Timeline:</strong>{' '}
                <span className="text-[var(--text-muted)]">{project.timeline}</span>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <MagneticButton variant="primary" href={project.demo}>
              <ExternalLink size={18} /> Live Demo
            </MagneticButton>
            <MagneticButton variant="outline" href={project.repo}>
              <Code2 size={18} /> Source
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  )
}
