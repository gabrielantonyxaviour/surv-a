import React, { useEffect, useContext } from 'react'
import Header from '@/components/app/AppHeader'
import Head from 'next/head'

import { useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'

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

  return (
    <>
      <Head>
        <title>Dashboard - TaxPal</title>
      </Head>
      <Header />
    </>
  )
}
