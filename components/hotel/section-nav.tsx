'use client'

import { useEffect, useState } from 'react'
import { hotel, sectionNav } from '@/lib/hotel'

export function SectionNav() {
  const [active, setActive] = useState(sectionNav[0].id)

  useEffect(() => {
    const sections = sectionNav
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-150px 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sticky top-0 z-30 -mx-4 mb-6 border-y border-border bg-card/95 backdrop-blur-sm lg:-mx-6">
      <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-4 lg:px-6">
        <nav aria-label="Разделы страницы отеля" className="no-scrollbar min-w-0 flex-1 overflow-x-auto">
          <ul className="flex items-center gap-1">
            {sectionNav.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`block whitespace-nowrap border-b-2 px-3 py-3.5 text-sm font-medium transition-colors ${
                    active === s.id
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden shrink-0 items-center gap-3 py-2 md:flex">
          <span className="text-right leading-tight">
            <span className="block text-[11px] text-muted-foreground">от</span>
            <span className="block font-heading text-base font-extrabold">
              {hotel.priceFrom.toLocaleString('ru-RU')} {hotel.currency}
            </span>
          </span>
          <a
            href="#rooms"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Выбрать номер
          </a>
        </div>
      </div>
    </div>
  )
}
