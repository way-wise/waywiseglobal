import React from 'react'


import { RenderBlocks } from '../RenderBlocks'
import { Page } from '@/payload-types'

export type Props = Extract<Page['layout'][0], { blockType: 'reusableContentBlock' }>

export const ReusableContentBlock: React.FC<Props> = ({ reusableContentBlockFields }) => {
  const { reusableContent, customId } = reusableContentBlockFields

  if (typeof reusableContent === 'object' && reusableContent !== null) {
    return <RenderBlocks blocks={reusableContent.layout} customId={customId} />
  }

  return null
}
