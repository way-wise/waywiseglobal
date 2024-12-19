import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="-mt-[8.4em]">
      <div className='relative h-full'>
        <div className="container mb-8">
          {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="min-h-[100px]">
          {media && typeof media === 'object' && (
            <div>
              <Media fill imgClassName="object-cover" resource={media} loading="lazy" />
              {media?.caption && (
                <div className="mt-3">
                  <RichText content={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
