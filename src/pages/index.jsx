import Head from 'next/head'
import { useState, useEffect } from 'react'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Loading from '@/components/Loading'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    try {
      if (user) {
        router.push('/dashboard')
      }
    } catch (error) {
    } finally {
      // setLoading(false)
    }
  }, [user])

  if (loading) return <Loading onComplete={() => setLoading(false)} />

  return (
    <>
      <Head>
        <title>SURV-A | Your Survey's Digital Oracle</title>
        {/* <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        /> */}
      </Head>
      <Header />
      <main>
        <Hero />
        {/* <PrimaryFeatures /> */}
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
