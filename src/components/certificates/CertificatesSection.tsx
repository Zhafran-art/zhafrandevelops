import { useMemo, useState } from 'react'
import certificatesData from '@/data/certificates.json'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CertificateCard } from '@/components/certificates/CertificateCard'
import type { Certificate } from '@/types'

const { filters, items } = certificatesData

export function CertificatesSection() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return items as Certificate[]
    return (items as Certificate[]).filter((c) => c.type === activeFilter)
  }, [activeFilter])

  return (
    <SectionWrapper
      id="certificates"
      title="Certificates & Achievements"
      subtitle="Credentials, hackathons, awards, and competitions."
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

      <div className="section-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((cert, i) => (
          <CertificateCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
