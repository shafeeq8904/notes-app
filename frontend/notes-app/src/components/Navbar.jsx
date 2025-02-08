import React, { useState } from 'react'
import { ProfileInfo } from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from './SearchBar'

export const Navbar = ({userInfo ,onSearchNote,getAllNotes}) => {
  const [searchQuery, setSearchQuery] =useState('')

  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const handleSearch = (e) => {
    if(searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery('')
    getAllNotes()

  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-md'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

      {
        userInfo && (
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        )
      }
    {
      userInfo && (
        <ProfileInfo onLogout={onLogout} userInfo={userInfo}/>          
      )
    }
        
    </div>
  )
}
