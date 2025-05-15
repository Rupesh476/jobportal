import React,{useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCompanies } from '../redux/companySlice.js'

const useGetAllCompany = () => {
    const dispatch = useDispatch()

useEffect(() =>{
const fetchCompanies = async () =>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_COMPANY_API_ENDPOINT}/get`,{withCredentials:true});
        if (res.data.success) {
            dispatch(setCompanies(res.data.companies));
            
        }
    } catch (error) {
        console.log(error);
        
    }
}
fetchCompanies();
},[])
}

export default useGetAllCompany