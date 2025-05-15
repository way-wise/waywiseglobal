import React from 'react'
import RichText from '@/components/RichText'

import type { PlatformSection as PlatformSectionProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export type Props = PlatformSectionProps & {
  hideBackground?: boolean
}
export const PlatformSection: React.FC<Props> = (props) => {
  const { platforms, column, fixedBackground, intro, backgroundImage } = props
  const background =
    backgroundImage && typeof backgroundImage === 'object' ? backgroundImage.url : ''
  const isFixed = fixedBackground ? 'fixed' : 'scroll'
  const columnClass = column ? 'grid-cols-' + column : 'grid-cols-4'
  return (
    <div
      style={{ backgroundImage: `url('${background}')`, backgroundAttachment: isFixed }}
      className="bg-no-repeat bg-cover bg-center py-12 md:py-20 lg:py-32"
    >
      {intro && (
        <div className="container w-auto md:max-w-3xl mx-5 mb-12 md:mx-auto bg-gray-700/60 backdrop-blur rounded-2xl">
          <div className="p-8 md:p-6">
            <RichText className="text-white" content={intro} enableGutter={false} />
          </div>
        </div>
      )}
      {platforms && platforms.length > 0 && (
        <div className="md:px-8 m-auto">
          <div className={`grid grid-rows-8 xl:grid-rows-6 grid-flow-col grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 xl:grid-cols-3`}>
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`relative w-full aspect-[4/3] group rounded-xl cursor-pointer bg-gray-200 overflow-hidden shadow-xl transition duration-200
                  ${[2, 3, 4].includes(index) ?
                  'row-span-1 lg:row-span-2 xl:row-span-2 aspect-[4/3] xl:aspect-[4.16/2]'
                  : 'row-span-1 lg:row-span-2 xl:row-span-3 aspect-[4/3]'}
                  `}
              >
                {platform?.contentImage && typeof platform?.contentImage === 'object' && (
                  <Media
                    fill
                    resource={platform?.contentImage}
                    imgClassName="absolute w-full h-full inset-0 object-cover group-hover:scale-105 transition duration-200"
                  />
                )}
                <div className="absolute inset-0 w-full h-full rounded-xl bg-black bg-opacity-0 transition duration-500 backdrop-filter group-hover:bg-opacity-20"></div>
                <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-t from-gray-900/40 via-transparent to-transparent transition duration-500 block"></div>
                <div className="absolute text-white flex flex-col justify-end items-start h-full px-5 py-8">
                  {platform?.title && (
                    <h2 className="group-hover:-translate-y-2 duration-200 text-4xl font-semibold mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{platform?.title}</h2>
                  )}
                  {platform?.richText && (
                    <div className="group-hover:-translate-y-2 transition duration-200 delay-100">
                      <RichText
                        className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        content={platform?.richText}
                        enableGutter={false}
                      />
                    </div>
                  )}
                  {platform?.enableLink && platform?.link && (
                    <div className="w-full mt-4 md:mt-8 transition duration-200 delay-200 group-hover:-translate-y-2">
                      <CMSLink className="rounded-lg bg-white py-3 px-5 w-full text-gray-800" {...platform?.link} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
