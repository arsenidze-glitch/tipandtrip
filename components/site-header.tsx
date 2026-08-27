'use client'

import { Globe, Heart, Menu, Percent, Plane, User, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Отели', href: '/' },
  { label: 'Авиабилеты', href: '/' },
  { label: 'Туры', href: '/' },
  { label: 'Аренда авто', href: '/' },
]

export function SiteHeader({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={cn('border-b border-border bg-card', className)}>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 lg:px-6">
        <Logo />

        <nav aria-label="Основная навигация" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex h-9 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/"
            className="hidden h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
          >
            <Percent className="size-4" aria-hidden="true" />
            Акции
          </Link>
          <button
            type="button"
            className="hidden h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
          >
            <Globe className="size-4" aria-hidden="true" />
            RU · EUR
          </button>
          <button
            type="button"
            aria-label="Избранное"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Heart className="size-4" />
          </button>
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            <User className="size-4" aria-hidden="true" />
            Войти
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="grid size-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-border px-4 py-3 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Plane className="size-4 text-muted-foreground" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2 border-t border-border pt-3">
            <Button variant="outline" size="sm" block>
              <Globe className="size-4" aria-hidden="true" />
              RU · EUR
            </Button>
            <Button variant="primary" size="sm" block>
              <User className="size-4" aria-hidden="true" />
              Войти
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
