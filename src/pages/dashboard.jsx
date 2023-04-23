import React, { useEffect, useContext } from 'react'
import Header from '@/components/app/AppHeader'
import Head from 'next/head'

import { useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { NumberElement } from '@/components/NumberElement'
export default function dashboard() {
  const [loading, setLoading] = useState(true)
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    try {
      if (user) {
        router.push('/login')
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }, [user])

  if (loading) return <Loader />

  // Total surveys created - Number
  // Total surveys filled - Number
  // Total responses for surveys - Number
  // Net sentiment for all surveys - Radar custom (positive, negative, more?)
  // Geographical - Map with pie
  // Bar chart for survey and response count
  //

  // On Right
  // Top Calender, Notifications, Messages and PFP
  // Your current Plan - If Basic Get Premium Now or else show Premium
  // Current Surveys List 4 and bottom more

  return (
    <>
      <Head>
        <title>Dashboard - TaxPal</title>
      </Head>
      <div className="flex">
        <Header />
        <main
          className="mb-2 ml-8 mt-10 h-screen w-[60%] text-black"
          style={{ height: `calc(100vh - 40px)` }}
        >
          <h1 className="text-2xl font-bold text-indigo-900">Dashboard</h1>
          {/* <p className="mt-3 text-2xl">
            Get started by editing{' '}
            <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
              pages/dashboard.jsx
            </code>
          </p> */}
          <div className="flex">
            <NumberElement title="Hello" icon={faUser} count={1000} />
            <NumberElement title="Hello" icon={faUser} count={1000} />
            <NumberElement title="Hello" icon={faUser} count={1000} />
          </div>
        </main>
      </div>
    </>
  )
}
