import React, { HTMLAttributes } from 'react'
import { motion, MotionProps, transform, useScroll } from 'framer-motion'

import { Media as MediaType } from '@/payload-types'

import classes from './index.module.scss'
import { Props as MediaProps } from '../Media/types'
import { Media } from '../Media'

type ParallaxProps = {
  media: { image: string | MediaType }[]
  className?: string
} & {
  priority?: MediaProps['priority']
}

const MediaParallax: React.FC<ParallaxProps> = ({ media, className, ...mediaProps }) => {
  const containerRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [scrollValue, setScrollValue] = React.useState(0)
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['end start', 'start end'],
  })

  React.useEffect(() => {
    setScrollValue(scrollYProgress.get())

    scrollYProgress.on('change', () => {
      setScrollValue(scrollYProgress.get())
    })

    return () => {
      scrollYProgress.clearListeners()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className={[classes.parallaxMedia, className].filter(Boolean).join(' ')}
    >
      {media?.map((image, index) => {
        const MULTIPLIER = Math.min(1 + index / 5, 2)
        const transformer = transform([0, 1], [-50 * MULTIPLIER, 50 * MULTIPLIER])

        return (
          <motion.div
            key={index}
            className={classes.parallaxItem}
            initial={{ ...(index === 0 ? {} : { translateY: -50 * MULTIPLIER }) }}
            style={{
              ...(index === 0
                ? {}
                : {
                    translateY: transformer(scrollValue),
                  }),
            }}
          >
            {typeof image.image !== 'string' && (
              <>
                <Media resource={image.image} {...mediaProps} />
              </>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default MediaParallax
