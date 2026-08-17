import { expeditions } from '@/content/expeditions'
import type { Expedition } from '@/types/expedition'

/** All expeditions with defaults applied (ort → "weltweit", date → "tbd", url → mailto). */
export function getAllExpeditions(): Expedition[] {
  return expeditions.map((e) => ({
    ...e,
    ort: e.ort || 'weltweit',
    date: e.date || 'tbd',
    url: e.url || 'mailto:expedition@calaos.me',
  }))
}
