import React,{useState,useEffect} from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { setSearchJobByText } from '../../redux/jobSlice.js'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const[input,setInput] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(setSearchJobByText(input))
  },[input])

  return (
    <div>
        <Navbar/>
        <div className=' max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
            <Input className='w-fit' placeholder='Filter by name, role' onChange={(e) => setInput(e.target.value)} />
            <Button className='cursor-pointer' onClick={() => navigate("/admin/jobs/create")}>Post Jobs</Button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs