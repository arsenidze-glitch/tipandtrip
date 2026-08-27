import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tipandtrip.com'),
  title: {
    default: 'Tip&Trip — отели по всему миру. Smart tips. Better trips.',
    template: '%s | Tip&Trip',
  },
  description:
    'Tip&Trip помогает найти подходящий отель: понятные условия бронирования, честные цены со всеми сборами, точные сроки бесплатной отмены и поддержка на каждом этапе.',
  applicationName: 'Tip&Trip',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Tip&Trip',
    title: 'Tip&Trip — отели по всему миру',
    description: 'Сравнивайте варианты, изучайте важные детали и бронируйте без лишней сложности.',
    images: ['/home/hero-phuket.png'],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`bg-background ${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
