/**
 * Resolves public-folder paths for the current Vite `base` (e.g. `/` on Vercel, `/z.develop/` on GitHub Pages).
 */
export function assetUrl(path: string): string {
  if (!path || /^https?:\/\//i.test(path)) return path
  const base = import.meta.env.BASE_URL
  const relative = path.replace(/^\//, '').replace(/^public\//, '')
  return `${base}${relative}`
}
