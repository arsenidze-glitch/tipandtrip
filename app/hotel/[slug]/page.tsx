import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { HotelTile } from '@/components/hotel-card'
import { Amenities } from '@/components/hotel/amenities'
import { BookingAside } from '@/components/hotel/booking-aside'
import { Breadcrumbs } from '@/components/hotel/breadcrumbs'
import { Faq } from '@/components/hotel/faq'
import { Gallery } from '@/components/hotel/gallery'
import { HotelIntro } from '@/components/hotel/hotel-intro'
import { Location } from '@/components/hotel/location'
import { Overview } from '@/components/hotel/overview'
import { Policies } from '@/components/hotel/policies'
import { Reviews } from '@/components/hotel/reviews'
import { RoomsSection } from '@/components/hotel/rooms-section'
import { HotelSection, SmartTip } from '@/components/hotel/section'
import { SectionNav } from '@/components/hotel/section-nav'
import { SearchHeader } from '@/components/search/search-header'
import { SiteFooter } from '@/components/site-footer'
import { faq, similarSlugs, smartTips } from '@/lib/data/hotel-detail'
import { getHotel, hotels } from '@/lib/data/hotels'
import { nightsBetween, parseSearchParams, searchHref } from '@/lib/search'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const hotel = getHotel(slug)
  if (!hotel) return { title: 'Отель не найден' }

  const title = `${hotel.name} — ${hotel.stars}★ отель в ${hotel.neighborhood}, ${hotel.city}`
  const description = `${hotel.summary} Оценка гостей ${hotel.rating.toFixed(1).replace('.', ',')} из 10. Сравните номера и тарифы, посмотрите фото и отзывы.`

  return {
    title,
    description,
    alternates: { canonical: `/hotel/${hotel.slug}` },
    openGraph: {
      title: `${title} | Tip&Trip`,
      description,
      type: 'website',
      images: [{ url: hotel.photos[0].src, width: 1200, height: 630, alt: hotel.photos[0].alt }],
    },
  }
}

export default async function HotelPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const hotel = getHotel(slug)
  if (!hotel) notFound()

  const resolved = await searchParams
  const search = parseSearchParams(resolved)
  const nights = nightsBetween(search.checkIn, search.checkOut)

  const similar = similarSlugs
    .map((item) => hotels.find((entry) => entry.slug === item))
    .filter((entry): entry is NonNullable<typeof entry> => entry != null)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <SearchHeader search={search} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="py-3">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: hotel.country, href: searchHref({ ...search, destination: hotel.country }) },
              { label: hotel.city, href: searchHref({ ...search, destination: hotel.city }) },
              { label: hotel.name },
            ]}
          />
        </div>

        <div className="flex flex-col gap-6">
          <HotelIntro hotel={hotel} />
          <Gallery photos={hotel.photos} hotelName={hotel.name} />
          <SectionNav />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="flex min-w-0 flex-col gap-8">
              <section id="overview" aria-labelledby="overview-title" className="scroll-mt-32">
                <h2 id="overview-title" className="font-heading text-xl leading-tight font-bold sm:text-2xl">
                  Об отеле
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  <Overview />
                  <SmartTip>{smartTips.hotel}</SmartTip>
                </div>
              </section>

              <HotelSection id="rooms" title="Номера и цены">
                <div className="flex flex-col gap-4">
                  <SmartTip>{smartTips.booking}</SmartTip>
                  <RoomsSection
                    search={search}
                    slug={hotel.slug}
                    soldOut={hotel.offer == null}
                    soldOutNote={hotel.soldOutNote}
                  />
                </div>
              </HotelSection>

              <HotelSection id="amenities" title="Удобства и услуги">
                <Amenities />
              </HotelSection>

              <HotelSection id="location" title="Расположение и что рядом">
                <Location hotel={hotel} />
              </HotelSection>

              <HotelSection id="reviews" title="Отзывы гостей">
                <Reviews hotel={hotel} />
              </HotelSection>

              <HotelSection id="policies" title="Правила отеля">
                <Policies />
              </HotelSection>

              <HotelSection id="faq" title="Частые вопросы об отеле">
                <Faq />
              </HotelSection>
            </div>

            <BookingAside search={search} soldOut={hotel.offer == null} />
          </div>

          <section id="similar" aria-labelledby="similar-title" className="scroll-mt-32 border-t border-border pt-8">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <h2 id="similar-title" className="font-heading text-xl leading-tight font-bold sm:text-2xl">
                Похожие отели в этом районе
              </h2>
              <Link
                href={searchHref(search)}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Все отели в {hotel.city}
              </Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <li key={item.slug}>
                  <HotelTile hotel={item} search={search} nights={nights} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
