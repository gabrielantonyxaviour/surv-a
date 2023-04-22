import React from 'react'
import { Logo } from './Logo'

export default function Loader() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div class="border shadow rounded-md py-4 px-9 max-w-sm">
        <div class="animate-pulse">
          <Logo className="h-20 w-auto" />
        </div>
      </div>
    </div >
  )
}
