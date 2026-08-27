import { nightsLabel, plural } from '@/lib/format'

export type SearchContext = {
  /** Человекочитаемое направление, например «Пхукет, Таиланд» */
  destination: string
  /** Дата заезда в формате YYYY-MM-DD */
  checkIn: string
  /** Дата выезда в формате YYYY-MM-DD */
  checkOut: string
  adults: number
  /** Возраст каждого ребёнка — влияет на доступность номеров и цену */
  childrenAges: number[]
  rooms: number
}

export const DEFAULT_SEARCH: SearchContext = {
  destination: 'Пхукет, Таиланд',
  checkIn: '2026-10-12',
  checkOut: '2026-10-19',
  adults: 2,
  childrenAges: [9],
  rooms: 1,
}

const MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

const MONTHS_SHORT = [
  'янв',
  'фев',
  'мар',
  'апр',
  'мая',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
]

export const MONTHS_NOMINATIVE = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

export const WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export function parseIsoDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1))
}

export function toIsoDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function addDays(iso: string, days: number) {
  const date = parseIsoDate(iso)
  date.setUTCDate(date.getUTCDate() + days)
  return toIsoDate(date)
}

export function nightsBetween(checkIn: string, checkOut: string) {
  const diff = parseIsoDate(checkOut).getTime() - parseIsoDate(checkIn).getTime()
  return Math.max(1, Math.round(diff / 86_400_000))
}

/** «12 октября 2026» */
export function formatLongDate(iso: string) {
  const date = parseIsoDate(iso)
  return `${date.getUTCDate()} ${MONTHS_GENITIVE[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

/** «12 окт» */
export function formatShortDate(iso: string) {
  const date = parseIsoDate(iso)
  return `${date.getUTCDate()} ${MONTHS_SHORT[date.getUTCMonth()]}`
}

/** «12–19 октября 2026» либо «28 сентября — 5 октября 2026» */
export function formatDateRange(checkIn: string, checkOut: string) {
  const from = parseIsoDate(checkIn)
  const to = parseIsoDate(checkOut)
  if (from.getUTCMonth() === to.getUTCMonth() && from.getUTCFullYear() === to.getUTCFullYear()) {
    return `${from.getUTCDate()}–${to.getUTCDate()} ${MONTHS_GENITIVE[to.getUTCMonth()]} ${to.getUTCFullYear()}`
  }
  return `${from.getUTCDate()} ${MONTHS_GENITIVE[from.getUTCMonth()]} — ${formatLongDate(checkOut)}`
}

export function formatShortRange(checkIn: string, checkOut: string) {
  return `${formatShortDate(checkIn)} — ${formatShortDate(checkOut)}`
}

export function totalGuests(search: SearchContext) {
  return search.adults + search.childrenAges.length
}

/** «2 взрослых, 1 ребёнок» */
export function formatGuests(search: SearchContext) {
  const parts = [
    `${search.adults} ${plural(search.adults, ['взрослый', 'взрослых', 'взрослых'])}`,
  ]
  if (search.childrenAges.length > 0) {
    parts.push(
      `${search.childrenAges.length} ${plural(search.childrenAges.length, ['ребёнок', 'ребёнка', 'детей'])}`,
    )
  }
  parts.push(`${search.rooms} ${plural(search.rooms, ['номер', 'номера', 'номеров'])}`)
  return parts.join(', ')
}

/** «2 взрослых и 1 ребёнок, 9 лет» — для подтверждений бронирования */
export function formatGuestsDetailed(search: SearchContext) {
  const adults = `${search.adults} ${plural(search.adults, ['взрослый', 'взрослых', 'взрослых'])}`
  if (search.childrenAges.length === 0) return adults
  const ages = search.childrenAges
    .map((age) => `${age} ${plural(age, ['год', 'года', 'лет'])}`)
    .join(', ')
  const kids = `${search.childrenAges.length} ${plural(search.childrenAges.length, ['ребёнок', 'ребёнка', 'детей'])}`
  return `${adults} и ${kids} (${ages})`
}

export function formatStaySummary(search: SearchContext) {
  const nights = nightsBetween(search.checkIn, search.checkOut)
  return `${formatDateRange(search.checkIn, search.checkOut)} · ${nightsLabel(nights)} · ${formatGuests(search)}`
}

type RawParams = Record<string, string | string[] | undefined>

function readParam(params: RawParams, key: string) {
  const value = params[key]
  return Array.isArray(value) ? value[0] : value
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export function parseSearchParams(params: RawParams): SearchContext {
  const destination = readParam(params, 'destination')?.trim()
  const checkIn = readParam(params, 'checkin')
  const checkOut = readParam(params, 'checkout')
  const adults = Number(readParam(params, 'adults'))
  const childrenRaw = readParam(params, 'children')
  const rooms = Number(readParam(params, 'rooms'))

  const parsedAges = childrenRaw
    ? childrenRaw
        .split(',')
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value) && value >= 0 && value <= 17)
    : null

  const safeCheckIn = checkIn && ISO_DATE.test(checkIn) ? checkIn : DEFAULT_SEARCH.checkIn
  let safeCheckOut = checkOut && ISO_DATE.test(checkOut) ? checkOut : DEFAULT_SEARCH.checkOut
  if (parseIsoDate(safeCheckOut) <= parseIsoDate(safeCheckIn)) {
    safeCheckOut = addDays(safeCheckIn, 1)
  }

  return {
    destination: destination || DEFAULT_SEARCH.destination,
    checkIn: safeCheckIn,
    checkOut: safeCheckOut,
    adults: Number.isFinite(adults) && adults >= 1 && adults <= 12 ? adults : DEFAULT_SEARCH.adults,
    childrenAges: parsedAges ?? DEFAULT_SEARCH.childrenAges,
    rooms: Number.isFinite(rooms) && rooms >= 1 && rooms <= 6 ? rooms : DEFAULT_SEARCH.rooms,
  }
}

export function searchToParams(search: SearchContext) {
  const params = new URLSearchParams({
    destination: search.destination,
    checkin: search.checkIn,
    checkout: search.checkOut,
    adults: String(search.adults),
    rooms: String(search.rooms),
  })
  if (search.childrenAges.length > 0) {
    params.set('children', search.childrenAges.join(','))
  }
  return params
}

export function searchHref(search: SearchContext, pathname = '/search') {
  return `${pathname}?${searchToParams(search).toString()}`
}

export function hotelHref(slug: string, search: SearchContext) {
  return `/hotel/${slug}?${searchToParams(search).toString()}`
}

export function bookingHref(
  slug: string,
  search: SearchContext,
  selection: { roomId: string; rateId: string; total?: number },
) {
  const params = searchToParams(search)
  params.set('room', selection.roomId)
  params.set('rate', selection.rateId)
  if (selection.total != null) params.set('total', String(selection.total))
  return `/booking/${slug}?${params.toString()}`
}
