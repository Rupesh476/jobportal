import React,{useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice.js'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()

useEffect(() =>{
const fetchAllAdminJobs = async () =>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_JOB_API_ENDPOINT}/getAdminJobs`,{withCredentials:true});
        if (res.data.success) {
            dispatch(setAllAdminJobs(res.data.jobs));
        }
    } catch (error) {
        console.log(error);
        
    }
}
fetchAllAdminJobs();
},[])
}

export default useGetAllAdminJobs