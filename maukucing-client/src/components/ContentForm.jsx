import axios from 'axios';
import {useEffect, useState} from 'react'
import openSocket from 'socket.io-client'


export const ContentForm = ({hideModal, show}) => {


useEffect(() => {
  const socket = openSocket('http://localhost:3000');

  
  socket.on('new-post', newPost => {
      console.log('New post received:', newPost);
      // Update state or context as needed
  });

  return () => socket.disconnect(); // Disconnect on cleanup
}, []);



    const [formValue, setFormValue] = useState({
        caption : '',
        imageUrl : null
    })
    const inputHandler = (e) => {
        const { name, value, files } = e.target;
        setFormValue({
        ...formValue,
        [name]: name === 'imageUrl' ? files[0] : value,
        });
    }

  

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            
            formData.append('caption', formValue.caption);
            formData.append('imageUrl', formValue.imageUrl);
 

            await axios.post('http://localhost:3000/posts', formData, {
                headers: {
                  Authorization: `Bearer ${localStorage.access_token}`,
                  'Content-Type': 'multipart/form-data',
                },
              });
          

              hideModal(false)
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
      <>
      {show &&
      <form onSubmit={submitHandler}>
      <div onClick={() => hideModal(false)} className='inset-0 bg-opacity-40 flex bg-black fixed'></div>
        <div className="bg-cyan-50 fixed z-50 w-1/4 left-2 mx-auto rounded-xl mt-4">
          <h1 className="text-xl font-bold text-center py-4 text-white rounded-t-xl bg-cyan-300"><span className='bg-red-200 px-4 ml-2 float-left rounded-full'><button onClick={() => hideModal(false)}>X</button></span>Submit Your Content</h1>
          <div className="grid grid-cols-2 gap-4 p-4">
            <img className="w-full rounded-lg shadow-lg" src="/src/assets/foto_profil.png" alt="Profile" />
            <div className="flex flex-col">
              <label htmlFor="content" className="mb-2 text-lg">Caption</label>
              <textarea onChange={inputHandler} id="content" name="caption" rows="4" className="p-2 bg-cyan-200 rounded-lg focus:ring focus:outline-none" placeholder="Type your story here..."></textarea>
            </div>
            <div className="col-span-2">
              <label htmlFor="imageUrl" className="text-lg">Image URL</label>
              <input onChange={inputHandler} type="file" id="imageUrl" name="imageUrl" className="w-full p-2 mt-2 bg-cyan-200 rounded-lg focus:ring focus:outline-none" placeholder="http://example.com/image.jpg" />
            </div>
            <button className="col-span-2 mx-4 border border-black bg-cyan-500 text-white rounded-lg p-2 shadow-lg hover:bg-cyan-600 transition duration-300 ease-in-out">Submit</button>
          </div>
        </div>
        </form>
    }
      </>
    );
  };