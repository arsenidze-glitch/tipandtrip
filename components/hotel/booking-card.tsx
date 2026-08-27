import {
  BadgePercent,
  CalendarDays,
  CreditCard,
  Flame,
  Headphones,
  TrendingDown,
  Users,
} from 'lucide-react'
import { hotel, priceCalendar } from '@/lib/hotel'

const trust = [
  { icon: CreditCard, text: 'Бронирование без предоплаты' },
  { icon: CalendarDays, text: 'Бесплатная отмена до 8 июня' },
  { icon: Headphones, text: 'Поддержка на русском 24/7' },
]

export function BookingCard() {
  const maxPrice = Math.max(...priceCalendar.map((m) => m.price))
  const total = hotel.priceFrom * hotel.nights

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Цена за ночь от</p>
            <p className="mt-0.5 flex items-baseline gap-2">
              <span className="font-heading text-3xl font-extrabold">
                {hotel.priceFrom.toLocaleString('ru-RU')} {hotel.currency}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {hotel.priceOld.toLocaleString('ru-RU')}
              </span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
            <BadgePercent className="size-3.5" aria-hidden="true" />
            −16 %
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {total.toLocaleString('ru-RU')} {hotel.currency} за {hotel.nights} ночей, налоги и сборы включены
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <label className="rounded-lg border border-border px-3 py-2">
            <span className="block text-[11px] font-medium text-muted-foreground">Заезд — выезд</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold">
              <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
              {hotel.dates}
            </span>
          </label>
          <label className="rounded-lg border border-border px-3 py-2">
            <span className="block text-[11px] font-medium text-muted-foreground">Гости</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold">
              <Users className="size-3.5 text-primary" aria-hidden="true" />
              {hotel.guests}
            </span>
          </label>
        </div>

        <a
          href="#rooms"
          className="mt-3 block rounded-lg bg-primary py-3 text-center text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Показать 12 доступных номеров
        </a>

        <p className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-accent/12 py-2 text-xs font-semibold text-accent-foreground">
          <Flame className="size-3.5" aria-hidden="true" />
          Этот отель смотрят 23 человека прямо сейчас
        </p>

        <ul className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
          {trust.map((t) => (
            <li key={t.text} className="flex items-center gap-2.5 text-sm">
              <t.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {t.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <TrendingDown className="size-4 text-primary" aria-hidden="true" />
          Когда дешевле поехать
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Средняя цена за ночь в номере Standard, 2025–2026
        </p>
        <ul className="mt-4 flex items-end justify-between gap-1.5">
          {priceCalendar.map((m) => (
            <li key={m.month} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-muted-foreground">
                {Math.round(m.price / 1000)}k
              </span>
              <span
                className={`w-full rounded-t-sm ${m.price === Math.min(...priceCalendar.map((p) => p.price)) ? 'bg-accent' : 'bg-primary/25'}`}
                style={{ height: `${Math.round((m.price / maxPrice) * 80)}px` }}
                aria-hidden="true"
              />
              <span className="text-[10px] text-muted-foreground">{m.month.slice(0, 3)}</span>
            </li>
          ))}
        </ul>
        <p className="sr-only">
          {priceCalendar.map((m) => `${m.month}: ${m.price} ₽ за ночь.`).join(' ')}
        </p>
      </div>
    </div>
  )
}
