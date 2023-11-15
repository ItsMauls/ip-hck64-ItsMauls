import {useState} from 'react'
import { UpvoteDownvoteButton } from './UpvoteDownvote'

export const InteractiveTable = ({postId, totalLike}) => {
    const [upvote, setUpvote] = useState(true)

    return (
    <>
    <div className='mx-auto flex justify-between bg-lime-300 rounded-lg w-1/4 px-4'>
        < UpvoteDownvoteButton postId={postId}  totalLike={totalLike} isUpvote={upvote} setUpVote={setUpvote}/>
        <h1></h1>
        <button className='py-1 my-2 rounded-lg bg-white px-4'>Comment</button>
    </div>
    </>
    )
}