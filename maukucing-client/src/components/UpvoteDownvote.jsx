import axios from "axios"


export const UpvoteDownvoteButton = ({isUpvote, postId, setUpVote}) => {
    
    const upvote = async() => {
        const {data} = await axios.patch(`http://localhost:3000/like-posts/${postId}`, postId,{
            headers : {Authorization : `Bearer ${localStorage.access_token}`}
        })
        console.log(data);
        setUpVote(false)
        
    }

    const undoUpvote = async() => {
        await axios.patch(`http://localhost:3000/undo-like-posts/${postId}`,postId, {
            headers : {Authorization : `Bearer ${localStorage.access_token}`}
        })
        setUpVote(true)
    }

    return (
        <>
       {isUpvote ? <button onClick={upvote}>Upvote</button> : <button onClick={undoUpvote}>Downvote</button>} 
        </>
    )
}