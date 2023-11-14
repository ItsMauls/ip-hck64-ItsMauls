import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

export const LandingPage = () => {
    const [input, setInput] = useState({
        username : '',
        email : '',
        password : ''
    })
    const [register, setRegister] = useState(false)
    const navigate = useNavigate()

    const inputHandler = (e) => {
        const {value, name} = e.target
        setInput({
            ...input,
            [name] : value
        })
        
    }
    console.log(input);

    const registerForm = async(e) => {
        e.preventDefault()
        try {
            
            await axios.post(`http://localhost:3000/register`, input)
       
           navigate('/posts')
        } catch (error) {
            console.log(error);
        }
    }
    const loginForm = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(`http://localhost:3000/login`, input)
    
            localStorage.setItem('access_token', data.access_token)
            navigate('/posts')
        } catch (error) {
            console.log(error);
        }
    }

    const loginHandler = () => {
        setRegister(false)
    }
    const registerHandler = () => {
        setRegister(true)
    }
    
    return (
    <>
   <nav className="bg-blue-50">
    <ul className="flex items-center justify-between">
        <li><img className="h-24" src="src/assets/transparent_maukucing.png" alt="" /></li>
        <li className="ml-auto bg-orange-200 text-white tracking-wider font-semibold px-8 py-2 rounded-lg m-4">
            {register && <button onClick={loginHandler}>Login</button>}
            {!register && <button onClick={registerHandler}>Register</button>}
        </li>
    </ul>
</nav>

     <img src="src/assets/background-kucing_cropped.png" alt="" />  
     {register && <div className=" bg-cyan-50 z-40 bottom-40 left-2/4 absolute mx-auto w-1/4 rounded-xl border-2 border-red-900">
            <h1 className="bg-red-100 border-b-2 text-center py-4 border-red-900 rounded-t-xl">Gerbang Untuk Menuju MauKucing</h1>
            <h1 className="text-center my-4 text-5xl text-red-900 font-bold">MAUKUCING</h1>
            <form onSubmit={registerForm}>
            <input onChange={inputHandler} name='username' className="block px-14 mx-auto rounded-lg text-center bg-red-300 py-2 placeholder:text-white" type="text" placeholder="Username"/>
            <input onChange={inputHandler} name='email' className="block px-14 mx-auto rounded-lg text-center bg-cyan-500 py-2 my-4 placeholder:text-white" type="email" placeholder="Email"/>
            <input onChange={inputHandler} name='password' className="block px-14 mx-auto rounded-lg text-center bg-orange-200 py-2 placeholder:text-white"  type="password" placeholder="Password"/>
            <button className="mx-auto bg-cyan-500 flex justify-center items-center my-6 rounded-xl px-4 py-2 text-white">Register Sekarang Yuk</button>
            </form>
        </div>} 
        {!register && <div className=" bg-cyan-50 z-40 bottom-40 left-2/4 absolute mx-auto w-1/4 rounded-xl border-2 border-red-900">
            <h1 className="bg-red-100 border-b-2 text-center py-4 border-red-900 rounded-t-xl">Gerbang Untuk Menuju MauKucing</h1>
            <h1 className="text-center my-4 text-5xl text-red-900 font-bold">MAUKUCING</h1>
            <form onSubmit={loginForm}>
            <input onChange={inputHandler} name='email' className="block px-14 mx-auto rounded-lg text-center bg-cyan-500 py-2 placeholder:text-white" type="text" placeholder="Email"/>
            <input onChange={inputHandler} name='password' className="block px-14 mx-auto rounded-lg text-center bg-orange-200 py-2 my-8 placeholder:text-white"  type="password" placeholder="Password"/>
            <button className="mx-auto bg-cyan-500 flex justify-center items-center my-6 rounded-xl px-4 py-2 text-white">Login Sekarang Yuk</button>
            </form>
        </div>}
        
    
    </>
    )
}