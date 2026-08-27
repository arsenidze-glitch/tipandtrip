'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'overview', label: 'Об отеле' },
  { id: 'rooms', label: 'Номера и цены' },
  { id: 'amenities', label: 'Удобства' },
  { id: 'location', label: 'Расположение' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'policies', label: 'Правила' },
  { id: 'faq', label: 'Вопросы' },
]

export function SectionNav() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (element): element is HTMLElement => element != null,
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Разделы страницы отеля"
      className="sticky top-[57px] z-30 -mx-4 border-b border-border bg-background/95 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:bg-card"
    >
      <ul className="no-scrollbar flex gap-1 overflow-x-auto px-4 py-2 sm:px-2">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              className={cn(
                'block rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
                active === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
