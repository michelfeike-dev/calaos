import { cn } from '@/lib/utils'
import type { LucideProps } from 'lucide-react'
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'success' | 'error'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const config: Record<
  CalloutType,
  { icon: React.ComponentType<LucideProps>; accent: string; iconColor: string; title: string }
> = {
  info: {
    icon: Info,
    accent: 'border-l-blue-400/60',
    iconColor: 'text-blue-400',
    title: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    accent: 'border-l-amber-400/60',
    iconColor: 'text-amber-400',
    title: 'text-amber-300',
  },
  success: {
    icon: CheckCircle,
    accent: 'border-l-emerald-400/60',
    iconColor: 'text-emerald-400',
    title: 'text-emerald-300',
  },
  error: {
    icon: XCircle,
    accent: 'border-l-red-400/60',
    iconColor: 'text-red-400',
    title: 'text-red-300',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, accent, iconColor, title: titleColor } = config[type]

  return (
    <div
      className={cn(
        'my-8 flex gap-3 rounded-2xl border border-white/[0.08] border-l-2 bg-[#1c1c1c] p-5',
        accent
      )}
      role={type === 'warning' || type === 'error' ? 'alert' : 'note'}
    >
      <Icon
        size={18}
        strokeWidth={1.75}
        className={cn('mt-0.5 shrink-0', iconColor)}
        aria-hidden
      />
      <div className="min-w-0">
        {title && (
          <p className={cn('mb-1 text-sm font-semibold', titleColor)}>{title}</p>
        )}
        <div className="text-sm leading-relaxed text-white/70 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  )
}
