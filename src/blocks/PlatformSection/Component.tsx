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
          <div className={`grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:${columnClass}`}>
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`relative w-full aspect-[4/3] group rounded-3xl cursor-pointer bg-gray-200 overflow-hidden shadow-xl transition duration-200`}
              >
                {platform?.contentImage && typeof platform?.contentImage === 'object' && (
                  <Media
                    fill
                    resource={platform?.contentImage}
                    imgClassName="absolute w-full h-full inset-0 object-cover"
                  />
                )}
                <div className="absolute inset-0 w-full h-full rounded-3xl bg-black bg-opacity-0 transition duration-500 backdrop-filter group-hover:bg-opacity-20 group-hover:backdrop-blur"></div>
                <div className="absolute text-white flex flex-col justify-end items-start h-full px-5 py-8">
                  {platform?.title && (
                    <h2 className="text-4xl font-semibold mb-2">{platform?.title}</h2>
                  )}
                  {platform?.richText && (
                    <div className="hidden group-hover:block">
                      <RichText
                        className="text-white"
                        content={platform?.richText}
                        enableGutter={false}
                      />
                    </div>
                  )}
                  {platform?.enableLink && platform?.link && (
                    <div className="w-full mt-4 md:mt-8 hidden transition duration-200 group-hover:block">
                      <CMSLink className="rounded-lg bg-white py-3 px-5 w-full text-gray-600" {...platform?.link} />
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
