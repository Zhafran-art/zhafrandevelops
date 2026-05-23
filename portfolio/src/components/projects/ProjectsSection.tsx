import { useMemo, useState } from 'react'
import projectsData from '@/data/projects.json'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectModal } from '@/components/projects/ProjectModal'
import { FeaturedCaseStudy } from '@/components/projects/FeaturedCaseStudy'
import type { Project } from '@/types'

const { filters, projects } = projectsData

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const featured = projects.find((p) => p.featured) as Project | undefined

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects as Project[]
    return (projects as Project[]).filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Things I've built — filter by category or click for details."
    >
      <div className="section-reveal flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
              activeFilter === f
                ? 'bg-[var(--accent)] text-[var(--bg)]'
                : 'glass text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="section-reveal flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelected} />
        ))}
      </div>

      {featured && <FeaturedCaseStudy project={featured} />}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  )
}
