import { Amenities } from '@/components/hotel/amenities'
import { BookingCard } from '@/components/hotel/booking-card'
import { Breadcrumbs } from '@/components/hotel/breadcrumbs'
import { Description } from '@/components/hotel/description'
import { Faq } from '@/components/hotel/faq'
import { Gallery } from '@/components/hotel/gallery'
import { HotelTitle } from '@/components/hotel/hotel-title'
import { Location } from '@/components/hotel/location'
import { Overview } from '@/components/hotel/overview'
import { Policies } from '@/components/hotel/policies'
import { Reviews } from '@/components/hotel/reviews'
import { Rooms } from '@/components/hotel/rooms'
import { SectionNav } from '@/components/hotel/section-nav'
import { SimilarHotels } from '@/components/hotel/similar-hotels'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { faq, hotel } from '@/lib/hotel'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Hotel',
      name: `${hotel.name} ${hotel.stars}*`,
      starRating: { '@type': 'Rating', ratingValue: hotel.stars },
      priceRange: `от ${hotel.priceFrom} RUB`,
      image: ['/hotel/exterior.png', '/hotel/pool.png', '/hotel/beach.png'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Göynük Mah., Atatürk Cad. 142',
        addressLocality: 'Kemer',
        addressRegion: 'Antalya',
        postalCode: '07994',
        addressCountry: 'TR',
      },
      checkinTime: hotel.checkIn,
      checkoutTime: hotel.checkOut,
      numberOfRooms: hotel.rooms,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: hotel.rating,
        bestRating: 10,
        reviewCount: hotel.reviewsCount,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

export default function HotelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main className="mx-auto max-w-[1240px] px-4 lg:px-6">
        <Breadcrumbs current={`${hotel.name} ${hotel.stars}*`} />

        <div className="flex flex-col gap-6">
          <HotelTitle />
          <Gallery />
        </div>

        <SectionNav />

        <div className="grid items-start gap-6 lg:grid-cols-[340px_1fr]">
          <div className="flex min-w-0 flex-col gap-6 lg:col-start-2 lg:row-start-1">
            <Overview />
            <Description />
            <Rooms />
            <Amenities />
            <Location />
            <Reviews />
            <Faq />
            <Policies />
            <SimilarHotels />
          </div>

          <aside
            className="sticky top-20 hidden lg:col-start-1 lg:row-start-1 lg:block"
            aria-label="Бронирование"
          >
            <BookingCard />
          </aside>
        </div>
      </main>

      <SiteFooter />

      <div className="sticky bottom-0 z-30 flex items-center justify-between gap-4 border-t border-border bg-card px-4 py-3 lg:hidden">
        <p className="leading-tight">
          <span className="block text-[11px] text-muted-foreground">Цена за ночь от</span>
          <span className="font-heading text-lg font-extrabold">
            {hotel.priceFrom.toLocaleString('ru-RU')} {hotel.currency}
          </span>
        </p>
        <a
          href="#rooms"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Выбрать номер
        </a>
      </div>
    </>
  )
}
