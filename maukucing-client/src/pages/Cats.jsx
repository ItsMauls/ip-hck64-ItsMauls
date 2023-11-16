import { useEffect, useState } from "react"
import axios from 'axios'
import 'dotenv'
import TableSkeletonLoading from "../components/TableLoadingSkeleton"

export const Cats = () => {
    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(false)
    const url = `https://api.thecatapi.com/v1/breeds?limit=20&page=0`
    useEffect(() => {
        const asyncFn = async() => {
            setLoading(true)
            const {data} = await axios.get(url, {
                headers: {
                    "x-api-key": 'live_RLIcpYSS4rELop5trjdlipouHHo1jkiLyLttAQRDQrMsCrDb5aeDiOcUI9k7j0Kp',
                  }
                })
                setLoading(false)
                setCats(data)
        }
        asyncFn()
    }, [])
   
    return ( 
    <>
    
    <div className="grid grid-cols-5 gap-5 my-4 mx-4 mb-4">
        {cats.map(cat => {
            return (
            <>
            {loading ? < TableSkeletonLoading /> :
            <div className="bg-cyan-100 rounded-lg px-2 py-2 border drop-shadow-lg border-red-700">
            <h1 className="text-emerald-700 font-bold">{cat.name}</h1>
            <h1 className="text-emerald-700 my-2">{cat.origin}</h1>
            <img  className="rounded-lg shadow-xl" src={cat.image.url} alt="" />
            <p>{cat.description}</p>
            </div>}
            </>
            )
        })}
    
    </div>
    </>

    )
}