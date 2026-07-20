import { log } from '@/content/log'
import type { LogEntry } from '@/types/log'

/** All log entries, newest first. */
export function getAllLogEntries(): LogEntry[] {
  return [...log].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
