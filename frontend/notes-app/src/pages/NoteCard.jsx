import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'

export const NoteCard = ({title , date, content,tags,isPinned ,onEdit , onDelete , onPinNote}) => {
  return (
    <>
        <div className='border rounded p-4 hover:shadow-xl transition duration-300 ease-in-out'>
            <div className='flex justify-between items-center'>
                <div>
                    <h6 className='text-sm font-bold'>{title}</h6>
                    <span className='text-xs text-slate-500'>{date}</span>
                </div>

                <MdOutlinePushPin onClick={onPinNote} className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`}/>

            </div>

            <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

            <div className="flex items-center justify-between mt-2">
   
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        {tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 border border-slate-300 rounded-md bg-slate-100">
                                # {tag}
                            </span>
                        ))}
                    </div>

    
                    <div className="flex items-center gap-2">
                        <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
                        <MdDelete className="icon-btn hover:text-red-600" onClick={onDelete} />
                    </div>
            </div>


        </div>
    </>
  )
}
