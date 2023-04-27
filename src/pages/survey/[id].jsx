import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import Router from 'next/router'
import { UserContext } from '../../lib/UserContext'
import Loading from '../../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default function view() {
  // const [user] = useContext(UserContext)
  const [user, setUser] = useState({ loading: true })
  const [status, setStatus] = useState('Loading...')
  useEffect(() => {
    if (user.email) {
      Router.push('/dashboard')
    } else {
      setStatus('Connecting to mail...')
    }
    // if (user?.email) {
    //   //Router.push('/profile')
    //   const checkEmail = async () => {
    //     const email = user.email
    //     const checkEmailRes = await fetch('/api/findCommunityByEmail', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email }),
    //     })
    //     const checkEmailData = await checkEmailRes.json()

    //     // Redirect to the dashboard if the email exists, otherwise continue to profile
    //     if (checkEmailData.objects && checkEmailData.objects.length > 0) {
    //       Router.push('/dashboard')
    //     } else {
    //       Router.push('/profile')
    //     }
    //   }
    //   checkEmail()
    // }
  }, [user])
  return (
    <>
      {user?.loading ? <Loading /> : user?.issuer && <div>Thank you! Next</div>}
      <div className="absolute bottom-4 right-8 rounded-xl bg-indigo-500 p-4 font-semibold text-white">
        <p>
          <FontAwesomeIcon icon={faSpinner} spin /> &nbsp;
          {status}
        </p>
      </div>
    </>
  )
}
