'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CTATheme03: React.FC<
    Props & {
        id?: string
    }
> = ({ links, richText, backgroundImage, backgroundColor }) => {
    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="flex flex-col overflow-hidden rounded-lg bg-gray-200 sm:flex-row md:h-80">
                    {/* image - start */}
                    <div className="order-first h-48 w-full bg-gray-300 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                        {backgroundImage && (
                            <Media resource={backgroundImage} imgClassName="h-full w-full object-cover object-center" />
                        )}
                    </div>
                    {/* image - end */}

                    {/* content - start */}
                    <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                        {richText && <RichText className="cta-theme3" content={richText} enableGutter={false} />}

                        <div className="mt-auto">
                            {(links || []).map(({ link }, i) => {
                                return <CMSLink key={i} size="lg" {...link} />
                            })}
                        </div>
                    </div>
                    {/* content - end */}
                </div>
            </div>
        </div>
    )
}
