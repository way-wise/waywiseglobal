import React from 'react'
import RichText from '@/components/RichText'

import type { ServiceSection as ServiceSectionProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export type Props = ServiceSectionProps & {
  hideBackground?: boolean
}
export const ServiceSection: React.FC<Props> = (props) => {
  const { services, column, fixedBackground, intro, backgroundImage } = props
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
      {services && services.length > 0 && (
        <div className="container md:px-8 m-auto">
          <div className={`grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:${columnClass}`}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`h-full flex bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden group hover:bg-gray-800/90 transition duration-500 ease-in-out
                ${service?.alignment === 'mediaContent' ? 'flex-col' : 'flex-col-reverse'}
                ${(index + 1) % 2 == 0 ? 'items-end' : 'items-start'}
                `}
              >
                <div className={`${column > 2 ? 'h-64' : 'h-[350px]'} w-full relative`}>
                  {service?.contentImage && typeof service?.contentImage === 'object' && (
                    <React.Fragment>
                      <Media
                        fill
                        priority
                        resource={service?.contentImage}
                        imgClassName="object-cover"
                      />
                    </React.Fragment>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-primary bg-fixed opacity-0 transition duration-300 ease-in-out group-hover:opacity-40"></div>
                </div>
                <div className="flex p-4 md:p-6">
                  {service?.richText && (
                    <RichText
                      className="text-white"
                      content={service?.richText}
                      enableGutter={false}
                    />
                  )}
                  {service?.enableLink && service?.link && (
                    <div className="w-full mt-4 block md:mt-8">
                      <CMSLink className="rounded-lg" {...service?.link} />
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
