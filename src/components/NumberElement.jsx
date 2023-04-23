import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NumberElement = ({ title, count, icon }) => {
  return (
    <div className="mx-2 my-4 flex h-[120px] grow flex-col  rounded-xl border-[1px] border-slate-100 bg-white p-4 text-black drop-shadow-xl hover:border-indigo-600 hover:bg-indigo-500 hover:text-white">
      <div>
        <div className="flex justify-between ">
          <h1 className="text-sm font-semibold">{title}</h1>
          <div className="h-[25px] w-[25px] rounded-full bg-gray-500 bg-opacity-30 text-center text-gray-500">
            {' '}
            <FontAwesomeIcon icon={icon} size="sm" />
          </div>
        </div>
      </div>
      <h1 className="mt-auto text-2xl font-bold">{count}</h1>
    </div>
  )
}
export { NumberElement }
