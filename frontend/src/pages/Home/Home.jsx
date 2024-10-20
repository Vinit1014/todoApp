import React,{useState, useEffect} from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import { Plus } from 'lucide-react'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import EmptyCard from '../../components/EmptyCard'
import MyNote from "../../assets/add-note.svg";
import { toast } from 'sonner';

const Home = () => {

    const navigate = useNavigate();
    const [openAddEditModal, setOpenEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const [userInfo, setUserInfo] = useState(null);
    const [tasks, setTasks] = useState([]); // Store tasks here
    const [loading, setLoading] = useState(true);

    const getUserInfo = async()=>{
        try {
            const response = await axiosInstance.get('/api/users/info');
            if (response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    const getAllNotes = async (userId) => {
        try {
          const response = await axiosInstance.get(`/api/tasks/${userId}`);

          console.log(response.data);
          
          if (response.data && response.data.tasks) {
            setTasks(response.data.tasks);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          setLoading(false);
        }
    };

    const deleteNote = async (data) => {
        const noteId = data?._id;
        try {
            const response = await axiosInstance.delete('/api/tasks/' + noteId);
            if (response.data && !response.data.error) {
                getAllNotes(userInfo.id);
                toast.success('Task deleted successfully'); 
            }
        } catch (error) {
            toast.error('Failed to delete the task. Please try again.'); 
        }
    };
      

    const updateIsCompleted = async (data) => {
        const noteId = data?._id;
        try {
          const response = await axiosInstance.put('/api/tasks/' + noteId, {
            isCompleted: !data.isCompleted,
          });
      
          if (response.data && !response.data.error) {
            getAllNotes(userInfo.id);
            toast.success(data.isCompleted ? 'Task marked as incomplete' : 'Task marked as complete'); 
          }
        } catch (error) {
          toast.error('Failed to update the task. Please try again.'); 
        }
    };
      
    
    useEffect(()=>{
        if (userInfo?.id) {
            getAllNotes(userInfo.id);
        }
    },[userInfo])

    useEffect(()=>{
        console.log(tasks);
    },[tasks])

    useEffect(()=>{
        getUserInfo();
        return ()=>{};
    },[])

  return (
    <>
        <Navbar userInfo={userInfo}/>

        <div className="container mx-auto">
            {tasks.length > 0 ? (
                (
                <div className="grid m-2 md:grid-cols-3 sm:grid-cols-1 gap-4 mt-8">
                    {tasks.map((task) => (
                    <NoteCard
                        key={task._id}
                        title={task.title}
                        date={task.date}
                        content={task.content}
                        isCompleted={task.isCompleted}
                        onEdit={() => {
                        setOpenEditModal({
                            isShown: true,
                            type: 'edit',
                            data: task,
                        });
                        }}
                        onDelete={() => {
                            deleteNote(task)
                        }}
                        onComplete={() => {
                            updateIsCompleted(task)
                        }}
                    />))}
                </div>
            )): (
                <EmptyCard imgSrc={MyNote} message="Start creating your first note! Click + button to jot down your thoughts, ideas, and reminders. Start creating it."/>
            )}
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
            <AddEditNotes
                userId={userInfo?.id}
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose={()=>{
                    setOpenEditModal({isShown: false, type:'add', data: null});
                    getAllNotes(userInfo?.id)
                }}
                getAllNotes={getAllNotes}
            />
        </Modal>
    </>
  )
}

export default Home