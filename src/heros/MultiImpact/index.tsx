'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Media as MediaType, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'

export const MultiImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  imagesTop,
  imagesMiddle,
  imagesBottom,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[4.2rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex flex-col items-center justify-center gap-10">
        {imagesTop && (
          <div className="w-1/3 flex justify-between items-center">
            {imagesTop.map((imgItem) => (
              <Link
                href={imgItem.url || '/'}
                key={imgItem.id}
                className="h-40 w-40 bg-slate-400/25 p-5 rounded-xl backdrop-blur-sm"
              >
                <Media resource={imgItem?.image as MediaType} />
              </Link>
            ))}
          </div>
        )}
        <div className="w-full flex justify-between items-center">
        {imagesMiddle && (
          <div className="flex">
            {imagesMiddle[0] && (
              <Link href={imagesMiddle[0].url || '/'} key={imagesMiddle[0].id} className="h-40 w-40 bg-slate-400/25 p-5 rounded-xl backdrop-blur-sm">
                <Media resource={imagesMiddle[0]?.image as MediaType}/>
              </Link>
            )}
          </div>
        )}
          <div className="max-w-[36.5rem] text-center">
            {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4">
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
          {imagesMiddle && (
          <div className="flex">
            {imagesMiddle[1] && (
              <Link href={imagesMiddle[1].url || '/'} key={imagesMiddle[1].id} className="h-40 w-40 bg-slate-400/25 p-5 rounded-xl backdrop-blur-sm">
                <Media resource={imagesMiddle[1]?.image as MediaType}/>
              </Link>
            )}
          </div>
        )}
        </div>
        {imagesBottom && (
          <div className="w-1/3 flex justify-between items-center">
            {imagesBottom.map((imgItem) => (
              <Link
                href={imgItem.url || '/'}
                key={imgItem.id}
                className="h-40 w-40 bg-slate-400/25 p-5 rounded-xl backdrop-blur-sm"
              >
                <Media resource={imgItem?.image as MediaType} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="min-h-[90vh] select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            priority={false}
            loading="lazy"
            resource={media}
          />
        )}
      </div>
    </div>
  )
}
