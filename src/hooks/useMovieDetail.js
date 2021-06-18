import {useState,useEffect} from 'react'
import detailMovieApi from '../api/detailMovieApi'


export default function useMovieDetail(id){
    const [movie,setMovie] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        (async () => {
            const params = {
                MaPhim:id,
            }
            try {
                setLoading(true)
                const result =await detailMovieApi.getDetailMovie(params)
                setMovie(result)
                setLoading(false)
            } catch (error) {
                console.log("failed:",error)
            }
        })();
    },[id])

    return {movie,loading}
}