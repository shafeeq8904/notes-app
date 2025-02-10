import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { NoteCard } from './NoteCard'
import { MdAdd } from 'react-icons/md'
import { AddEditNotes } from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import moment from "moment"
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { EmptyCard } from '../components/EmptyCard'

Modal.setAppElement("#root");

export const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow:false,
    type:'add',
    data:null
  })

  const [userInfo,setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch , setIsSearch] = useState(false);
  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShow:true,type:'edit',data:noteDetails})
  }

  const getUserInfo = async () =>{
    try{
      const response = await axiosInstance.get('/get-users');
      if(response.data && response.data.user){
      setUserInfo(response.data.user);
      }
    }catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-notes');
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again")
    }
  }


  const deleteNote = async (data) => {
    try {
        const noteId = data._id;
        const response = await axiosInstance.delete('/delete-note/' + noteId);

        if (response.data && !response.data.error) {
            toast.error("Note deleted successfully!");
            getAllNotes();
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
            toast.error(error.response.data.message);

        }
    }
};

  const onSearchNote = async (query) => {
  try {
      const response = await axiosInstance.get('/search-notes', {
          params: { query }
      });

      if (response.data && response.data.notes) {
          setAllNotes(response.data.notes);
          setIsSearch(true);
      }
      }catch(error){
          console.log(error)
      }
  }

  const updateIsPinned = async (noteData) => {
    try {
        const noteId = noteData._id;
        const newPinnedState = !noteData.isPinned;
        const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
            isPinned: newPinnedState //
        });

        if (response.data && response.data.note) {
            toast.success(`Note ${newPinnedState ? "pinned" : "unpinned"} successfully! 📌`);
            getAllNotes();
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        }
    }
};


  useEffect(()=>{
    getAllNotes();
    getUserInfo();
    return ()=> {};
  },[])

  return (
    <>

      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} getAllNotes={getAllNotes} />

      <div className='container mx-auto'>
        {allNotes.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
              {allNotes.map((item,index)=>(
                <NoteCard 
                    key={item._id}
                    title={item.title}
                    date={moment(item.createdOn).format('DD MMM YYYY')}
                    content={item.content}
                    tags={item.tags}
                    isPinned={item.isPinned}
                    onEdit={()=> handleEdit(item)}
                    onDelete={()=>{deleteNote(item)}}
                    onPinNote={()=>{updateIsPinned(item)}}
              />
              ))}
            </div>
      ): (<EmptyCard />)}     
      </div>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={()=>{}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)'
          },
        }}
        contentLabel=""
        className='w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5'
      >
        <div className='max-h-[70vh] overflow-y-auto'>
        <AddEditNotes
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          onClose={()=>{setOpenAddEditModal({isShow:false,type:'add',data:null})}}
          getAllNotes={getAllNotes}
        />
        </div>
        
        
      </Modal>

      <button className=' w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{setOpenAddEditModal({isShow:true,type:'add',data:null})}}>
        <MdAdd className='text-[28px] text-white'/>
      </button>

    </>
    

  )
}
