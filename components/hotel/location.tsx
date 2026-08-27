import { MapPin, Plane } from 'lucide-react'

import { location } from '@/lib/data/hotel-detail'
import type { Hotel } from '@/lib/data/hotels'

export function Location({ hotel }: { hotel: Hotel }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative overflow-hidden rounded-xl border border-border bg-secondary">
        <div
          className="h-52 w-full sm:h-64"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(205,215,225,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(205,215,225,0.55) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
          role="img"
          aria-label={`Схематичная карта: ${hotel.name}, район ${hotel.neighborhood}`}
        />
        <div
          className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
          style={{ left: `${hotel.map.x}%`, top: `${hotel.map.y}%` }}
        >
          <span className="rounded-lg bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            {hotel.name}
          </span>
          <span className="size-2.5 rounded-full bg-primary ring-2 ring-card" />
        </div>
        <p className="absolute inset-x-0 bottom-0 bg-card/90 px-3 py-2 text-xs text-muted-foreground">
          Схематичная карта района. Точный адрес указан ниже.
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          <span>{location.address}</span>
        </p>
        <p className="flex items-start gap-2">
          <Plane className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          <span>{location.transfer}</span>
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {location.nearby.map((group) => (
          <div key={group.group}>
            <h3 className="font-heading text-[15px] font-bold">{group.group}</h3>
            <ul className="mt-2 flex flex-col gap-1.5">
              {group.items.map(([name, distance]) => (
                <li key={name} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-secondary-foreground">{name}</span>
                  <span className="tabular shrink-0 text-muted-foreground">{distance}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
