import { useState } from 'react';
import axios from 'axios';

function ChatWithGPT() {
  const [query, setQuery] = useState({
    ask : ''
  });
  const [response, setResponse] = useState('');

  const inputHandler = (e) => {
    const {value, name} = e.target
    setQuery({
        ...query,
        [name] : value
    })
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:3000/ask-gpt', {ask : query.ask}, {
        headers : {Authorization : `Bearer ${localStorage.access_token}`}
      });
      setResponse(res.data.assistant);
      console.log('masuk');
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  return (
    <div className='bg-red-50 mx-auto w-2/4 rounded-lg shadow-orange-100 shadow-xl mt-24'>
      <h1 className='text-center text-5xl'>Tanya Ucink</h1>
      <div className='grid grid-cols-2 w-2/4 mx-auto my-4'>
        <img className='rounded-lg' src="/src/assets/foto_profil.png" alt="" />
        <div className='flex items-center justify-center'>
      <h1 className='bg-cyan-200 px-4 py-2 rounded-md ml-4'>Dengan saya ucing, bisa menjadi teman dikala saat kamu kesepian</h1>

        </div>

      </div>
      <div dangerouslySetInnerHTML={{ __html: response }} />
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name='ask'
          defaultValue={query.ask}
          onChange={inputHandler}
          className='w-2/4 rounded-lg py-8 mx-auto flex justify-center'
        />
        <button className='rounded-full bg-orange-200 px-4 py-4 ' type="submit">Ask</button>
      </form>
    </div>
  );
}

export default ChatWithGPT;
