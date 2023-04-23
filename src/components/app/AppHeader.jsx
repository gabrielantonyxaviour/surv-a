import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  faTachometerAlt,
  faHome,
  faEye,
  faFileAlt,
  faUser,
  faClipboardCheck,
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Logo } from '../Logo'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

// landing - /
// login - /login
// register - /register
// dashboard - /dashboard
// admin view surveys - /admin
// create survey - /admin/create
// view analytics - /admin/{id}
// fillled survey - /survey
// view survey - /survey/{id}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: faHome },
  { name: 'View Survey', href: '/admin', icon: faEye },
  { name: 'Create Survey', href: '/admin/create', icon: faFileAlt },
  { name: 'Filled Survey', href: '/survey', icon: faClipboardCheck },
  { name: 'Your Profile', href: '/profile', icon: faUser },
  // { name: 'Company', href: '#' },
]

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const supabase = useSupabaseClient()

  const handleClick = async (e) => {
    e.preventDefault()
    await supabase.auth.signOut()
    router.push('/')
  }
  const toggleNav = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <header className="bg-white">
      <nav
        className={`relative my-4 ml-4 inline-block flex-col items-center justify-between rounded-xl bg-indigo-500 text-white drop-shadow-lg transition duration-150 ease-in-out ${
          isExpanded ? `w-[160px] ` : `w-[60px]`
        }`}
        style={{ height: `calc(100vh - 40px)` }}
      >
        <div className=" mb-12 mt-4">
          <a href="/">
            <img
              src="/logo.jpg"
              alt="My App Logo"
              className={`mx-auto h-12 rounded-full`}
            />
          </a>
        </div>
        <div className="absolute right-0 top-16 -mr-3 drop-shadow-lg">
          <button onClick={toggleNav} className="">
            <FontAwesomeIcon
              icon={isExpanded ? faChevronCircleLeft : faChevronCircleRight}
              className="h-6 w-6 text-white transition  duration-150 ease-in-out hover:text-indigo-100"
            />
          </button>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col gap-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 text-white  ${
                  !isExpanded ? 'mx-auto' : 'ml-3'
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size="xl"
                  className="mx-auto"
                />
                &nbsp;&nbsp;&nbsp;
                {isExpanded && item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <button href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={(e) => handleClick(e)}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log Out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav> */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </button>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={(e) => handleClick(e)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
