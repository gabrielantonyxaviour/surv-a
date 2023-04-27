import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"


export default function view() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    getCountry()
  }, [])


  const getCountry = async () => {
    try {
      const res = await axios.get('https://ipapi.co/json')
      setLocation(res.data.country_name)
    } catch {
      setLocation('Unknown')
    }
  }

  return (
    <div>{location}</div>
  )
}
