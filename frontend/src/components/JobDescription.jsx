import React,{useEffect,useState} from 'react'
import Navbar from '../components/shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { setSingleJob } from '../redux/jobSlice.js'
import { toast } from 'sonner'

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const {singleJob} = useSelector(store=>store.job)
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant === user?._id) || false;
    const[isApplied,setIsApplied] = useState(isInitiallyApplied)
    
    const applyJobHandler = async () =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/apply/${jobId}`,{}, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true) //update the local state
                const updateSingleJOb = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJOb)) // help us to update real time Ui
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
                console.log(res.data);
    
                if (res.data.success && res.data.getJob) {
                    dispatch(setSingleJob(res.data.getJob));
                    setIsApplied(res.data.getJob.applications.some(application=>application.applicant === user?._id)) // ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch job details");
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);
    

return (
    <div>
    <Navbar/>
    
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
            <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
        <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant='ghost'>{singleJob?.position} Positions</Badge>
        <Badge className={'text-red-700 font-bold'} variant='ghost'>{singleJob?.jobType}</Badge>
        <Badge className={'text-green-700 font-bold'} variant='ghost'>{singleJob?.salary} LPA</Badge>
        </div>
            </div> 
            <Button 
  onClick={isApplied ? null : applyJobHandler } 
  disabled={isApplied}
  className={`cursor-pointer rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
>
  {isApplied ? 'Already Applied' : 'Apply Now'}
</Button>


    </div>
    <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
    <div className='my-4'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
    </div>
    </div>
    </div>
  )
}

export default JobDescription