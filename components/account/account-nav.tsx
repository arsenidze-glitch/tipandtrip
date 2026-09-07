'use client'

import { CalendarDays, CreditCard, Heart, LogOut, Settings, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export const accountNav = [
  { label: 'Мои бронирования', href: '/account', icon: CalendarDays },
  { label: 'Избранное', href: '/account/favorites', icon: Heart },
  { label: 'Личные данные', href: '/account/profile', icon: UserRound },
  { label: 'Способы оплаты', href: '/account/payments', icon: CreditCard },
  { label: 'Настройки', href: '/account/settings', icon: Settings },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Разделы кабинета" className="flex flex-col gap-1">
      {accountNav.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors',
              active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <item.icon className="size-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        )
      })}
      <div className="my-2 h-px bg-border" aria-hidden="true" />
      <Link
        href="/"
        className="flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <LogOut className="size-4 shrink-0" aria-hidden="true" />
        Выйти
      </Link>
    </nav>
  )
}

/** Горизонтальные табы для мобильных, где сайдбар не помещается */
export function AccountTabs() {
  const pathname = usePathname()

  return (
    <nav aria-label="Разделы кабинета" className="-mx-4 overflow-x-auto px-4 lg:hidden">
      <ul className="flex gap-1 border-b border-border">
        {accountNav.map((item) => {
          const active = pathname === item.href
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  '-mb-px flex h-11 items-center gap-1.5 border-b-2 px-3 text-sm font-medium whitespace-nowrap transition-colors',
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
