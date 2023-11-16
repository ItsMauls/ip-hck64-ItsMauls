import axios from "axios"
import { useEffect, useState } from "react"

export const HotPost = ({hideModal}) => {
    const [posts, setPosts] = useState([])

    useEffect( () =>{
        const asyncFn = async() => {
            const {data} = await axios.get('http://localhost:3000/hotposts', {
                headers : {Authorization : `Bearer ${localStorage.access_token}`}
            })
            setPosts(data)
        }
        asyncFn()
    },[])
    
    return (
        <>
        <div className=" w-1/4 fixed float-left">
        <ul className="bg-red-500 rounded-lg m-2">
        <li className="border-b py-1 black text-center">Hot Post</li>
        {posts.map((post,idx) => {
            return <li key={post.id} className="border-b black py-2 px-2 text-lg">{idx + 1}. {post.caption}</li>
        })}
        </ul>
        <button onClick={() => hideModal(true)} className="m-2 bg-blue-300 py-2 px-3 rounded-lg text-white">Create your own content </button>
    </div>
    
        </>
    )
}