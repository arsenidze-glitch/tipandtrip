import { CalendarDays, Check, Users } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { rateTotal, rooms } from '@/lib/data/hotel-detail'
import { formatPrice, nightsLabel } from '@/lib/format'
import { formatDateRange, formatGuestsDetailed, nightsBetween, type SearchContext } from '@/lib/search'

export function BookingAside({ search, soldOut = false }: { search: SearchContext; soldOut?: boolean }) {
  const nights = nightsBetween(search.checkIn, search.checkOut)
  const cheapest = rooms
    .flatMap((room) => room.rates.map((rate) => ({ room, rate, total: rateTotal(rate) })))
    .sort((a, b) => a.total - b.total)[0]

  return (
    <aside className="lg:sticky lg:top-32">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        {soldOut ? (
          <>
            <p className="text-sm font-semibold">Нет мест на выбранные даты</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Поставщик не вернул свободных номеров. Попробуйте сдвинуть даты на пару дней.
            </p>
          </>
        ) : (
          <>
            <p className="text-[13px] text-muted-foreground">Лучшая цена на ваши даты</p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="tabular font-heading text-2xl font-bold">{formatPrice(cheapest.total)}</span>
              <span className="text-[13px] text-muted-foreground">за {nightsLabel(nights)}</span>
            </p>
            <p className="tabular mt-0.5 text-[13px] text-muted-foreground">
              {formatPrice(Math.round(cheapest.total / nights))} за ночь · налоги и сборы включены
            </p>
          </>
        )}

        <dl className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-[13px]">
          <div className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <dt className="sr-only">Даты</dt>
              <dd>{formatDateRange(search.checkIn, search.checkOut)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <dt className="sr-only">Гости</dt>
              <dd>{formatGuestsDetailed(search)}</dd>
            </div>
          </div>
        </dl>

        {soldOut ? (
          <a href="#similar" className={buttonVariants({ size: 'lg', block: true, className: 'mt-4' })}>
            Посмотреть похожие
          </a>
        ) : (
          <a href="#rooms" className={buttonVariants({ size: 'lg', block: true, className: 'mt-4' })}>
            Выбрать номер
          </a>
        )}

        {!soldOut && (
          <ul className="mt-4 flex flex-col gap-1.5 text-[13px] text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
              Есть тарифы с бесплатной отменой
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
              Цена подтверждается перед оплатой
            </li>
          </ul>
        )}
      </div>
    </aside>
  )
}
