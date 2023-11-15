import axios from "axios"
import { useEffect, useState } from "react"
import { timeFormatter } from "../../helpers/timeFormatter"
import { InteractiveTable } from "./InteractiveTable"


export const Content = () => {
    const [content, setContent] = useState([])
    useEffect(() => {
        const asyncFn = async () => {
            const {data} = await axios.get('http://localhost:3000/posts', {
                headers : {Authorization : `Bearer ${localStorage.access_token}`}
            })
            console.log(data);
            setContent(data)
        }
        asyncFn()
    }, [])
    console.log(content);
    return (
    <>
    
    <div className="bg-emerald-400 w-2/3 mr-4 mt-4 rounded-xl float-right items-center mx-auto">
        
        {content.map(val => {
            return (
            <>
            <div className="px-2 rounded-lg mx-4 py-4 bg-emerald-100 my-4">
            <h1 className="text-gray-200 block">Created at : {timeFormatter(val.createdAt)}</h1>
            <h1 className="float-left text-4xl mb-4">{val.caption}</h1>
            
            <div>
            
                <img className="rounded-xl w-5/6 mx-auto my-4 " src={val.imageUrl} alt="" />
            </div>
            </div>
            < InteractiveTable postId={val.id} totalLike={val.upvotesCount}/>
            </>
            )
        })}
    </div>
    </>)
}