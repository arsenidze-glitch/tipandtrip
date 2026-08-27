import Link from 'next/link'

import { LogoMark } from '@/components/logo'
import { CURRENCIES, LANGUAGES } from '@/lib/format'

const columns = [
  {
    title: 'Направления',
    links: ['Отели на Пхукете', 'Отели в Таиланде', 'Отели на Бали', 'Отели в Дубае', 'Отели в Стамбуле'],
  },
  {
    title: 'Подборки',
    links: [
      'Отели для отдыха с детьми',
      'Отели первой линии',
      'Отели с бассейном',
      'Апартаменты с кухней',
      'Отели «всё включено»',
    ],
  },
  {
    title: 'Сервисы',
    links: ['Отели', 'Авиабилеты', 'Туры', 'Аренда авто', 'Страховка путешественника'],
  },
  {
    title: 'Помощь',
    links: ['Мои бронирования', 'Условия отмены', 'Способы оплаты', 'Связаться с поддержкой', 'Для отелей'],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-[1240px] px-4 py-12 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <span className="font-heading text-lg font-extrabold">
                Tip<span className="text-brand">&amp;</span>Trip
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Smart tips. Better trips. Полная стоимость проживания сразу, понятные условия отмены и
              поддержка на всех этапах поездки.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <label className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-xs">
                <span className="text-muted-foreground">Язык</span>
                <select
                  defaultValue="ru"
                  aria-label="Язык интерфейса"
                  className="bg-transparent text-sm font-semibold outline-none"
                >
                  {LANGUAGES.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-xs">
                <span className="text-muted-foreground">Валюта</span>
                <select
                  defaultValue="EUR"
                  aria-label="Валюта цен"
                  className="bg-transparent text-sm font-semibold outline-none"
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} {currency.symbol}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-bold">{column.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Tip&amp;Trip. Прототип интерфейса, данные демонстрационные.</p>
          <p className="flex flex-wrap gap-4">
            <Link href="/" className="transition-colors hover:text-foreground hover:underline">
              Политика конфиденциальности
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground hover:underline">
              Пользовательское соглашение
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground hover:underline">
              Файлы cookie
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
