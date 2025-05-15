import React,{useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice.js'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()

useEffect(() =>{
const fetchSingleCompany = async () =>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_COMPANY_API_ENDPOINT}/get/${companyId}`,{withCredentials:true});
        if (res.data.success) {
            dispatch(setSingleCompany(res.data.company));
            
        }
    } catch (error) {
        console.log(error);
        
    }
}
fetchSingleCompany();
},[companyId, dispatch])
}

export default useGetCompanyById