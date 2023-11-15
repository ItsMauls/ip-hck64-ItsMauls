import { Content } from "../components/Content"
import { ContentForm } from "../components/ContentForm"
import { HotPost } from "../components/HotPost"
import {useState} from 'react'

export const MainPage = () => {
    const [show, setShow] = useState(false)

    const hideModal = (condition) => {
        setShow(condition)
    }
    
    return (
    <>
    <body className="bg-red-500">
        
    
    < HotPost hideModal={hideModal}/>
    < Content/>
    < ContentForm hideModal={hideModal} show={show}/>
    </body>
    </>
    )
}