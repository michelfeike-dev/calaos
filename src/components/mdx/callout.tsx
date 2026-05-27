import { cn } from '@/lib/utils'
import type { LucideProps } from 'lucide-react'
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'success' | 'error'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const config: Record<CalloutType, { icon: React.ComponentType<LucideProps>; classes: string }> = {
  info: {
    icon: Info,
    classes: 'border-[var(--accent-vivid)]/30 bg-[var(--accent-vivid)]/5 text-[var(--text-secondary)]',
  },
  warning: {
    icon: AlertTriangle,
    classes: 'border-amber-500/30 bg-amber-500/5 text-[var(--text-secondary)]',
  },
  success: {
    icon: CheckCircle,
    classes: 'border-emerald-500/30 bg-emerald-500/5 text-[var(--text-secondary)]',
  },
  error: {
    icon: XCircle,
    classes: 'border-red-500/30 bg-red-500/5 text-[var(--text-secondary)]',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, classes } = config[type]

  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4',
        classes
      )}
      role={type === 'warning' || type === 'error' ? 'alert' : 'note'}
    >
      <div className="flex gap-3">
        <Icon size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 opacity-70" />
        <div className="min-w-0">
          {title && <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">{title}</p>}
          <div className="prose-sm text-sm [&>p:last-child]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
