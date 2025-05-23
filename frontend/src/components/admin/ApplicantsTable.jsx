import React from 'react'
import {Table,TableCaption,TableHeader,TableRow,TableHead,TableBody,TableCell} from '../ui/table'
import { Popover, PopoverContent,PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {toast} from 'sonner'

const shortListingStatus = ["Accepted","Rejected"];

const ApplicantsTable = () => {
    const {applicants} = useSelector(store=>store.application)

    const statusHandler = async (status,id) =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true})
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            
        }
    }
  return (
    <div>
        <h1 className='text-center my-3'>A list of your recent applied user</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item)=>(
                            <tr key={item._id}>
                        <TableCell>{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell>
                            {
                                item.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>  : <span>NA</span>
                                
                            }
                            </TableCell>
                        <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                        <TableCell className='text-right cursor-pointer'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal/>
                                </PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    {
                                shortListingStatus.map((status,index) =>{
                                    return(
                                        <div onClick={() => statusHandler(status,item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                            <span>{status}</span>
                                        </div>
                                    )
                                })
                            }
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </tr>
                        ))
                    }
            
                </TableBody>
        </Table>
    </div>
  )
}

export default ApplicantsTable