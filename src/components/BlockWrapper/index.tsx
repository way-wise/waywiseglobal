'use client'
import React from 'react'

import { Page } from '@/payload-types'

import classes from './index.module.scss'

export type Settings = Extract<
  Page['layout'][0],
  { blockType: 'cardGrid' }
>['cardGridFields']['settings']

export type PaddingProps = {
  top?: 'large' | 'small' | 'hero'
  bottom?: 'large' | 'small'
}

type Props = {
  settings: Settings
  className?: string
  children: React.ReactNode
  padding?: PaddingProps
  hideBackground?: boolean
  /**
   * Controls whether or not to set the padding or just provide the css variables
   *
   * Useful for complex components that need to set padding on a child element
   */
  setPadding?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const BlockWrapper: React.FC<Props> = ({
  settings,
  className,
  children,
  padding,
  setPadding = true,
  hideBackground,
  ...rest
}) => {
  return (
      <div
        className={[
          classes.blockWrapper,
          padding?.top && classes[`padding-top-${padding?.top}`],
          padding?.bottom && classes[`padding-bottom-${padding?.bottom}`],
          setPadding && classes.setPadding,
          hideBackground && classes.hideBackground,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </div>
  )
}
