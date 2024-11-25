import React from 'react'

import type { SpacerBlock as SpacerBlockProps } from '@/payload-types'

type Props = SpacerBlockProps & {
  space?: number | null
}

export const SpacerBlock: React.FC<Props> = (props) => {
  const { space } = props

  const style = {
    height: space ? `${space}px` : '50px',
    width: '100%',
  }

  return (
    <>
      <div style={style}></div>
    </>
  )
}
