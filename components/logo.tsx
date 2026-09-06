import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

/** Компактный знак бренда: чемодан с бирюзовой «дорогой», как в основном логотипе. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn('size-9 shrink-0', className)}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="14" y="3" width="12" height="8" rx="3" fill="none" stroke="var(--primary)" strokeWidth="3" />
      <rect x="3" y="9" width="34" height="28" rx="7" fill="var(--primary)" />
      <path d="M3 33c9-9 20-14 34-15v12a7 7 0 0 1-7 7H10a7 7 0 0 1-7-7Z" fill="var(--brand)" />
      <path
        d="M12 26.5l7.5-4.2 1.4-5.6 2.2.9-.7 4.6 4.4-2.4 1.1 1.9-4.4 2.4 3.5 3.1-1.6 1.7-4-2.7-4.9 3.1Z"
        fill="var(--primary-foreground)"
      />
      <path d="M33 4l1.1 2.9L37 8l-2.9 1.1L33 12l-1.1-2.9L29 8l2.9-1.1Z" fill="var(--brand)" />
    </svg>
  )
}

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('flex shrink-0 items-center rounded-lg', className)}
      aria-label="Tip&Trip — на главную"
    >
      <Image
        src="/brand/logo.png"
        alt="Tip&Trip.com"
        width={1190}
        height={244}
        priority={priority}
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  )
}
