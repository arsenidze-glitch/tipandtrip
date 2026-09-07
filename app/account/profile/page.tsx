import type { Metadata } from 'next'

import { ProfileForm } from '@/components/account/profile-form'
import { accountUser } from '@/lib/data/account'
import { formatLongDate } from '@/lib/search'

export const metadata: Metadata = {
  title: 'Личные данные',
}

export default function AccountProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-heading text-2xl leading-tight font-bold sm:text-3xl">Личные данные</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Эти данные подставляются в форму бронирования. Аккаунт создан {formatLongDate(accountUser.memberSince)}.
        </p>
      </header>

      <ProfileForm user={accountUser} />
    </div>
  )
}
