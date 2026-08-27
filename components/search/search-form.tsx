'use client'

import { Building2, CalendarDays, Landmark, MapPin, Minus, Plus, Search, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useId, useMemo, useState } from 'react'

import { DateRangeCalendar } from '@/components/search/date-range-calendar'
import { FieldPopover } from '@/components/search/field-popover'
import { Button } from '@/components/ui/button'
import { destinationSuggestions } from '@/lib/data/content'
import { plural } from '@/lib/format'
import {
  DEFAULT_SEARCH,
  formatGuests,
  formatShortRange,
  searchHref,
  type SearchContext,
} from '@/lib/search'
import { cn } from '@/lib/utils'

type OpenField = 'destination' | 'dates' | 'guests' | null

const ICONS = {
  city: MapPin,
  hotel: Building2,
  landmark: Landmark,
} as const

export function SearchForm({
  initial = DEFAULT_SEARCH,
  variant = 'hero',
  className,
}: {
  initial?: SearchContext
  variant?: 'hero' | 'compact'
  className?: string
}) {
  const router = useRouter()
  const id = useId()
  const [search, setSearch] = useState<SearchContext>(initial)
  const [open, setOpen] = useState<OpenField>(null)
  const [query, setQuery] = useState('')

  const compact = variant === 'compact'

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return destinationSuggestions
    return destinationSuggestions
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(term)),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  function submit() {
    setOpen(null)
    router.push(searchHref(search))
  }

  function updateChildren(count: number) {
    setSearch((current) => {
      const next = [...current.childrenAges]
      while (next.length < count) next.push(9)
      next.length = Math.max(0, count)
      return { ...current, childrenAges: next }
    })
  }

  const fieldBase =
    'relative flex min-w-0 flex-1 flex-col justify-center rounded-xl border border-border bg-card text-left transition-colors hover:border-[color:var(--border-strong)]'

  return (
    <form
      className={cn(
        'flex w-full flex-col gap-2 rounded-2xl bg-card/95 p-2 shadow-[0_16px_40px_-20px_rgba(16,20,24,0.35)] ring-1 ring-border md:flex-row md:items-stretch',
        compact && 'shadow-none ring-0 md:gap-2 md:p-0',
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
      role="search"
      aria-label="Поиск отелей"
    >
      {/* Направление */}
      <div className={cn(fieldBase, compact ? 'md:flex-[1.4]' : 'md:flex-[1.6]')}>
        <label
          htmlFor={`${id}-destination`}
          id={`${id}-destination-label`}
          className="px-3 pt-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
        >
          Направление
        </label>
        <div className="flex items-center gap-2 px-3 pb-2">
          <MapPin className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            id={`${id}-destination`}
            value={open === 'destination' ? query : search.destination}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => {
              setQuery('')
              setOpen('destination')
            }}
            placeholder="Город, отель или район"
            autoComplete="off"
            className="w-full min-w-0 bg-transparent text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted-foreground"
          />
        </div>

        <FieldPopover
          open={open === 'destination'}
          onClose={() => setOpen(null)}
          labelledBy={`${id}-destination-label`}
          className="max-h-[330px] overflow-y-auto md:w-[400px]"
        >
          {suggestions.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Ничего не нашлось. Попробуйте другое название.
            </p>
          ) : (
            suggestions.map((group) => (
              <div key={group.group} className="mb-1 last:mb-0">
                <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {group.group}
                </p>
                <ul>
                  {group.items.map((item) => {
                    const Icon = ICONS[item.icon as keyof typeof ICONS] ?? MapPin
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => {
                            setSearch((current) => ({ ...current, destination: item.label }))
                            setOpen('dates')
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted"
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium">{item.label}</span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {item.meta}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}
        </FieldPopover>
      </div>

      {/* Даты */}
      <div className={cn(fieldBase, 'md:flex-1')}>
        <span
          id={`${id}-dates-label`}
          className="px-3 pt-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
        >
          Даты поездки
        </span>
        <button
          type="button"
          onClick={() => setOpen(open === 'dates' ? null : 'dates')}
          aria-expanded={open === 'dates'}
          className="flex items-center gap-2 px-3 pb-2 text-left"
        >
          <CalendarDays className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="truncate text-sm font-semibold">
            {formatShortRange(search.checkIn, search.checkOut)}
          </span>
        </button>

        <FieldPopover
          open={open === 'dates'}
          onClose={() => setOpen(null)}
          labelledBy={`${id}-dates-label`}
          className="md:w-[620px]"
        >
          <DateRangeCalendar
            checkIn={search.checkIn}
            checkOut={search.checkOut}
            onChange={(range) => setSearch((current) => ({ ...current, ...range }))}
          />
          <div className="flex justify-end border-t border-border px-2 pt-2">
            <Button size="sm" variant="subtle" onClick={() => setOpen('guests')}>
              Готово
            </Button>
          </div>
        </FieldPopover>
      </div>

      {/* Гости */}
      <div className={cn(fieldBase, 'md:flex-1')}>
        <span
          id={`${id}-guests-label`}
          className="px-3 pt-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
        >
          Гости и номера
        </span>
        <button
          type="button"
          onClick={() => setOpen(open === 'guests' ? null : 'guests')}
          aria-expanded={open === 'guests'}
          className="flex items-center gap-2 px-3 pb-2 text-left"
        >
          <Users className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="truncate text-sm font-semibold">{formatGuests(search)}</span>
        </button>

        <FieldPopover
          open={open === 'guests'}
          onClose={() => setOpen(null)}
          labelledBy={`${id}-guests-label`}
          className="right-0 left-auto md:w-[360px]"
        >
          <div className="flex flex-col gap-1 p-1">
            <Stepper
              label="Взрослые"
              hint="от 18 лет"
              value={search.adults}
              min={1}
              max={12}
              onChange={(value) => setSearch((current) => ({ ...current, adults: value }))}
            />
            <Stepper
              label="Дети"
              hint="0–17 лет"
              value={search.childrenAges.length}
              min={0}
              max={6}
              onChange={updateChildren}
            />
            {search.childrenAges.length > 0 && (
              <div className="rounded-lg bg-muted p-3">
                <p className="mb-2 text-xs text-muted-foreground">
                  Возраст ребёнка на момент поездки влияет на доступность номеров и цену.
                </p>
                <div className="flex flex-wrap gap-2">
                  {search.childrenAges.map((age, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 text-xs"
                    >
                      <span className="text-muted-foreground">Ребёнок {index + 1}</span>
                      <select
                        value={age}
                        onChange={(event) => {
                          const value = Number(event.target.value)
                          setSearch((current) => {
                            const next = [...current.childrenAges]
                            next[index] = value
                            return { ...current, childrenAges: next }
                          })
                        }}
                        aria-label={`Возраст ребёнка ${index + 1}`}
                        className="bg-transparent text-sm font-semibold outline-none"
                      >
                        {Array.from({ length: 18 }, (_, value) => (
                          <option key={value} value={value}>
                            {value === 0 ? 'до 1 года' : `${value} ${plural(value, ['год', 'года', 'лет'])}`}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <Stepper
              label="Номера"
              hint="сколько отдельных номеров нужно"
              value={search.rooms}
              min={1}
              max={6}
              onChange={(value) => setSearch((current) => ({ ...current, rooms: value }))}
            />
            <div className="flex justify-end border-t border-border px-2 pt-2">
              <Button size="sm" variant="subtle" onClick={() => setOpen(null)}>
                Готово
              </Button>
            </div>
          </div>
        </FieldPopover>
      </div>

      <Button
        type="submit"
        size={compact ? 'md' : 'lg'}
        className={cn('md:w-auto', compact ? 'md:px-5' : 'md:px-8')}
        block
      >
        <Search className="size-4" aria-hidden="true" />
        Найти
      </Button>
    </form>
  )
}

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  hint: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-2 py-2.5">
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          aria-label={`${label}: меньше`}
        >
          <Minus className="size-4" />
        </Button>
        <output className="tabular w-9 text-center text-sm font-semibold">{value}</output>
        <Button
          variant="outline"
          size="icon-sm"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          aria-label={`${label}: больше`}
        >
          <Plus className="size-4" />
        </Button>
      </span>
    </div>
  )
}
