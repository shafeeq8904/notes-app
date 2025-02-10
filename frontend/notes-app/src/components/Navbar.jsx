import React, { useState } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = ({ userInfo, onSearchNote, getAllNotes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
    
  };

  const onClearSearch = () => {
    setSearchQuery("");
    getAllNotes();
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="container mx-auto flex items-center justify-between">
  
        <h2 className="text-xl font-semibold text-black">Notes</h2>

        <div className="flex-grow flex justify-center">
          {userInfo && (
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          )}
        </div>

        {userInfo && (
          <button
            className="sm:hidden text-2xl text-gray-600 ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />} {/* Toggle Menu Icon */}
          </button>
        )}

        <div className="hidden sm:block">
          {userInfo && <ProfileInfo onLogout={onLogout} userInfo={userInfo} />}
        </div>
      </div>

      {menuOpen && userInfo && (
        <div className="sm:hidden mt-3 bg-gray-100 p-4 rounded-lg shadow-lg max-w-56 mx-auto text-center">
          <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
        </div>
      )}
    </nav>
  );
};
