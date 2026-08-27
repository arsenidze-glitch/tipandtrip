'use client'

import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { HotelCard } from '@/components/hotel-card'
import {
  EMPTY_FILTERS,
  FiltersPanel,
  PRICE_CEILING,
  activeFilterCount,
  type Filters,
} from '@/components/search/filters-panel'
import { MapPreview } from '@/components/search/map-preview'
import { Button } from '@/components/ui/button'
import { hotelPerNight, hotelTotal, hotels, type Hotel } from '@/lib/data/hotels'
import { plural } from '@/lib/format'
import { nightsBetween, type SearchContext } from '@/lib/search'

type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'distance'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'recommended', label: 'Рекомендуем' },
  { key: 'price-asc', label: 'Сначала дешёвые' },
  { key: 'price-desc', label: 'Сначала дорогие' },
  { key: 'rating', label: 'Высокая оценка' },
  { key: 'distance', label: 'Ближе к пляжу' },
]

const QUICK: { key: keyof Filters | 'family'; label: string }[] = [
  { key: 'freeCancellation', label: 'Бесплатная отмена' },
  { key: 'family', label: 'Для семей' },
  { key: 'payAtProperty', label: 'Оплата в отеле' },
]

function matches(hotel: Hotel, filters: Filters, nights: number) {
  if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars)) return false
  if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(hotel.propertyType)) {
    return false
  }
  if (filters.minRating > 0 && hotel.rating < filters.minRating) return false
  if (filters.maxBeachDistance != null && hotel.beachDistanceM > filters.maxBeachDistance) {
    return false
  }
  if (filters.facilities.some((facility) => !hotel.facilities.includes(facility))) return false

  const offer = hotel.offer
  // Фильтры по условиям тарифа неприменимы к отелям без предложения — их скрываем.
  const needsOffer =
    filters.freeCancellation ||
    filters.payAtProperty ||
    filters.meals.length > 0 ||
    filters.maxPerNight < PRICE_CEILING
  if (!offer) return !needsOffer

  if (filters.freeCancellation && !offer.freeCancellation) return false
  if (filters.payAtProperty && !offer.payAtProperty) return false
  if (filters.meals.length > 0 && !filters.meals.includes(offer.meal)) return false
  if (
    filters.maxPerNight < PRICE_CEILING &&
    hotelPerNight(offer, nights) > filters.maxPerNight
  ) {
    return false
  }
  return true
}

export function SearchResults({ search }: { search: SearchContext }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [sort, setSort] = useState<SortKey>('recommended')
  const [sheetOpen, setSheetOpen] = useState(false)
  const nights = nightsBetween(search.checkIn, search.checkOut)
  const active = activeFilterCount(filters)

  const visible = useMemo(() => {
    const filtered = hotels.filter((hotel) => matches(hotel, filters, nights))
    const sorted = [...filtered].sort((a, b) => {
      // Отели без цен всегда в конце списка
      if (!a.offer && b.offer) return 1
      if (a.offer && !b.offer) return -1
      switch (sort) {
        case 'price-asc':
          return hotelTotal(a.offer!) - hotelTotal(b.offer!)
        case 'price-desc':
          return hotelTotal(b.offer!) - hotelTotal(a.offer!)
        case 'rating':
          return b.rating - a.rating
        case 'distance':
          return a.beachDistanceM - b.beachDistanceM
        default:
          return b.rating * 100 - b.beachDistanceM / 50 - (a.rating * 100 - a.beachDistanceM / 50)
      }
    })
    return sorted
  }, [filters, nights, sort])

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
      <div className="hidden min-w-0 flex-col gap-4 lg:flex">
        <MapPreview hotels={visible} nights={nights} />
        {/* Фильтры: сайдбар на десктопе */}
        <aside>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-heading text-base font-bold">Фильтры</h2>
            <FiltersPanel
              filters={filters}
              onChange={setFilters}
              counts={{ total: hotels.length, matched: visible.length }}
            />
          </div>
        </aside>
      </div>

      <div className="min-w-0 flex-1">
        <div className="lg:hidden">
          <MapPreview hotels={visible} nights={nights} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 lg:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSheetOpen(true)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Фильтры{active > 0 ? ` · ${active}` : ''}
          </Button>

          {QUICK.map((quick) => {
            const checked =
              quick.key === 'family'
                ? filters.facilities.includes('family-rooms')
                : Boolean(filters[quick.key as 'freeCancellation' | 'payAtProperty'])
            return (
              <button
                key={quick.label}
                type="button"
                aria-pressed={checked}
                onClick={() => {
                  if (quick.key === 'family') {
                    setFilters((current) => ({
                      ...current,
                      facilities: checked
                        ? current.facilities.filter((item) => item !== 'family-rooms')
                        : [...current.facilities, 'family-rooms'],
                    }))
                    return
                  }
                  setFilters((current) => ({
                    ...current,
                    [quick.key]: !checked,
                  }))
                }}
                className={`h-9 rounded-lg border px-3 text-[13px] font-semibold transition-colors ${
                  checked
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:bg-muted'
                }`}
              >
                {quick.label}
              </button>
            )
          })}

          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Сортировка</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-9 rounded-lg border border-border bg-card px-2 text-sm font-semibold outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {visible.length} {plural(visible.length, ['вариант', 'варианта', 'вариантов'])} на выбранные
          даты
        </p>

        {visible.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-heading text-lg font-bold">Ничего не подошло</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Слишком много условий сразу. Попробуйте увеличить лимит цены или снять часть фильтров —
              например, требование бесплатной отмены.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setFilters(EMPTY_FILTERS)}>
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            {visible.map((hotel) => (
              <li key={hotel.slug}>
                <HotelCard hotel={hotel} search={search} nights={nights} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Фильтры: полноэкранная панель на мобильных */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <h2 className="font-heading text-base font-bold">Фильтры</h2>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label="Закрыть фильтры"
              className="grid size-9 place-items-center rounded-lg hover:bg-muted"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <FiltersPanel
              filters={filters}
              onChange={setFilters}
              counts={{ total: hotels.length, matched: visible.length }}
            />
          </div>
          <div className="flex gap-2 border-t border-border bg-card px-4 py-3">
            <Button variant="outline" block onClick={() => setFilters(EMPTY_FILTERS)}>
              Сбросить
            </Button>
            <Button block onClick={() => setSheetOpen(false)}>
              Показать {visible.length}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
