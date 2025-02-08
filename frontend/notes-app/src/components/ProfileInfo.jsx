import React from 'react'
import { getInitials } from '../utils/helper'

export const ProfileInfo = ({onLogout,userInfo}) => {
  return (
    <>
      <div className='flex items-center gap-4'>
        <div className='w-10 h-10 flex items-center justify-center rounded-full text-slate-900 text-sm bg-slate-100 border'>{getInitials(userInfo?.fullName)}</div>
        

        <div>
          <p className='text-sm font-medium'>{userInfo?.fullName}</p>
          <button className='text-sm text-slate-700 underline ' onClick={onLogout}>Logout</button>
        </div>
      </div>
    </>
  )
}
