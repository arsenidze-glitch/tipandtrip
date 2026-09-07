import { Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

import { AccountNav, AccountTabs } from '@/components/account/account-nav'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { accountUser } from '@/lib/data/account'

export const metadata: Metadata = {
  title: 'Личный кабинет',
  robots: { index: false, follow: false },
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const initials = `${accountUser.firstName[0]}${accountUser.lastName[0]}`

  return (
    <>
      <SiteHeader user={{ name: accountUser.firstName, initials }} />

      <main className="mx-auto w-full max-w-[1240px] px-4 pb-16 lg:px-6">
        <div className="grid gap-6 py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 lg:py-8">
          <aside className="hidden lg:block">
            <div className="sticky top-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground"
                >
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {accountUser.firstName} {accountUser.lastName}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-brand">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    {accountUser.tier}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-2">
                <AccountNav />
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <AccountTabs />
            <div className="mt-6 lg:mt-0">{children}</div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
