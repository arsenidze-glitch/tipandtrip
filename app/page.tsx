import { HomeCollections } from '@/components/home/collections'
import { HomeDestinations } from '@/components/home/destinations'
import { HomeEditorial } from '@/components/home/editorial'
import { HomeHero } from '@/components/home/hero'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
        <HomeDestinations />
        <HomeCollections />
        <HomeEditorial />
      </main>
      <SiteFooter />
    </>
  )
}
