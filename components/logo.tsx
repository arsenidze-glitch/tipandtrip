import Link from 'next/link'

import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn('size-9 shrink-0', className)}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="var(--brand)" />
      <path
        d="M10 28.5c2-9.5 8-15 15.5-16"
        fill="none"
        stroke="var(--brand-foreground)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="0.5 4.8"
      />
      <circle cx="10" cy="28.5" r="2.8" fill="var(--brand-foreground)" />
      <path d="M24.5 7.5v11l7-4.6Z" fill="var(--brand-foreground)" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex shrink-0 items-center gap-2.5 rounded-lg', className)}
      aria-label="Tip&Trip — на главную"
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[19px] font-extrabold tracking-tight">
          Tip<span className="text-brand">&amp;</span>Trip
        </span>
        <span className="mt-1 hidden text-[11px] text-muted-foreground sm:block">
          Smart tips. Better trips.
        </span>
      </span>
    </Link>
  )
}
