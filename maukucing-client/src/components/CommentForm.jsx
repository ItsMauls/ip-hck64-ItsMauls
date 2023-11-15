import axios from "axios"
import { useState } from "react"

export const CommentForm = ({hideCommentSection, postId}) => {
    console.log(postId, 'idddd');
    const [comment, setComment] = useState({
        comment : ''
    })
    const inputHandler = (e) => {
        const {name, value} = e.target
        setComment({
            ...comment,
            [name] : value
        })
        console.log(name, value);
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3000/posts-comment/${postId}`, comment, {
                headers : {Authorization : `Bearer ${localStorage.access_token}`}
            })
            console.log('masuk');
        } catch (error) {
            
        }
    }
    return (
    <>
    <form onSubmit={submitHandler}>
        <textarea onChange={inputHandler} name="comment" id="" cols={50}></textarea>
        <div className="grid grid-cols-5 mx-auto">
        <button type="submit" className="mx-auto bg-blue-200 ml-2 text-center rounded-lg px-4">Enter</button>
        </div>
    </form>
        <button onClick={() => hideCommentSection(false)} className="mx-auto bg-red-200 ml-2 text-center rounded-lg px-4">Cancel</button>
    </>
    )
}