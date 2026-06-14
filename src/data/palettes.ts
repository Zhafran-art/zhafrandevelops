import type { PaletteId } from '@/types'

export interface PaletteOption {
  id: PaletteId
  name: string
  description: string
  preview: [string, string, string]
}

export const PALETTE_OPTIONS: PaletteOption[] = [
  {
    id: 'crimson',
    name: 'Crimson',
    description: 'Deep maroon warmth — your signature portfolio mood.',
    preview: ['#810b38', '#541a1a', '#1f0b12'],
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Forest greens with mint highlights — calm and focused.',
    preview: ['#059669', '#064e3b', '#0b1a14'],
  },
  {
    id: 'violet',
    name: 'Violet',
    description: 'Cosmic purples and indigo glow — creative and bold.',
    preview: ['#7c3aed', '#4c1d95', '#140b1f'],
  },
  {
    id: 'sunshine',
    name: 'Sunshine',
    description: 'Warm golden rays fade into a dusky sunset - the salty breeze is a reminder why to stay alive',
    preview: ['#f4d35e', '#ee964b', '#241b08'],
  },
  {
    id: 'pink-dream',
    name: 'Dream',
    description: 'A cherry blossomed symphony combining professionalism - sweet like cherry',
    preview: ['#fff7fb', '#ff6fb5', '#ff9ecf'],
  },
  {
    id: 'cyber-grid',
    name: 'Cyber Grid',
    description: 'Neon lights cut through the darkness of a digital metropolis - like something lost in a glitch',
    preview: ['#00d9ff', '#ff9f1c', '#0f1728'],
  },
]

export const PALETTE_STORAGE_KEY = 'portfolio-palette'
