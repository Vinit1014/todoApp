
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'sonner';

const AddEditNotes = ({ noteData, type, onClose, getAllNotes, userId }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [errors, setErrors] = useState({ title: '', content: '' });

  useEffect(()=>{
    console.log(noteData);
  },[noteData])

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/api/tasks', {
        title,
        content,
        userId,
      });
  
      if (response.data && response.data.task) {
        getAllNotes();
        onClose();
        toast.success('Task added successfully');
      }
    } catch (error) {
      toast.error('Failed to add the task. Please try again.');
    }
  };
  
  const editNote = async () => {
    const noteId = noteData?._id;
    try {
      const response = await axiosInstance.put('/api/tasks/' + noteId, {
        title,
        content,
      });
  
      if (response.data && response.data.task) {
        getAllNotes();
        onClose();
        toast.success('Task updated successfully'); 
      }
    } catch (error) {
      toast.error('Failed to update the task. Please try again.'); 
    }
  };
  

  const handleNoteSubmit = () => {
    let newErrors = {};

    if (!title) {
      newErrors.title = 'Title is required';
    }

    if (!content) {
      newErrors.content = 'Content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); 

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className={`text-2xl text-slate-950 outline-none ${
            errors.title ? 'border-red-500' : ''
          }`}
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
      </div>

    
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <input
          type="text"
          className={`text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded ${
            errors.content ? 'border-red-500' : ''
          }`}
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
      </div>

      {errors.server && <p className="text-red-500 mt-2">{errors.server}</p>}
      <button className="btn-primary font-medium mt-5 p-3" onClick={handleNoteSubmit}>
        {type === 'add' ? 'ADD' : 'UPDATE'}
      </button>
    </div>
  );
};

export default AddEditNotes;
