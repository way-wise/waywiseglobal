import React from 'react'

import { BackgroundGrid } from '@/components/BackgroundGrid'
import { BackgroundScanline } from '@/components/BackgroundScanline'
import { Gutter } from '@/components/Gutter'
import { Media } from '@/components/Media'
import MediaParallax from '@/components/MediaParallax'
import RichText from '@/components/RichText'
import { QuoteIconAlt } from '@/icons/QuoteIconAlt'
import { Page } from '@/payload-types'

import classes from './index.module.scss'
import { BlockWrapper } from '@/components/BlockWrapper'
type PaddingProps = {
  top?: 'large' | 'small' | 'hero'
  bottom?: 'large' | 'small'
}

export type CalloutProps = Extract<Page['layout'][0], { blockType: 'callout' }> & {
  padding: PaddingProps
  hideBackground?: boolean
}

export const Callout: React.FC<CalloutProps> = (props) => {
  const {
    calloutFields: { richText, role, author, logo, images, settings },
    padding,
    hideBackground,
  } = props
  const hasImages = images?.length && images.length > 0

  return (
    <BlockWrapper settings={settings} padding={padding} hideBackground={hideBackground}>
      <BackgroundGrid className={classes.backgroundGrid} zIndex={0} />
      <div className={classes.wrapper}>
        <Gutter>
          <div className={[classes.container, 'grid'].filter(Boolean).join(' ')}>
            <BackgroundScanline className={classes.scanline} enableBorders crosshairs={'all'} />
            <div
              className={[
                classes.contentWrapper,
                hasImages
                  ? 'cols-7 start-2 cols-m-8 start-m-1'
                  : 'cols-14 start-2 cols-m-8 start-m-1',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <QuoteIconAlt className={classes.quoteIcon} />
              <RichText
                content={richText}
                className={[classes.content].filter(Boolean).join(' ')}
              />
              <div className={[classes.authorWrapper, 'cols-12'].filter(Boolean).join(' ')}>
                <div className={classes.logo}>
                  {logo && typeof logo !== 'string' && <Media resource={logo} />}
                </div>
                <div className={classes.author}>
                  <span className={classes.name}>{author}</span>
                  {role ? <span className={classes.role}>{', ' + role}</span> : ''}
                </div>
              </div>
            </div>

            <div
              className={[classes.media, 'cols-6 start-11 cols-m-8 start-m-1']
                .filter(Boolean)
                .join(' ')}
            >
              {hasImages ? <MediaParallax media={images} /> : null}
            </div>
          </div>
        </Gutter>
      </div>
    </BlockWrapper>
  )
}
