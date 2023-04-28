import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { useSession } from '@supabase/auth'
import { supabase } from "@/helpers/supabase"
import Loading from '@/components/Loading'


const PrivateRoute = ({ children }) => {
  // const [user, setUser] = useState()
  const [session, setSession] = useState()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      // console.log(router.asPath)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setSession(session)
      } else {
        router.push('/login')
      }
    } catch {
      router.push('/404')
    }
  }

  if (loading) return <Loading onComplete={() => {
    if (loading) {
      setLoading(false)
    }
  }} />

  return <>{children}</>
}

export default PrivateRoute
