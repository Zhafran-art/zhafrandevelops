export type ThemeId = 'dark' | 'darker' | 'retro'

export interface Profile {
  name: string
  shortName: string
  title: string
  tagline: string
  location: string
  email: string
  cvPath: string
  avatar: string
  avatarPlaceholder: string
  socials: { github: string; linkedin: string; email: string }
  bio: string
  terminalLines: string[]
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface StudyModule {
  name: string
  completed: boolean
}

export interface StudyTimelineEntry {
  year: string
  title: string
  institution: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  demo: string
  repo: string
  thumbnail: string
  featured: boolean
  challenges?: string
  learnings?: string
  role?: string
  timeline?: string
  beforeImage?: string
  afterImage?: string
  caseStudy?: { problem: string; approach: string; outcome: string }
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  link: string
  credentialId?: string
  type: string
}
