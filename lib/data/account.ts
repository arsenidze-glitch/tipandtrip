import type { SearchContext } from '@/lib/search'

/**
 * Моковые данные личного кабинета. В прототипе пользователь один и всегда «залогинен»,
 * на странице /login форма просто редиректит в кабинет.
 */

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled'

export type UserBooking = {
  id: string
  /** Номер брони в формате TT-XXXXXX, как на странице подтверждения */
  reference: string
  hotelSlug: string
  roomName: string
  rateName: string
  search: SearchContext
  totalEur: number
  status: BookingStatus
  /** Крайняя дата бесплатной отмены, YYYY-MM-DD */
  freeCancellationUntil?: string
  paidAt: string
}

export type AccountUser = {
  firstName: string
  lastName: string
  email: string
  phone: string
  /** Дата регистрации, YYYY-MM-DD */
  memberSince: string
  /** Уровень программы лояльности */
  tier: 'Genius 1' | 'Genius 2' | 'Genius 3'
  completedStays: number
}

export const accountUser: AccountUser = {
  firstName: 'Иван',
  lastName: 'Петров',
  email: 'ivan.petrov@example.com',
  phone: '+7 921 000-11-22',
  memberSince: '2024-03-15',
  tier: 'Genius 2',
  completedStays: 4,
}

export const userBookings: UserBooking[] = [
  {
    id: 'b1',
    reference: 'TT-284193',
    hotelSlug: 'seaview-paradise-phuket',
    roomName: 'Семейный номер с видом на сад',
    rateName: 'Завтрак включён · бесплатная отмена',
    search: {
      destination: 'Пхукет, Таиланд',
      checkIn: '2026-10-12',
      checkOut: '2026-10-19',
      adults: 2,
      childrenAges: [9],
      rooms: 1,
    },
    totalEur: 1162,
    status: 'upcoming',
    freeCancellationUntil: '2026-10-05',
    paidAt: '2026-09-02',
  },
  {
    id: 'b2',
    reference: 'TT-271046',
    hotelSlug: 'nai-harn-cliff-villas',
    roomName: 'Вилла с бассейном',
    rateName: 'Без питания · невозвратный',
    search: {
      destination: 'Пхукет, Таиланд',
      checkIn: '2026-12-27',
      checkOut: '2027-01-03',
      adults: 2,
      childrenAges: [],
      rooms: 1,
    },
    totalEur: 1946,
    status: 'upcoming',
    paidAt: '2026-08-21',
  },
  {
    id: 'b3',
    reference: 'TT-198522',
    hotelSlug: 'phuket-old-town-boutique',
    roomName: 'Стандартный номер',
    rateName: 'Завтрак включён',
    search: {
      destination: 'Пхукет, Таиланд',
      checkIn: '2026-03-08',
      checkOut: '2026-03-12',
      adults: 2,
      childrenAges: [],
      rooms: 1,
    },
    totalEur: 396,
    status: 'completed',
    paidAt: '2026-02-10',
  },
  {
    id: 'b4',
    reference: 'TT-176310',
    hotelSlug: 'kata-breeze-residence',
    roomName: 'Апартаменты с одной спальней',
    rateName: 'Без питания · бесплатная отмена',
    search: {
      destination: 'Пхукет, Таиланд',
      checkIn: '2025-11-02',
      checkOut: '2025-11-09',
      adults: 2,
      childrenAges: [9],
      rooms: 1,
    },
    totalEur: 742,
    status: 'completed',
    paidAt: '2025-10-01',
  },
  {
    id: 'b5',
    reference: 'TT-164077',
    hotelSlug: 'patong-central-hotel',
    roomName: 'Двухместный номер',
    rateName: 'Без питания · бесплатная отмена',
    search: {
      destination: 'Пхукет, Таиланд',
      checkIn: '2025-09-14',
      checkOut: '2025-09-17',
      adults: 1,
      childrenAges: [],
      rooms: 1,
    },
    totalEur: 219,
    status: 'cancelled',
    paidAt: '2025-08-30',
  },
]

export const favoriteHotelSlugs = ['banyan-sands-resort-spa', 'nai-harn-cliff-villas', 'seaview-paradise-phuket']

export const bookingStatusLabel: Record<BookingStatus, string> = {
  upcoming: 'Предстоит',
  completed: 'Завершено',
  cancelled: 'Отменено',
}
