import React from "react";
import { MdOutlineNoteAlt } from "react-icons/md"; // 📝 Empty note icon

export const EmptyCard = ({ onAddNote }) => {
  return (
    <div className="flex items-center justify-center ">  {/* ✅ Full-screen centering */}
      <div className="flex flex-col items-center justify-center text-center bg-slate-100 p-6 rounded-lg shadow-md mt-8 max-w-72">
        {/* Icon */}
        <MdOutlineNoteAlt className="text-gray-400 text-6xl mb-3" />

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-600">
          No Notes Available
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2">
          Start adding notes to keep track of important things!
        </p>

      </div>
    </div>
  );
};
