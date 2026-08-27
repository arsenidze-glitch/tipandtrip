import { MapPin } from 'lucide-react'

const columns = [
  {
    title: 'Направления',
    links: ['Отели Турции', 'Отели Кемера', 'Отели Антальи', 'Отели Гёйнюка', 'Отели Бельдиби'],
  },
  {
    title: 'Подборки',
    links: [
      'Отели с аквапарком',
      'Ultra all inclusive 5*',
      'Отели с собственным пляжем',
      'Отели для отдыха с детьми',
      'Тихие отели для пар',
    ],
  },
  {
    title: 'Сервисы',
    links: ['Отели', 'Авиабилеты', 'Туры', 'Аренда авто', 'Страховка путешественника'],
  },
  {
    title: 'Помощь',
    links: ['Мои бронирования', 'Условия отмены', 'Способы оплаты', 'Контакты', 'Для отельеров'],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="mx-auto max-w-[1240px] px-4 py-10 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <span className="font-heading text-lg font-extrabold">
                tipandtrip<span className="text-muted-foreground">.com</span>
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Отели, авиабилеты и туры с честными описаниями и проверенными отзывами. Бронирование без
              предоплаты и поддержка на русском языке круглосуточно.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-bold">{col.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 tipandtrip.com. Все права защищены.</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-foreground hover:underline">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-foreground hover:underline">
              Пользовательское соглашение
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
