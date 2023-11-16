import axios from "axios"
import { useEffect, useState } from "react"
import { ContentForm } from "../components/ContentForm"

export const MyPosts = () => {
    const [show, setShow] = useState(false)

    const hideModal = (condition) => {
        setShow(condition)
    }

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        const asyncFn = async() => {
            const {data} = await axios.get('http://localhost:3000/myposts', {
                headers : {Authorization : `Bearer ${localStorage.access_token}`}
            })
            setMyPosts(data)
        }
        asyncFn()
    }, [])
    


    const deleteHandler = async(postId) => {
        await axios.delete(`http://localhost:3000/posts/${postId}`, {
            headers : {Authorization : `Bearer ${localStorage.access_token}`}
        })

        setMyPosts(myPosts.filter(post => post.id !== postId))
    }
 

    return (
    <>
    < ContentForm edit hideModal={hideModal} show={show}/>
    <div className="grid grid-cols-3">
        {myPosts ? <>
            {myPosts.map(post => {
                return(
                <>
                
                    <div className="mx-auto w-5/6 text-center mt-8 bg-cyan-50 rounded-lg py-8">
                        <img className="w-5/6 rounded-lg mx-auto" src={post.imageUrl} alt="" />
                        <h1 className="text-2xl">{post.caption}</h1>
                        <div>
                            <button onClick={() => deleteHandler(post.id)} className="bg-red-500 rounded-full px-6 py-4 text-white">X</button>
                        </div>
                    </div>
                
                </>
                )
            })}
            </> : <div> palsu</div>}
        </div>
    </>
    )
}