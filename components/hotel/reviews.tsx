'use client'

import { Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'

import { RatingBadge } from '@/components/rating-badge'
import { Button } from '@/components/ui/button'
import { reviewCategories, reviewCritique, reviewHighlights, reviews, type Review } from '@/lib/data/hotel-detail'
import type { Hotel } from '@/lib/data/hotels'
import { formatScore, nightsLabel, reviewsLabel } from '@/lib/format'
import { cn } from '@/lib/utils'

const FILTERS: { id: 'all' | Review['tripType']; label: string }[] = [
  { id: 'all', label: 'Все отзывы' },
  { id: 'family', label: 'Семьи с детьми' },
  { id: 'couple', label: 'Пары' },
  { id: 'solo', label: 'Одиночные поездки' },
  { id: 'friends', label: 'Компании' },
]

export function Reviews({ hotel }: { hotel: Hotel }) {
  const [filter, setFilter] = useState<'all' | Review['tripType']>('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(
    () => (filter === 'all' ? reviews : reviews.filter((review) => review.tripType === filter)),
    [filter],
  )
  const visible = showAll ? filtered : filtered.slice(0, 2)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-5">
        <div className="flex flex-col gap-1">
          <RatingBadge score={hotel.rating} reviews={hotel.reviewsCount} />
          <p className="text-xs text-muted-foreground">
            Оценка сформирована из {reviewsLabel(hotel.reviewsCount)} после проживания.
          </p>
        </div>

        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {reviewCategories.map((category) => (
            <div key={category.label} className="flex items-center gap-3">
              <dt className="w-28 shrink-0 text-[13px] text-muted-foreground">{category.label}</dt>
              <dd className="flex flex-1 items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${category.value * 10}%` }}
                  />
                </span>
                <span className="tabular w-7 shrink-0 text-right text-[13px] font-semibold">
                  {formatScore(category.value)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-success/30 bg-success-soft p-4">
          <h3 className="font-heading text-[15px] font-bold">Гости чаще всего хвалят</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {reviewHighlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Plus className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-warning/30 bg-warning-soft p-4">
          <h3 className="font-heading text-[15px] font-bold">На что обращают внимание</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {reviewCritique.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Minus className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setFilter(item.id)
              setShowAll(false)
            }}
            aria-pressed={filter === item.id}
            className={cn(
              'rounded-full border px-3 py-1.5 text-[13px] whitespace-nowrap',
              filter === item.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-secondary-foreground hover:border-border-strong',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          Для этого типа поездки отзывов пока нет. Посмотрите все отзывы.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {visible.map((review) => (
            <li key={review.author} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand"
                  >
                    {review.initials}
                  </span>
                  <div className="leading-snug">
                    <p className="text-sm font-semibold">{review.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.country} · {review.tripLabel}
                    </p>
                  </div>
                </div>
                <span className="tabular grid h-8 min-w-10 place-items-center rounded-lg bg-primary px-2 text-[13px] font-bold text-primary-foreground">
                  {formatScore(review.score)}
                </span>
              </div>

              <p className="mt-3 font-heading text-[15px] font-bold text-pretty">{review.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">
                <span className="font-semibold text-success">Плюсы. </span>
                {review.pros}
              </p>
              {review.cons && (
                <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">
                  <span className="font-semibold text-warning">Минусы. </span>
                  {review.cons}
                </p>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                {review.room} · {nightsLabel(review.nights)} · {review.date}
                {review.language === 'en' && ' · переведено с английского'}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!showAll && filtered.length > visible.length && (
        <Button variant="outline" className="w-fit" onClick={() => setShowAll(true)}>
          Показать все отзывы ({filtered.length})
        </Button>
      )}
    </div>
  )
}
