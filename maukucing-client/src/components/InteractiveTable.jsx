import {useState} from 'react'
import { UpvoteDownvoteButton } from './UpvoteDownvote'

export const InteractiveTable = ({postId}) => {
    const [upvote, setUpvote] = useState(true)

    return (
    <>
    <div>
        < UpvoteDownvoteButton postId={postId} isUpvote={upvote} setUpVote={setUpvote}/>
        <h1></h1>
        <input type="text" />
    </div>
    </>
    )
}