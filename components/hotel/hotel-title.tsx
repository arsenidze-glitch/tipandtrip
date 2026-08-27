import { Award, Heart, MapPin, Share2, Star } from 'lucide-react'
import { hotel } from '@/lib/hotel'

export function HotelTitle() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
            {hotel.type}
          </span>
          <span className="inline-flex items-center gap-0.5" aria-label={`${hotel.stars} звёзды`}>
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            ))}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/15 px-2 py-1 text-xs font-semibold text-accent-foreground">
            <Award className="size-3.5" aria-hidden="true" />
            Выбор путешественников 2025
          </span>
        </div>

        <h1 className="text-pretty font-heading text-2xl font-extrabold leading-tight md:text-4xl">
          {hotel.name} {hotel.stars}*
        </h1>

        <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="text-foreground">{hotel.address}</span>
          <a href="#location" className="font-semibold text-primary underline decoration-primary/30 underline-offset-2">
            Показать на карте
          </a>
          <span aria-hidden="true">·</span>
          <span>{hotel.distanceToBeach}</span>
          <span aria-hidden="true">·</span>
          <span>{hotel.distanceToAirport}</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <a
          href="#reviews"
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5 pr-4 transition-colors hover:border-primary/40"
        >
          <span className="grid size-12 place-items-center rounded-lg bg-primary font-heading text-lg font-extrabold text-primary-foreground">
            {hotel.rating.toLocaleString('ru-RU')}
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-bold">{hotel.ratingLabel}</span>
            <span className="block text-xs text-muted-foreground">
              {hotel.reviewsCount.toLocaleString('ru-RU')} отзывов
            </span>
          </span>
        </a>
        <div className="flex gap-2">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Сохранить отель"
          >
            <Heart className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Поделиться"
          >
            <Share2 className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
