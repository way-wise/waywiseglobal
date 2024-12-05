import React from 'react'


import { Page } from '@/payload-types.js'
import { RenderBlocks } from '../RenderBlocks'

import type { ReusableContentBlock as ReusableContentBlockProps } from '@/payload-types'

export const ReusableContentBlock: React.FC<ReusableContentBlockProps> = ({ reusableContentBlockFields }) => {
  const { reusableContent, customId } = reusableContentBlockFields

  if (typeof reusableContent === 'object' && reusableContent !== null) {
    return <RenderBlocks blocks={reusableContent.layout} customId={customId} />
  }

  return null
}
