import { Map } from 'lucide-react'

import { hotelPerNight, type Hotel } from '@/lib/data/hotels'
import { formatPrice } from '@/lib/format'

/**
 * Схематичная карта района: показывает взаимное расположение отелей.
 * В продуктовой версии заменяется на интерактивную карту провайдера.
 */
export function MapPreview({ hotels, nights }: { hotels: Hotel[]; nights: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative h-56 bg-[linear-gradient(150deg,#dceef2_0%,#c9e6ec_50%,#eaf3ee_100%)]">
        <span
          className="absolute inset-y-0 left-0 w-[46%] bg-[#bfe3ea]"
          aria-hidden="true"
        />
        <span
          className="absolute top-6 right-8 h-24 w-28 rounded-[40%] bg-[#d8ead9]"
          aria-hidden="true"
        />
        {hotels.slice(0, 8).map((hotel) => (
          <span
            key={hotel.slug}
            style={{ left: `${hotel.map.x}%`, top: `${hotel.map.y}%` }}
            className="tabular absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card px-2 py-1 text-[11px] font-bold shadow-sm"
          >
            {hotel.offer ? formatPrice(hotelPerNight(hotel.offer, nights)) : '—'}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 p-3">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Map className="size-4 text-muted-foreground" aria-hidden="true" />
          Отели на карте
        </p>
        <button
          type="button"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Открыть карту
        </button>
      </div>
    </div>
  )
}
