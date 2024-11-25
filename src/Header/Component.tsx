
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import HeaderClient from './Component.client'

export async function Header() {
  { /* @ts-expect-error */ }
  const header: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient header={header} />
}
