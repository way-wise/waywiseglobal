import Image from 'next/image'
import type { Page } from '@/payload-types'

interface NewHeroProps {
  media?: Page['hero']['media']
}

const NewHero = ({ media }: NewHeroProps = {}) => {
  return (
    <div
      className="relative -mt-[7em] flex items-center justify-center text-dark"
      data-theme="dark"
    >
      <div className="container my-8 pt-20 z-10 relative flex flex-col lg:flex-row xl:flex-col items-center gap-5">
        {/* Header - Hidden on XL screens */}
        <div className="flex xl:hidden max-w-[36.5rem] text-center flex-grow w-full">
          <div className="max-w-none mx-auto prose dark:prose-invert mb-6">
            <div className="text-[52px] font-bold text-center text-[#a5a5fd]">
              OUR WAYS TO REACH YOUR DESTINATION WISELY
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          {/* First Row - Only WayWise Tech */}
          <div className="w-full xl:w-[85%] flex flex-col md:flex-row justify-center items-center gap-5">
            {/* WayWise Tech - Middle Elevated */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 justify-center items-center h-auto aspect-[4/3] w-full xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60 translate-y-0 xl:-translate-y-8"
              href="https://www.waywisetech.com/"
            >
              <div>
                <Image
                  alt="wwt_logo"
                  width={300}
                  height={209}
                  src="/api/media/file/wwt_logo_v2.png"
                  className="object-contain w-36 group-hover:scale-110 transition"
                />
              </div>
              <div className="max-w-none mx-auto prose dark:prose-invert text-center text-xs xl:text-xl font-semibold leading-tight text-black">
                <p className="col-start-2">Complete IT & Software Solutions</p>
              </div>
            </a>
          </div>

          {/* Second Row */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
            {/* WayWise Builders */}
            <div className="flex w-full xl:w-auto">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 justify-center items-center h-auto aspect-[4/3] w-full xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60"
                href="https://www.waywisebuilders.com/"
              >
                <div>
                  <Image
                    alt="wwc-logo"
                    width={512}
                    height={110}
                    src="/api/media/file/WWC-logo.png"
                    className="object-contain w-48 group-hover:scale-110 transition"
                  />
                </div>
                <div className="max-w-none mx-auto prose dark:prose-invert text-center text-xs xl:text-xl font-semibold leading-tight text-black">
                  <p className="col-start-2">Your Household & Residential Solutions</p>
                </div>
              </a>
            </div>

            {/* Center Text - Visible on XL screens */}
            <div className="hidden xl:block max-w-[36.5rem] text-center">
              <div className="max-w-none mx-auto prose dark:prose-invert">
                <div className="text-[52px] font-bold text-center text-[#a5a5fd] leading-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  OUR WAYS TO REACH YOUR DESTINATION WISELY
                </div>
              </div>
            </div>

            {/* WayWise Jobs */}
            <div className="flex w-full xl:w-auto">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 justify-center items-center h-auto aspect-[4/3] w-full xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60"
                href="https://www.waywisejobs.com/"
              >
                <div>
                  <Image
                    alt="Jobs"
                    width={512}
                    height={411}
                    src="/api/media/file/Jobs.png"
                    className="object-contain w-36 group-hover:scale-110 transition"
                  />
                </div>
                <div className="max-w-none mx-auto prose dark:prose-invert text-center text-xs xl:text-xl font-semibold leading-tight text-black">
                  <p className="col-start-2">Choose your Career</p>
                </div>
              </a>
            </div>
          </div>

          {/* Third Row */}
          <div className="w-full xl:w-[75%] flex flex-col md:flex-row justify-between items-center gap-5">
            {/* Designer's Dream */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 justify-center items-center h-auto aspect-[4/3] w-full xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60"
              href="#"
            >
              <div>
                <Image
                  alt="Designer's Dream"
                  width={512}
                  height={512}
                  src="/api/media/file/Designer's-Dream-Final.png"
                  className="object-contain w-36 group-hover:scale-110 transition"
                />
              </div>
              <div className="max-w-none mx-auto prose dark:prose-invert text-center text-xs xl:text-xl font-semibold leading-tight text-black">
                <p className="col-start-2">Your design Dream with Designer&apos;s dream</p>
              </div>
            </a>

            {/* Sport Clips */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 justify-center items-center h-auto aspect-[4/3] w-full xl:h-52 xl:w-72 bg-slate-100/50 p-5 rounded-xl backdrop-blur group hover:bg-slate-50/60"
              href="https://sportclips.com/"
            >
              <div>
                <Image
                  alt="sportclips"
                  width={720}
                  height={216}
                  src="/api/media/file/sportclips.png"
                  className="object-contain w-36 group-hover:scale-110 transition"
                />
              </div>
              <div className="max-w-none mx-auto prose dark:prose-invert text-center text-xs xl:text-xl font-semibold leading-tight text-black">
                <p className="col-start-2">Change Your Look</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="min-h-screen select-none">
        {media && typeof media === 'object' && media.url ? (
          <Image
            src={media.url}
            alt={media.alt || 'Background'}
            fill
            className="-z-10 object-cover"
            priority={false}
          />
        ) : (
          <div className="-z-10 absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-700" />
        )}
      </div>
    </div>
  )
}

export default NewHero
