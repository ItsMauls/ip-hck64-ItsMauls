import axios from "axios"
import { useEffect, useState } from "react"
import { CommentForm } from "./CommentForm"

export const CommentSection = ({postId, hideCommentSection}) => {
    const [postComments, setpostComments] = useState([])
    
    useEffect(() => {
        const asyncFn = async () => {
            const {data} = await axios.get(`http://localhost:3000/comments/${postId}`, {
                headers : {Authorization : `Bearer ${localStorage.access_token}`}
            })
            setpostComments(data)
        }
        asyncFn()
    }, [])
    return (
    <>
   <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div className="bg-red-500 w-2/6 rounded-xl overflow-y-scroll py-4 px-4" style={{ maxHeight: '80vh' }}>
    {postComments.map(val => {
      return (<>
        <div className="flex justify-between my-4 rounded-lg px-1 bg-orange-100">
          <div className="grid grid-cols-2 py-2">
            <h1 className="flex text-center">
              <span><img className="w-14 rounded-full" src="src/assets/foto_profil.png" alt="" /></span>{val.comment}
            </h1>
          </div>
        </div>
        
         </>
      )
    })}
    
     < CommentForm postId={postId} hideCommentSection={hideCommentSection} />
  </div>
</div> 

        
    </>
    )
}
