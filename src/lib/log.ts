import { log } from '@/content/log/log'
import type { LogEntry } from '@/types/log'

/** All log entries, newest first. */
export function getAllLogEntries(): LogEntry[] {
  return [...log].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Sorted, de-duplicated tags across all log entries. */
export function getAllLogTags(): string[] {
  const tags = new Set(log.flatMap((e) => e.tags))
  return Array.from(tags).sort()
}
