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
    <div className="relative -mt-[7em] flex items-center justify-center text-dark" data-theme="dark">
      <div className="container my-8 pt-20 z-10 relative flex flex-col lg:flex-row xl:flex-col items-center gap-5">
        <div className="flex xl:hidden max-w-[36.5rem] text-center flex-grow w-full">
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
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          {imagesTop && (
            <div className="w-full xl:w-[85%] flex justify-between items-center gap-5">
              {imagesTop.map((imgItem, index) => (
                <Link
                  href={imgItem.url || '/'}
                  key={imgItem.id}
                  target="_blank"
                  className={`flex flex-col gap-2 justify-center items-center h-40 w-52 xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60
                    ${imagesTop.length === 3 && index === 1 ? 'translate-y-0 xl:-translate-y-8' : ''}
                    `}
                >
                  <Media
                    resource={imgItem?.image as MediaType}
                    imgClassName="object-contain w-36 group-hover:scale-110 transition"
                  />
                  {imgItem?.image && typeof imgItem?.image === 'object' && (
                    <RichText
                      className="text-center text-base lg:text-xl font-semibold leading-tight text-black"
                      content={imgItem?.image?.caption || {}}
                      enableGutter={false}
                    />
                  )}
                </Link>
              ))}
            </div>
          )}
          <div className="w-full flex justify-between items-center gap-5">
            {imagesMiddle && (
              <div className="flex">
                {imagesMiddle[0] && (
                  <Link
                    href={imagesMiddle[0].url || '/'}
                    target="_blank"
                    className="flex flex-col gap-2 justify-center items-center h-40 w-52 xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60"
                  >
                    <Media
                      resource={imagesMiddle[0]?.image as MediaType}
                      imgClassName="object-contain w-36 group-hover:scale-110 transition"
                    />
                    {imagesMiddle[0]?.image && typeof imagesMiddle[0]?.image === 'object' && (
                      <RichText
                        className="text-center text-xl font-semibold leading-tight text-black"
                        content={imagesMiddle[0]?.image?.caption || {}}
                        enableGutter={false}
                      />
                    )}
                  </Link>
                )}
              </div>
            )}
            <div className="hidden xl:block max-w-[36.5rem] text-center">
              {richText && <RichText className="leading-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" content={richText} enableGutter={false} />}
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
                  <Link
                    href={imagesMiddle[1].url || '/'}
                    key={imagesMiddle[1].id}
                    target="_blank"
                    className="flex flex-col gap-4 justify-center items-center h-40 w-52 xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60"
                  >
                    <Media
                      resource={imagesMiddle[1]?.image as MediaType}
                      imgClassName="object-contain w-48 group-hover:scale-110 transition"
                    />
                    {imagesMiddle[1]?.image && typeof imagesMiddle[1]?.image === 'object' && (
                      <RichText
                        className="text-center text-xl font-semibold leading-tight text-black"
                        content={imagesMiddle[1]?.image?.caption || {}}
                        enableGutter={false}
                      />
                    )}
                  </Link>
                )}
              </div>
            )}
          </div>
          {imagesBottom && (
            <div className="w-full xl:w-[75%] flex justify-between items-center gap-5">
              {imagesBottom.map((imgItem, index) => (
                <Link
                  href={imgItem.url || '/'}
                  key={imgItem.id}
                  target="_blank"
                  className={`flex flex-col gap-2 justify-center items-center h-40 w-52 xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60
                    ${imagesBottom.length === 3 && index === 1 ? 'translate-y-0 xl:translate-y-8' : ''}
                    `}
                >
                  <Media
                    resource={imgItem?.image as MediaType}
                    imgClassName="object-contain w-36 group-hover:scale-110 transition"
                  />
                  {imgItem?.image && typeof imgItem?.image === 'object' && (
                    <RichText
                      className="text-center text-xl font-semibold leading-tight text-black"
                      content={imgItem?.image?.caption || {}}
                      enableGutter={false}
                    />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="min-h-screen select-none">
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
