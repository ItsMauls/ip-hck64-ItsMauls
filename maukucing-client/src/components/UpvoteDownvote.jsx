import axios from "axios"
import { useState } from "react"
import openSocket from 'socket.io-client'


export const UpvoteDownvoteButton = ({isUpvote, postId, setUpVote, totalLike}) => {
    let [updateLike, setUpdateLike] = useState(totalLike)

    const upvote = async() => {
        const {data} = await axios.patch(`http://localhost:3000/like-posts/${postId}`, postId,{
            headers : {Authorization : `Bearer ${localStorage.access_token}`}
        })
        
        setUpVote(false)
        setUpdateLike(totalLike + 1)
    }
    const undoUpvote = async() => {
        await axios.patch(`http://localhost:3000/undo-like-posts/${postId}`,postId, {
            headers : {Authorization : `Bearer ${localStorage.access_token}`}
        })
        setUpVote(true)
        setUpdateLike(totalLike)
    }
    
    return (
        <>
       {isUpvote ? <button className="py-1 my-2 rounded-lg bg-white px-4" onClick={upvote}><span>{updateLike}</span> ⬆️ Upvote</button> : <button className="rounded-lg px-4 py-1 my-2 bg-blue-400" onClick={undoUpvote}><span>{updateLike}</span> ⬇️ Downvote</button>} 
        </>
    )
}