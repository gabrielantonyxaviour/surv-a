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
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Logo } from '../Logo'
import { supabase } from '@/helpers/supabase'

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
  // { name: 'Filled Survey', href: '/survey', icon: faClipboardCheck },
  // { name: 'Company', href: '#' },
]

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault()
    await supabase.auth.signOut()
    await router.push('/')
  }

  return (
    <header className="bg-white ">
      <nav
        className={`relative my-4 ml-4 inline-block h-full w-[200px] flex-col items-center justify-between rounded-xl bg-indigo-500 text-white drop-shadow-lg transition duration-150 ease-in-out `}
      >
        <div className=" mb-8 mt-4">
          <a href="/">
            <div className="flex">
              <img
                src="/openai.svg"
                alt="My App Logo"
                className={` mx-4 h-12 rounded-full`}
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
              <p className="my-auto text-xl font-bold text-white">SURV-A</p>
            </div>
          </a>
        </div>
        <img
          src="https://picsum.photos/80"
          alt="pfp"
          className="mx-auto my-2 rounded-full"
        />
        <h1 className="text-center text-lg font-bold">{'Gabriel Antony'}</h1>
        <h3 className="mb-12 text-center text-xs font-semibold">
          {'gabrielantony56@gmail.com'}
        </h3>
        <div className="flex flex-col justify-between">
          <div className="flex-grow">
            <div className="flex flex-col gap-8">
              {navigation.map((item) => (
                <div className="mx-auto">
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-white' } text-sm font-semibold
                leading-6`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      size="xl"
                      className="mx-auto"
                    />
                    &nbsp;&nbsp;&nbsp;
                    {item.name}
                  </a>
                </div>
              ))}
              <button
                onClick={(e) => {
                  handleClick(e)
                }}
                className={`text-sm font-semibold leading-6
                text-white`}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  size="xl"
                  className="mx-auto"
                />
                &nbsp;&nbsp;&nbsp;
                {'Log-out'}
              </button>
            </div>
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
