import {useState,useEffect} from 'react'
import ticketInfoApi from '../api/ticketInfoApi';


export default function useMovieDetail(id){
    const [ticket,setTicket] = useState({})
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        (async () => {
            const params = {
                MaLichChieu:id,
            }
            try {
                setLoading(true)
                const result =await ticketInfoApi.getTicketInfo(params)
                setTicket(result)
                setLoading(false)
            } catch (error) {
                console.log("failed:",error)
            }
        })();
    },[id])

    return {ticket,loading}
}