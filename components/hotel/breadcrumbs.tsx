import { ChevronRight } from 'lucide-react'

const trail = [
  { label: 'Главная', href: '/' },
  { label: 'Отели', href: '/hotels' },
  { label: 'Турция', href: '/hotels/turkey' },
  { label: 'Кемер', href: '/hotels/turkey/kemer' },
  { label: 'Гёйнюк', href: '/hotels/turkey/kemer/goynuk' },
]

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Хлебные крошки" className="py-4">
      <ol className="no-scrollbar flex items-center gap-1 overflow-x-auto text-sm text-muted-foreground">
        {trail.map((item) => (
          <li key={item.href} className="flex shrink-0 items-center gap-1">
            <a href={item.href} className="rounded px-1 py-0.5 hover:text-foreground hover:underline">
              {item.label}
            </a>
            <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
          </li>
        ))}
        <li className="shrink-0 px-1 font-medium text-foreground" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  )
}
