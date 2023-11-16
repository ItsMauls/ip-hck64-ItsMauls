import { CommentSection } from "../components/CommentSection"
import { Content } from "../components/Content"
import { ContentForm } from "../components/ContentForm"
import { HotPost } from "../components/HotPost"
import {useState} from 'react'

export const MainPage = () => {
    const [show, setShow] = useState(false)
    const [openComment, closeComment] = useState(false)
    const [id, setId] = useState(null)

    const hideModal = (condition) => {
        setShow(condition)
    }
    const hideCommentSection = (condition, postId) => {
        closeComment(condition)
        
        if(postId) setId(postId)
        
    }
    
    return (
    <>
    <body className="bg-red-500">
        {openComment && < CommentSection postId={id} hideCommentSection={hideCommentSection} openComment={openComment}/>}
    
    < HotPost hideModal={hideModal}/>
    < Content openComment={openComment} hideCommentSection={hideCommentSection}/>
    < ContentForm  show={show} hideModal={hideModal}/>
   
    </body>
    </>
    )
}