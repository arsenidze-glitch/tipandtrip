/**
 * Каталог отелей прототипа.
 *
 * Структура намеренно приближена к ответу поставщика (RateHawk / ETG):
 * статичный контент отеля отделён от предложения (offer) по конкретным датам.
 * При подключении API достаточно заменить источник данных, не меняя компоненты.
 */

export type HotelPhoto = {
  src: string
  alt: string
  category: 'rooms' | 'pool' | 'beach' | 'restaurant' | 'exterior'
}

export type HotelOffer = {
  roomName: string
  meal: 'breakfast' | 'half-board' | 'room-only' | 'all-inclusive'
  mealLabel: string
  freeCancellation: boolean
  cancellationLabel: string
  paymentLabel: string
  payAtProperty: boolean
  /** Стоимость проживания без налогов и сборов, за весь срок */
  room: number
  /** Налоги и сборы за весь срок */
  taxes: number
  roomsLeft?: number
  badge?: 'value' | 'recommended'
}

export type Hotel = {
  slug: string
  name: string
  stars: number
  propertyType: 'hotel' | 'resort' | 'apartment' | 'villa' | 'guesthouse'
  propertyTypeLabel: string
  neighborhood: string
  city: string
  region: string
  country: string
  address: string
  chain?: string
  rating: number
  reviewsCount: number
  photosCount: number
  beachDistanceM: number
  centerDistanceKm: number
  airportDistanceKm: number
  photos: HotelPhoto[]
  summary: string
  amenityTags: string[]
  facilities: string[]
  familyFriendly: boolean
  accessible: boolean
  /** Позиция маркера на макете карты, в процентах */
  map: { x: number; y: number }
  collections: CollectionId[]
  /** offer === null означает, что на выбранные даты цен нет */
  offer: HotelOffer | null
  soldOutNote?: string
}

export type CollectionId = 'family' | 'beach' | 'top-rated' | 'unusual' | 'autumn'

export const MEAL_LABELS: Record<HotelOffer['meal'], string> = {
  breakfast: 'Завтрак включён',
  'half-board': 'Завтрак и ужин',
  'room-only': 'Без питания',
  'all-inclusive': 'Всё включено',
}

export const hotels: Hotel[] = [
  {
    slug: 'seaview-paradise-phuket',
    name: 'Seaview Paradise Phuket',
    stars: 4,
    propertyType: 'hotel',
    propertyTypeLabel: 'Отель',
    neighborhood: 'Карон',
    city: 'Пхукет',
    region: 'Пхукет',
    country: 'Таиланд',
    address: '412 Patak Road, Karon Beach, Muang, Phuket 83100, Таиланд',
    rating: 8.8,
    reviewsCount: 1284,
    photosCount: 46,
    beachDistanceM: 350,
    centerDistanceKm: 18.4,
    airportDistanceKm: 47,
    photos: [
      {
        src: '/hotel/phuket-exterior.png',
        alt: 'Главный корпус Seaview Paradise Phuket в тропическом саду',
        category: 'exterior',
      },
      {
        src: '/hotel/phuket-pool.png',
        alt: 'Открытый бассейн отеля с шезлонгами под пальмами',
        category: 'pool',
      },
      {
        src: '/hotel/phuket-family-room.png',
        alt: 'Семейный номер с балконом и видом на сад',
        category: 'rooms',
      },
      {
        src: '/hotel/phuket-beach.png',
        alt: 'Пляж Карон в 350 метрах от отеля',
        category: 'beach',
      },
      {
        src: '/hotel/restaurant.png',
        alt: 'Терраса ресторана отеля вечером',
        category: 'restaurant',
      },
      { src: '/hotel/lobby.png', alt: 'Лобби отеля с панорамными окнами', category: 'exterior' },
      { src: '/hotel/room-deluxe.png', alt: 'Двухместный номер Deluxe с видом на море', category: 'rooms' },
      { src: '/hotel/room-suite.png', alt: 'Апартаменты с двумя спальнями и кухней', category: 'rooms' },
      { src: '/hotel/pool.png', alt: 'Детский бассейн и зона отдыха', category: 'pool' },
      { src: '/hotel/beach.png', alt: 'Зонты и лежаки на пляже Карон', category: 'beach' },
      { src: '/hotel/spa.png', alt: 'Спа-центр с процедурными кабинетами', category: 'exterior' },
    ],
    summary:
      'Спокойный отель в средней части Карона: до пляжа около 5 минут пешком, есть семейные номера и открытый бассейн.',
    amenityTags: ['Бассейн', 'Семейные номера', 'Трансфер из аэропорта'],
    facilities: [
      'pool',
      'wifi',
      'parking',
      'restaurant',
      'spa',
      'gym',
      'family-rooms',
      'airport-shuttle',
      'kids-club',
      'air-conditioning',
    ],
    familyFriendly: true,
    accessible: true,
    map: { x: 34, y: 46 },
    collections: ['family', 'beach', 'autumn'],
    offer: {
      roomName: 'Семейный номер с балконом и видом на сад',
      meal: 'breakfast',
      mealLabel: 'Завтрак включён',
      freeCancellation: true,
      cancellationLabel: 'Бесплатная отмена до 9 октября',
      paymentLabel: 'Оплата сейчас через поставщика',
      payAtProperty: false,
      room: 1120,
      taxes: 128,
      badge: 'recommended',
    },
  },
  {
    slug: 'kata-breeze-residence',
    name: 'Kata Breeze Residence',
    stars: 3,
    propertyType: 'apartment',
    propertyTypeLabel: 'Апарт-отель',
    neighborhood: 'Ката',
    city: 'Пхукет',
    region: 'Пхукет',
    country: 'Таиланд',
    address: '78/3 Kata Road, Kata Beach, Phuket 83100, Таиланд',
    rating: 8.4,
    reviewsCount: 642,
    photosCount: 31,
    beachDistanceM: 120,
    centerDistanceKm: 19.2,
    airportDistanceKm: 49,
    photos: [
      { src: '/hotel/lobby.png', alt: 'Входная зона Kata Breeze Residence', category: 'exterior' },
      { src: '/hotel/room-deluxe.png', alt: 'Студия с кухней в Kata Breeze Residence', category: 'rooms' },
      { src: '/hotel/phuket-beach.png', alt: 'Пляж Ката в 120 метрах от дома', category: 'beach' },
      { src: '/hotel/pool.png', alt: 'Небольшой бассейн во внутреннем дворе', category: 'pool' },
    ],
    summary:
      'Апартаменты с кухней в 2 минутах от пляжа Ката. Хороший вариант, если хочется готовить самостоятельно.',
    amenityTags: ['Кухня в номере', 'Бассейн', 'Стиральная машина'],
    facilities: ['pool', 'wifi', 'kitchen', 'parking', 'family-rooms', 'air-conditioning', 'laundry'],
    familyFriendly: true,
    accessible: false,
    map: { x: 30, y: 62 },
    collections: ['beach', 'autumn'],
    offer: {
      roomName: 'Студия с балконом, 2 взрослых и 1 ребёнок',
      meal: 'room-only',
      mealLabel: 'Без питания',
      freeCancellation: true,
      cancellationLabel: 'Бесплатная отмена до 10 октября',
      paymentLabel: 'Оплата в отеле при заселении',
      payAtProperty: true,
      room: 791,
      taxes: 77,
      badge: 'value',
    },
  },
  {
    slug: 'banyan-sands-resort-spa',
    name: 'Banyan Sands Resort & Spa',
    stars: 5,
    propertyType: 'resort',
    propertyTypeLabel: 'Курортный отель',
    neighborhood: 'Банг-Тао',
    city: 'Пхукет',
    region: 'Пхукет',
    country: 'Таиланд',
    address: '9/1 Moo 4, Choengthale, Bang Tao Beach, Phuket 83110, Таиланд',
    chain: 'Banyan Collection',
    rating: 9.1,
    reviewsCount: 2107,
    photosCount: 88,
    beachDistanceM: 90,
    centerDistanceKm: 24.6,
    airportDistanceKm: 22,
    photos: [
      { src: '/hotel/pool.png', alt: 'Главный бассейн Banyan Sands Resort & Spa', category: 'pool' },
      { src: '/hotel/beach.png', alt: 'Пляж Банг-Тао рядом с курортом', category: 'beach' },
      { src: '/hotel/spa.png', alt: 'Спа-павильон курорта', category: 'exterior' },
      { src: '/hotel/restaurant.png', alt: 'Ресторан на террасе у воды', category: 'restaurant' },
      { src: '/hotel/room-suite.png', alt: 'Люкс с видом на океан', category: 'rooms' },
    ],
    summary:
      'Курорт первой линии в Банг-Тао: три бассейна, спа на 1 200 м² и ближайший к аэропорту пляжный район.',
    amenityTags: ['Первая линия', 'Спа-центр', 'Детский клуб'],
    facilities: [
      'pool',
      'wifi',
      'spa',
      'gym',
      'restaurant',
      'kids-club',
      'family-rooms',
      'airport-shuttle',
      'beach-front',
      'air-conditioning',
    ],
    familyFriendly: true,
    accessible: true,
    map: { x: 40, y: 22 },
    collections: ['family', 'beach', 'top-rated'],
    offer: {
      roomName: 'Номер Deluxe Garden, 2 взрослых и 1 ребёнок',
      meal: 'half-board',
      mealLabel: 'Завтрак и ужин',
      freeCancellation: true,
      cancellationLabel: 'Бесплатная отмена до 5 октября',
      paymentLabel: 'Оплата сейчас через поставщика',
      payAtProperty: false,
      room: 2163,
      taxes: 231,
    },
  },
  {
    slug: 'patong-central-hotel',
    name: 'Patong Central Hotel',
    stars: 3,
    propertyType: 'hotel',
    propertyTypeLabel: 'Отель',
    neighborhood: 'Патонг',
    city: 'Пхукет',
    region: 'Пхукет',
    country: 'Таиланд',
    address: '188 Rat-U-Thit 200 Pee Road, Patong, Phuket 83150, Таиланд',
    rating: 7.9,
    reviewsCount: 3218,
    photosCount: 54,
    beachDistanceM: 600,
    centerDistanceKm: 15.1,
    airportDistanceKm: 38,
    photos: [
      { src: '/hotel/exterior.png', alt: 'Фасад Patong Central Hotel', category: 'exterior' },
      { src: '/hotel/room-deluxe.png', alt: 'Стандартный номер с двуспальной кроватью', category: 'rooms' },
      { src: '/hotel/pool.png', alt: 'Бассейн на крыше отеля', category: 'pool' },
    ],
    summary:
      'В центре Патонга, в 8 минутах пешком от улицы Бангла. Шумный район, зато всё рядом и цены ниже.',
    amenityTags: ['Бассейн на крыше', 'Круглосуточная стойка', 'Рядом рестораны'],
    facilities: ['pool', 'wifi', 'restaurant', 'gym', 'air-conditioning', 'parking'],
    familyFriendly: false,
    accessible: false,
    map: { x: 26, y: 34 },
    collections: ['autumn'],
    offer: {
      roomName: 'Стандартный двухместный номер',
      meal: 'breakfast',
      mealLabel: 'Завтрак включён',
      freeCancellation: false,
      cancellationLabel: 'Невозвратный тариф',
      paymentLabel: 'Оплата сейчас через поставщика',
      payAtProperty: false,
      room: 674,
      taxes: 68,
      roomsLeft: 2,
    },
  },
  {
    slug: 'nai-harn-cliff-villas',
    name: 'Nai Harn Cliff Villas',
    stars: 4,
    propertyType: 'villa',
    propertyTypeLabel: 'Виллы',
    neighborhood: 'Найхарн',
    city: 'Пхукет',
    region: 'Пхукет',
    country: 'Таиланд',
    address: '55 Soi Naiharn 6, Rawai, Phuket 83130, Таиланд',
    rating: 9.3,
    reviewsCount: 418,
    photosCount: 37,
    beachDistanceM: 800,
    centerDistanceKm: 22.8,
    airportDistanceKm: 54,
    photos: [
      { src: '/hotel/room-suite.png', alt: 'Вилла с собственной террасой', category: 'rooms' },
      { src: '/hotel/phuket-pool.png', alt: 'Приватный бассейн виллы', category: 'pool' },
      { src: '/hotel/beach.png', alt: 'Пляж Найхарн в 800 метрах', category: 'beach' },
    ],
    summary:
      'Шесть отдельных вилл на склоне над Найхарном. Тихо, красивые закаты, нужна аренда байка или машины.',
    amenityTags: ['Приватный бассейн', 'Вид на океан', 'Кухня'],
    facilities: ['pool', 'wifi', 'kitchen', 'parking', 'family-rooms', 'air-conditioning'],
    familyFriendly: true,
    accessible: false,
    map: { x: 33, y: 78 },
    collections: ['unusual', 'top-rated'],
    offer: {
      roomName: 'Вилла с одной спальней и бассейном',
      meal: 'breakfast',
      mealLabel: 'Завтрак включён',
      freeCancellation: true,
      cancellationLabel: 'Бесплатная отмена до 5 октября',
      paymentLabel: 'Оплата сейчас через поставщика',
      payAtProperty: false,
      room: 1764,
      taxes: 182,
    },
  },
  {
    slug: 'phuket-old-town-boutique',
    name: 'Phuket Old Town Boutique',
    stars: 4,
    propertyType: 'guesthouse',
    propertyTypeLabel: 'Бутик-отель',
    neighborhood: 'Пхукет-Таун',
    city: 'Пхукет',
    region: 'Пхукет',
    country: 'Таиланд',
    address: '19 Thalang Road, Talat Yai, Phuket 83000, Таиланд',
    rating: 8.6,
    reviewsCount: 954,
    photosCount: 42,
    beachDistanceM: 11800,
    centerDistanceKm: 0.4,
    airportDistanceKm: 32,
    photos: [
      { src: '/hotel/lobby.png', alt: 'Историческое здание бутик-отеля в Старом городе', category: 'exterior' },
      { src: '/hotel/room-deluxe.png', alt: 'Номер с высокими потолками и деревянными ставнями', category: 'rooms' },
      { src: '/hotel/restaurant.png', alt: 'Кафе отеля с местной кухней', category: 'restaurant' },
    ],
    summary:
      'Отель в отреставрированном доме сино-португальской архитектуры на улице Таланг. До моря далеко, зато рядом рынки и кафе.',
    amenityTags: ['Архитектурное здание', 'Кафе на первом этаже', 'Прокат байков'],
    facilities: ['wifi', 'restaurant', 'air-conditioning', 'laundry', 'family-rooms'],
    familyFriendly: true,
    accessible: false,
    map: { x: 62, y: 40 },
    collections: ['unusual', 'top-rated'],
    offer: {
      roomName: 'Двухместный номер Heritage',
      meal: 'breakfast',
      mealLabel: 'Завтрак включён',
      freeCancellation: true,
      cancellationLabel: 'Бесплатная отмена до 11 октября',
      paymentLabel: 'Оплата в отеле при заселении',
      payAtProperty: true,
      room: 627,
      taxes: 63,
    },
  },
  {
    slug: 'andaman-pearl-resort',
    name: 'Andaman Pearl Resort',
    stars: 4,
    propertyType: 'resort',
    propertyTypeLabel: 'Курортный отель',
    neighborhood: 'Камала',
    city: 'Пхукет',
    region: 'Пхукет',
    country: 'Таиланд',
    address: '74/8 Moo 3, Kamala Beach, Phuket 83150, Таиланд',
    rating: 8.7,
    reviewsCount: 1136,
    photosCount: 39,
    beachDistanceM: 200,
    centerDistanceKm: 20.4,
    airportDistanceKm: 30,
    photos: [
      { src: '/hotel/phuket-pool.png', alt: 'Бассейн Andaman Pearl Resort', category: 'pool' },
      { src: '/hotel/beach.png', alt: 'Пляж Камала', category: 'beach' },
    ],
    summary:
      'Курорт в Камале с большим бассейном и семейными номерами. На выбранные даты свободных номеров нет.',
    amenityTags: ['Бассейн', 'Семейные номера', 'Пляж в 200 м'],
    facilities: ['pool', 'wifi', 'restaurant', 'family-rooms', 'kids-club', 'air-conditioning'],
    familyFriendly: true,
    accessible: true,
    map: { x: 24, y: 26 },
    collections: ['family', 'beach'],
    offer: null,
    soldOutNote: 'Все номера на 12–19 октября уже забронированы. Попробуйте соседние даты.',
  },
]

export function hotelTotal(offer: HotelOffer) {
  return offer.room + offer.taxes
}

export function hotelPerNight(offer: HotelOffer, nights: number) {
  return Math.round(hotelTotal(offer) / nights)
}

export function getHotel(slug: string) {
  return hotels.find((hotel) => hotel.slug === slug)
}

export const FACILITY_LABELS: Record<string, string> = {
  pool: 'Бассейн',
  wifi: 'Бесплатный Wi-Fi',
  parking: 'Парковка',
  restaurant: 'Ресторан',
  spa: 'Спа-центр',
  gym: 'Тренажёрный зал',
  'family-rooms': 'Семейные номера',
  'airport-shuttle': 'Трансфер из аэропорта',
  'kids-club': 'Детский клуб',
  kitchen: 'Кухня в номере',
  'beach-front': 'Первая линия',
  'air-conditioning': 'Кондиционер',
  laundry: 'Прачечная',
}

export const collections: { id: CollectionId; title: string; description: string }[] = [
  {
    id: 'family',
    title: 'Для отдыха с детьми',
    description: 'Семейные номера, детские бассейны и клубы для детей от 4 лет',
  },
  {
    id: 'beach',
    title: 'У моря',
    description: 'Не больше 10 минут пешком до пляжа',
  },
  {
    id: 'top-rated',
    title: 'С отличными отзывами',
    description: 'Оценка гостей 8,6 и выше при более чем 300 отзывах',
  },
  {
    id: 'unusual',
    title: 'Необычные отели',
    description: 'Виллы, исторические здания и небольшие проекты с характером',
  },
  {
    id: 'autumn',
    title: 'Популярно этой осенью',
    description: 'Чаще всего бронируют на октябрь и ноябрь',
  },
]
