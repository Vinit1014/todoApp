import React,{useState} from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import { Plus } from 'lucide-react'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"

const Home = () => {

    const [openAddEditModal, setOpenEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });



  return (
    <>
        <Navbar/>

        <div className='container mx-auto'>
            <div className='grid grid-cols-3 gap-4 mt-8'>

            <NoteCard title="Meeting on 10th Oct" date="3rd Oct 2024" content="Meeting on 10th Oct content" isCompleted={true}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onComplete={()=>{}}
            />
            </div>
        </div>

        <button className='w-16 h-16 items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{
            setOpenEditModal({isShown:true, type:"add", data:null});
        }}>
            <Plus className='m-5 text-[38px] text-white'/>
        </button>
        <Modal isOpen={openAddEditModal.isShown}
        onRequestClose={()=>{}}
        style={{
            overlay: {backgroundColor: 'rgba(0,0,0,0.2)'
            },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
            <AddEditNotes/>
        </Modal>
    </>
  )
}

export default Home