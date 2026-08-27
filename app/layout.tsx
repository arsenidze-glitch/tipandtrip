import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title:
    'Villa Lagoon Deluxe Resort & Spa 5* — Гёйнюк, Кемер: цены 2026, фото, отзывы | tipandtrip.com',
  description:
    'Villa Lagoon Deluxe Resort & Spa 5* в Гёйнюке (Кемер, Турция): собственный пляж в 120 м, ultra all inclusive, аквапарк, спа-центр 2 400 м². 1 847 отзывов, оценка 9,2. Бронирование без предоплаты и с бесплатной отменой на tipandtrip.com.',
  keywords: [
    'Villa Lagoon Deluxe Resort',
    'отели Кемера 5 звёзд',
    'Гёйнюк отели',
    'ultra all inclusive Турция',
    'отель с аквапарком Кемер',
  ],
  alternates: {
    canonical: 'https://tipandtrip.com/hotels/turkey/kemer/villa-lagoon-deluxe-resort-spa',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'tipandtrip.com',
    title: 'Villa Lagoon Deluxe Resort & Spa 5* — Гёйнюк, Кемер',
    description:
      'Собственный пляж, ultra all inclusive, аквапарк и спа. Оценка 9,2 на основе 1 847 отзывов гостей.',
    images: ['/hotel/exterior.png'],
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#14181f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`bg-background ${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
