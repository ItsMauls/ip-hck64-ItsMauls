import { CommentSection } from "../components/CommentSection"
import { Content } from "../components/Content"
import { ContentForm } from "../components/ContentForm"
import { HotPost } from "../components/HotPost"
import {useState} from 'react'

export const MainPage = () => {
    const [show, setShow] = useState(false)
    const [openComment, closeComment] = useState(false)

    const hideModal = (condition) => {
        setShow(condition)
    }
    const hideCommentSection = (condition) => {
        closeComment(condition)
    }
    
    return (
    <>
    <body className="bg-red-500">
        
    < CommentSection hideCommentSection={hideCommentSection} openComment={openComment}/>
    < HotPost hideModal={hideModal}/>
    < Content hideCommentSection={hideCommentSection}/>
    < ContentForm show={show}/>
   
    </body>
    </>
    )
}