import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NumberElement = ({ title, count, icon }) => {
  return (
    <div className="mx-2 my-4 grow rounded-xl bg-indigo-500 p-4 text-white">
      <div classname="flex justify-between  h-[300px]">
        <div className="flex justify-between ">
          <h1 className="font-medium">{title}</h1>
          <FontAwesomeIcon icon={icon} size="lg" />
        </div>
        <h1>{count}</h1>
      </div>
    </div>
  )
}
export { NumberElement }
