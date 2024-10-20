import React from 'react'
import { Pin, Trash, Pencil } from 'lucide-react'
const NoteCard = ({title, date, content, isCompleted, onEdit, onDelete, onComplete}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl translate-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>{date}</span>
            </div>
            <Pin className={`icon-btn ${isCompleted ? 'text-primary':'text-slate-300'}`} onClick={onComplete}/>
        </div>
        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>
        <div className='ml-[330px] flex items-center justify-between mt-2'>
            <div className='flex items-center gap-2'>
                <Pencil className='icon-btn hover:text-green-600'
                onClick={onEdit}
                />
                <Trash
                className='icon-btn hover:text-red-500'
                onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard