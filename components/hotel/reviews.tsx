import { Minus, Plus, Quote, ThumbsUp, Verified } from 'lucide-react'
import { hotel, ratingBreakdown, reviewSummary, reviews } from '@/lib/hotel'
import { Section } from './section'

const filters = [
  'Все отзывы',
  'Семьи с детьми',
  'Пары',
  'Один',
  'С друзьями',
  'Только с фото',
  'На русском',
]

export function Reviews() {
  return (
    <Section
      id="reviews"
      eyebrow={`${hotel.reviewsCount.toLocaleString('ru-RU')} проверенных отзывов`}
      title="Что говорят гости"
      action={
        <button
          type="button"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Написать отзыв
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div>
          <div className="flex items-center gap-4 rounded-xl bg-secondary/60 p-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-primary font-heading text-2xl font-extrabold text-primary-foreground">
              {hotel.rating.toLocaleString('ru-RU')}
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold">{hotel.ratingLabel}</span>
              <span className="block text-xs text-muted-foreground">
                Оценка из 10 по {hotel.reviewsCount.toLocaleString('ru-RU')} отзывам за 24 месяца
              </span>
            </span>
          </div>

          <dl className="mt-4 flex flex-col gap-3">
            {ratingBreakdown.map((r) => (
              <div key={r.label}>
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-sm text-muted-foreground">{r.label}</dt>
                  <dd className="text-sm font-bold tabular-nums">
                    {r.value.toLocaleString('ru-RU')}
                  </dd>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${r.value * 10}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0">
          <div className="rounded-xl border border-border p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <Quote className="size-4 text-primary" aria-hidden="true" />
              Главное из отзывов
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <ul className="flex flex-col gap-2">
                {reviewSummary.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm leading-snug">
                    <Plus className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2">
                {reviewSummary.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm leading-snug">
                    <Minus className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                    <span className="text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
            {filters.map((f, i) => (
              <li key={f}>
                <button
                  type="button"
                  className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    i === 0
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-4">
            {reviews.map((r) => (
              <article key={r.author} className="rounded-xl border border-border p-4">
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                      {r.initials}
                    </span>
                    <span className="leading-tight">
                      <span className="flex items-center gap-1.5 text-sm font-bold">
                        {r.author}
                        <Verified className="size-3.5 text-primary" aria-hidden="true" />
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {r.country} · {r.tripType} · {r.nights} ночей · {r.date}
                      </span>
                    </span>
                  </div>
                  <span className="rounded-lg bg-primary px-2.5 py-1 font-heading text-sm font-extrabold text-primary-foreground">
                    {r.score.toLocaleString('ru-RU')}
                  </span>
                </header>

                <h4 className="mt-3 text-sm font-bold">«{r.title}»</h4>
                <p className="mt-2 flex gap-2 text-sm leading-relaxed">
                  <Plus className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{r.pros}</span>
                </p>
                <p className="mt-2 flex gap-2 text-sm leading-relaxed">
                  <Minus className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="text-muted-foreground">{r.cons}</span>
                </p>

                <footer className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground">Номер: {r.room}</p>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ThumbsUp className="size-3.5" aria-hidden="true" />
                    Полезно · {r.helpful}
                  </button>
                </footer>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-border py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Показать все {hotel.reviewsCount.toLocaleString('ru-RU')} отзывов
          </button>
        </div>
      </div>
    </Section>
  )
}
