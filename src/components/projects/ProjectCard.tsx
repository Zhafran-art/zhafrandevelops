import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'
import { assetUrl } from '@/lib/assetUrl'
import type { Project } from '@/types'

const FALLBACK_THUMB = '/placeholders/project-placeholder.svg'

interface ProjectCardProps {
  project: Project
  onOpen: (p: Project) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      layout
      className="group glass rounded-xl overflow-hidden cursor-pointer flex-shrink-0 w-[min(100%,320px)] snap-center"
      whileHover={{ y: -6 }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      aria-label={`Open project ${project.name}`}
    >
      <div className="aspect-video bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-secondary)]/10 relative overflow-hidden">
        <img
          src={assetUrl(project.thumbnail)}
          alt=""
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            if (img.dataset.fallbackApplied) return
            img.dataset.fallbackApplied = 'true'
            img.src = assetUrl(FALLBACK_THUMB)
          }}
        />
        {project.featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent)] text-[var(--bg)]">
            featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg group-hover:text-[var(--accent)] transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-[var(--text-muted)] mt-2 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
          <a
            href={project.demo}
            className="text-xs text-[var(--accent)] flex items-center gap-1 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={14} /> Demo
          </a>
          <a
            href={project.repo}
            className="text-xs text-[var(--text-muted)] flex items-center gap-1 hover:text-[var(--accent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code2 size={14} /> Code
          </a>
        </div>
      </div>
    </motion.article>
  )
}
