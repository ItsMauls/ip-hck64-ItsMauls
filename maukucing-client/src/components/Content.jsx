import axios from "axios"
import { useEffect, useState } from "react"
import { timeFormatter } from "../../helpers/timeFormatter"


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
    
    <div className="bg-blue-500 w-2/3 mr-4 mt-4 rounded-xl float-right items-center mx-auto">
    
        {content.map(val => {
            return(
            <>
            <div className="mx-4 py-4">
            <h1 className="text-gray-200 block">Created at : {timeFormatter(val.createdAt)}</h1>
            <h1 className="float-left text-4xl mb-4">{val.caption}</h1>
            
            <div>
            
                <img className="rounded-xl w-5/6 mx-auto my-4" src={val.imageUrl} alt="" />
            </div>
            </div>
            </>
            )
        })}
    </div>
    </>)
}