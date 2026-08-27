import { Compass, MapPin, Plane } from 'lucide-react'
import { hotel, nearby } from '@/lib/hotel'
import { Section } from './section'

export function Location() {
  return (
    <Section
      id="location"
      eyebrow="Где находится отель"
      title="Расположение и что рядом"
      action={
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          <Compass className="size-4 text-primary" aria-hidden="true" />
          Открыть карту
        </button>
      }
    >
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-3 text-sm">
          <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="block font-semibold">{hotel.address}</span>
            <span className="block text-muted-foreground">
              Первая линия, {hotel.distanceToBeach.toLowerCase()}, переходить дорогу не нужно
            </span>
          </span>
        </p>
        <p className="flex items-center gap-2 rounded-lg bg-card px-3.5 py-2.5 text-sm font-semibold">
          <Plane className="size-4 text-primary" aria-hidden="true" />
          {hotel.distanceToAirport} · 45–55 мин
        </p>
      </div>

      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {nearby.map((group) => (
          <div key={group.group}>
            <h3 className="text-sm font-bold">{group.group}</h3>
            <dl className="mt-2.5 flex flex-col">
              {group.items.map(([name, distance]) => (
                <div
                  key={name}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-border py-2 last:border-b-0"
                >
                  <dt className="text-sm text-muted-foreground">{name}</dt>
                  <dd className="shrink-0 text-sm font-semibold tabular-nums">{distance}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  )
}
