'use client'

import { Button } from '@/components/ui/button'
import { FACILITY_LABELS } from '@/lib/data/hotels'
import { formatPrice } from '@/lib/format'

export type Filters = {
  maxPerNight: number
  stars: number[]
  meals: string[]
  facilities: string[]
  freeCancellation: boolean
  payAtProperty: boolean
  minRating: number
  maxBeachDistance: number | null
  propertyTypes: string[]
}

export const PRICE_CEILING = 400

export const EMPTY_FILTERS: Filters = {
  maxPerNight: PRICE_CEILING,
  stars: [],
  meals: [],
  facilities: [],
  freeCancellation: false,
  payAtProperty: false,
  minRating: 0,
  maxBeachDistance: null,
  propertyTypes: [],
}

const MEAL_OPTIONS = [
  { value: 'breakfast', label: 'Завтрак включён' },
  { value: 'half-board', label: 'Завтрак и ужин' },
  { value: 'all-inclusive', label: 'Всё включено' },
  { value: 'room-only', label: 'Без питания' },
]

const FACILITY_OPTIONS = [
  'pool',
  'family-rooms',
  'kids-club',
  'spa',
  'kitchen',
  'beach-front',
  'airport-shuttle',
  'parking',
]

const PROPERTY_OPTIONS = [
  { value: 'hotel', label: 'Отели' },
  { value: 'resort', label: 'Курортные отели' },
  { value: 'apartment', label: 'Апартаменты' },
  { value: 'villa', label: 'Виллы' },
  { value: 'guesthouse', label: 'Бутик и гостевые дома' },
]

const RATING_OPTIONS = [
  { value: 9, label: 'Превосходно, 9+' },
  { value: 8.5, label: 'Отлично, 8,5+' },
  { value: 8, label: 'Очень хорошо, 8+' },
  { value: 7, label: 'Хорошо, 7+' },
]

const BEACH_OPTIONS = [
  { value: 200, label: 'До 200 м' },
  { value: 500, label: 'До 500 м' },
  { value: 1000, label: 'До 1 км' },
]

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function activeFilterCount(filters: Filters) {
  return (
    (filters.maxPerNight < PRICE_CEILING ? 1 : 0) +
    filters.stars.length +
    filters.meals.length +
    filters.facilities.length +
    filters.propertyTypes.length +
    (filters.freeCancellation ? 1 : 0) +
    (filters.payAtProperty ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxBeachDistance != null ? 1 : 0)
  )
}

export function FiltersPanel({
  filters,
  onChange,
  counts,
}: {
  filters: Filters
  onChange: (filters: Filters) => void
  counts: { total: number; matched: number }
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })
  const active = activeFilterCount(filters)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Подходит {counts.matched} из {counts.total}
        </p>
        {active > 0 && (
          <Button variant="link" size="sm" onClick={() => onChange(EMPTY_FILTERS)}>
            Сбросить всё
          </Button>
        )}
      </div>

      <Group title="Цена за ночь">
        <label className="block">
          <span className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">До</span>
            <span className="tabular font-semibold">
              {filters.maxPerNight >= PRICE_CEILING
                ? `${formatPrice(PRICE_CEILING)}+`
                : formatPrice(filters.maxPerNight)}
            </span>
          </span>
          <input
            type="range"
            min={20}
            max={PRICE_CEILING}
            step={10}
            value={filters.maxPerNight}
            onChange={(event) => set({ maxPerNight: Number(event.target.value) })}
            className="w-full accent-[color:var(--primary)]"
            aria-label="Максимальная цена за ночь"
          />
        </label>
        <p className="mt-1 text-xs text-muted-foreground">
          Цена указана со всеми налогами и сборами
        </p>
      </Group>

      <Group title="Условия бронирования">
        <Check
          label="Бесплатная отмена"
          checked={filters.freeCancellation}
          onChange={(checked) => set({ freeCancellation: checked })}
        />
        <Check
          label="Оплата в отеле"
          checked={filters.payAtProperty}
          onChange={(checked) => set({ payAtProperty: checked })}
        />
      </Group>

      <Group title="Оценка гостей">
        {RATING_OPTIONS.map((option) => (
          <Radio
            key={option.value}
            name="rating"
            label={option.label}
            checked={filters.minRating === option.value}
            onChange={() =>
              set({ minRating: filters.minRating === option.value ? 0 : option.value })
            }
          />
        ))}
      </Group>

      <Group title="Класс отеля">
        <div className="flex flex-wrap gap-2">
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              type="button"
              aria-pressed={filters.stars.includes(star)}
              onClick={() => set({ stars: toggle(filters.stars, star) })}
              className={`h-9 rounded-lg border px-3 text-sm font-semibold transition-colors ${
                filters.stars.includes(star)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card hover:bg-muted'
              }`}
            >
              {star}★
            </button>
          ))}
        </div>
      </Group>

      <Group title="Питание">
        {MEAL_OPTIONS.map((option) => (
          <Check
            key={option.value}
            label={option.label}
            checked={filters.meals.includes(option.value)}
            onChange={() => set({ meals: toggle(filters.meals, option.value) })}
          />
        ))}
      </Group>

      <Group title="Расстояние до пляжа">
        {BEACH_OPTIONS.map((option) => (
          <Radio
            key={option.value}
            name="beach"
            label={option.label}
            checked={filters.maxBeachDistance === option.value}
            onChange={() =>
              set({
                maxBeachDistance:
                  filters.maxBeachDistance === option.value ? null : option.value,
              })
            }
          />
        ))}
      </Group>

      <Group title="Тип размещения">
        {PROPERTY_OPTIONS.map((option) => (
          <Check
            key={option.value}
            label={option.label}
            checked={filters.propertyTypes.includes(option.value)}
            onChange={() => set({ propertyTypes: toggle(filters.propertyTypes, option.value) })}
          />
        ))}
      </Group>

      <Group title="Удобства">
        {FACILITY_OPTIONS.map((facility) => (
          <Check
            key={facility}
            label={FACILITY_LABELS[facility] ?? facility}
            checked={filters.facilities.includes(facility)}
            onChange={() => set({ facilities: toggle(filters.facilities, facility) })}
          />
        ))}
      </Group>
    </div>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-5 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-bold">{title}</legend>
      <div className="flex flex-col gap-2">{children}</div>
    </fieldset>
  )
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 shrink-0 rounded-sm accent-[color:var(--primary)]"
      />
      <span>{label}</span>
    </label>
  )
}

function Radio({
  name,
  label,
  checked,
  onChange,
}: {
  name: string
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        onClick={() => checked && onChange()}
        className="size-4 shrink-0 accent-[color:var(--primary)]"
      />
      <span>{label}</span>
    </label>
  )
}
