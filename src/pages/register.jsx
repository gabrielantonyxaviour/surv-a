import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import backgroundImage from '../images/background-auth.jpg'
import { useRef, useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'

import {
  useSupabaseClient,
  useUser,
  useSession,
} from '@supabase/auth-helpers-react'
import Loading from '@/components/Loading'

export default function Register() {
  const router = useRouter()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()
  const user = useUser()
  const session = useSession()

  useEffect(() => {
    privateRoute()
  }, [session])

  const privateRoute = async () => {
    try {
      // console.log(session)
      if (session) {
        router.push('/dashboard')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
    router.push('/login')
  }

  if (loading) return <Loading />

  return (
    <>
      <Head>
        <title>Sign Up - SURV-A</title>
      </Head>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div>
              <div className="flex flex-col">
                <div className="mt-20">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Get started for free
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Already registered?{' '}
                    <Link
                      href="/login"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Sign in
                    </Link>{' '}
                    to your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        ref={emailRef}
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        ref={passwordRef}
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      // type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleSubmit}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={backgroundImage}
            alt=""
            unoptimized
          />
        </div>
      </div>
    </>
  )
}
