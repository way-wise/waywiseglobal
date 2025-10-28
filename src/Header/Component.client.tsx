'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { useAuth } from '@/providers/Auth'

interface HeaderClientProps {
  header: Header
}

const threshold = 1000

const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const { user, logout } = useAuth()
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen)
  }

  // Sticky Navbar
  const [sticky, setSticky] = useState(false)
  const handleStickyNavbar = () => {
    if (window.scrollY >= 120) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }
  useEffect(() => {
    if (header?.scrollSticky) {
      window.addEventListener('scroll', handleStickyNavbar)
    }
  }, [header?.scrollSticky])

  useEffect(() => {
    if (header?.fixedTop) {
      setSticky(true)
    }
  }, [header?.fixedTop])

  // Close userMenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1)
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }

  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = header?.navItems || []

  const doLogout = async () => {
    try {
      const start = Date.now()

      await logout()

      const end = Date.now()
      const time = end - start
      const delay = threshold - time
      if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay))
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
    }
  }

  return (
    <header
      className={`header left-0 top-0 z-40 w-full backdrop-blur-lg ${header?.sticky || header?.fixedTop ? ' sticky' : ''}
        transition ${sticky ? 'bg-white shadow-sm' : 'bg-gray-300/60'}`}
    >
      {header?.callback && (
        <div className="block xl:hidden bg-black/90 backdrop-blur py-1.5">
          <div className="container">
            <div className="flex justify-between gap-4">
              {header?.callback.split(',').map((substring, idx) => {
                return (
                  <div key={idx}>
                    <a
                      href={`tel:${substring}`}
                      className={`text-sm sm:text-base inline-flex items-center gap-2 font-medium text-white`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-telephone-fill size-4"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                        />
                      </svg>
                      {substring}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      <div className="py-5">
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-44 sm:w-60 md:w-80 lg:96 max-w-full px-4 xl:mr-12">
              <Link href="/" className="header-logo">
                {header?.scrollSticky ? (
                  <>
                    {sticky ? (
                      <>
                        {header?.logo && (
                          <Media
                            resource={header?.logo}
                            className="w-44 sm:w-52 md:w-56 lg:max-w-60 h-auto dark:brightness-200"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {header?.logo_dark && (
                          <Media
                            resource={header?.logo_dark}
                            className="w-44 sm:w-52 md:w-56 lg:max-w-60 h-auto dark:brightness-200"
                          />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {header?.logo && (
                      <Media
                        resource={header?.logo}
                        className="w-44 sm:w-52 md:w-56 lg:max-w-60 h-auto dark:brightness-200"
                      />
                    )}
                  </>
                )}
              </Link>
            </div>
            <div className="flex w-full items-center justify-end px-4 gap-6">
              {/* desktop navbar */}
              <nav className="hidden lg:block">
                <ul className="flex space-x-8">
                  {navItems.map((menuItem, index) => (
                    <li key={index} className={`group relative ${sticky ? 'text-dark' : 'text-white'}`}>
                      {menuItem.subNavItems && menuItem.subNavItems.length === 0 ? (
                        <>
                          <CMSLink
                            {...menuItem?.link}
                            appearance="link"
                            className={`font-medium block py-2 text-base lg:mr-0 lg:px-0 lg:py-6 no-underline ${sticky ? 'text-dark' : 'text-white'} hover:text-primary`}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            onClick={() => handleSubmenu(index)}
                            className={`font-medium flex cursor-pointer items-center justify-between py-2 text-base group-hover:text-primary dark:group-hover:text-white lg:mr-0 lg:px-0 lg:py-6 ${
                              sticky ? 'text-dark' : 'text-white'
                            }`}
                          >
                            {menuItem?.link?.label}
                            <span className="pl-1">
                              <svg width="25" height="24" viewBox="0 0 25 24">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </div>
                          <div
                            className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[280px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? 'block' : 'hidden'}`}
                          >
                            {menuItem.subNavItems &&
                              menuItem.subNavItems.map((submenuItem, subIndex) => (
                                <CMSLink
                                  key={subIndex}
                                  {...submenuItem?.link}
                                  appearance="link"
                                  className="block rounded py-2.5 text-base text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                  // onClick={() => {
                                  //   setOpenIndex(-1); // Close submenu
                                  //   setNavbarOpen(false); // Close mobile menu if open
                                  // }}
                                />
                              ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* <div className="flex items-center justify-end">
                {user && user?.id ? (
                  <div className="relative group" ref={userMenuRef}>
                    <div
                      onClick={() => setUserMenu(!userMenu)}
                      className="font-medium flex cursor-pointer items-center justify-between text-base group-hover:text-primary dark:group-hover:text-white"
                    >
                      <span
                        className={`py-3 text-base font-medium hover:opacity-70 block ${
                          sticky ? 'text-dark' : 'text-white'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                          />
                        </svg>
                      </span>
                    </div>
                    <div
                      onClick={() => setUserMenu(!userMenu)}
                      className={`absolute border border-gray-100 py-2 top-full right-0 bg-white rounded-lg shadow-lg min-w-max transition-all duration-300 ease-in-out ${userMenu ? 'visible opacity-100' : 'invisible opacity-0'}`}
                    >
                      <Link
                        className="hover:bg-gray-100 flex gap-3 items-center rounded py-2.5 text-base text-dark hover:text-primary dark:text-white/70 dark:hover:text-white px-3"
                        href={'/user-dashboard/profile'}
                      >
                        <span className="text-base font-medium text-dark hover:opacity-70 dark:text-white block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-person-circle fill-gray-600 dark:fill-gray-300"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                          </svg>
                        </span>
                        <span>My Profile</span>
                      </Link>
                      <span
                        className="hover:bg-gray-100 flex gap-2 items-center cursor-pointer rounded py-2.5 text-base text-danger hover:text-primary dark:text-white/70 dark:hover:text-white px-3"
                        onClick={() => doLogout()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                          />
                        </svg>
                        <span>Logout</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/signin"
                    className={`py-3 text-base font-medium hover:opacity-70 md:block ${
                      sticky ? 'text-dark' : 'text-white'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                  </Link>
                )}
              </div> */}
              {header?.callback && (
                <div className="bg-primary py-2 pl-3 pr-4 hidden xl:flex items-center justify-center gap-3 rounded-xl">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      fill="#ffffff"
                      className="bi bi-telephone-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                      />
                    </svg>
                  </div>
                  <div>
                    {header?.callback.split(',').map((substring, idx) => {
                      return (
                        <div key={idx}>
                          <a
                            href={`tel:${substring}`}
                            className="text-lg block font-semibold text-white"
                          >
                            {substring}
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              <button onClick={navbarToggleHandler} className="xl:hidden">
                <span
                  className={`my-1.5 block h-0.5 w-[30px] ${sticky ? 'bg-black' : 'bg-white'}`}
                />
                <span
                  className={`my-1.5 block h-0.5 w-[30px]  ${sticky ? 'bg-black' : 'bg-white'}`}
                />
                <span
                  className={`my-1.5 block h-0.5 w-[30px]  ${sticky ? 'bg-black' : 'bg-white'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navbar */}
      <div
        className={`block xl:hidden absolute top-0 end-0 w-full max-w-[320px] h-screen bg-black/50 backdrop-blur z-50 px-4 py-10 text-white transition-all duration-500 transform ${navbarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-5 rounded-lg bg-white/50 mb-8">
          <Link href="/" className={`header-logo block w-full max-w-[150px] py-6 lg:py-3`}>
            {header?.logo && (
              <Media
                resource={header?.logo}
                className="w-44 sm:w-52 md:w-56 lg:max-w-60 h-auto dark:brightness-200"
              />
            )}
          </Link>
          <button onClick={navbarToggleHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-x-circle-fill size-6"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="flex flex-col gap-2">
            {navItems.map((menuItem, index) => (
              <li key={index} className="group relative">
                {menuItem.subNavItems && menuItem.subNavItems.length === 0 ? (
                  <>
                    <CMSLink
                      {...menuItem?.link}
                      appearance="link"
                      className={`font-medium block px-3 py-2 text-base no-underline ${
                        pathname === menuItem?.link?.url ? 'text-primary' : 'text-white/90'
                      }`}
                    />
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => handleSubmenu(index)}
                      className="font-medium flex cursor-pointer items-center justify-between py-2 px-3 text-base text-white group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:px-0 lg:py-6"
                    >
                      {menuItem?.link?.label}
                      <span className="pl-1">
                        <svg width="25" height="24" viewBox="0 0 25 24">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </div>
                    <div
                      className={`submenu relative start-5 top-full rounded-sm bg-transparent transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark ${
                        openIndex === index ? 'block' : 'hidden'
                      }`}
                    >
                      {menuItem.subNavItems &&
                        menuItem.subNavItems.map((submenuItem, subIndex) => (
                          <CMSLink
                            key={subIndex}
                            {...submenuItem?.link}
                            appearance="link"
                            className="block rounded py-2 px-3 text-base text-white hover:text-primary dark:text-white/70 dark:hover:text-white"
                          />
                        ))}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {navbarOpen && (
        <div
          className="fixed top-0 start-0 bg-black/50 h-screen w-full z-40"
          onClick={() => setNavbarOpen(false)}
        ></div>
      )}
    </header>
  )
}

export default HeaderClient
