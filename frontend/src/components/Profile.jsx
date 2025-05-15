import React,{useState} from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen,Mail,Contact } from 'lucide-react';
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedjob'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
const[open,setOpen] = useState(false)
const {user} = useSelector(store=>store.auth);

console.log("User:", user);

return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
            <div className='flex items-center gap-4'>
            <Avatar className='h-23 w-24'>
                <AvatarImage src='https://github.com/shadcn.png' alt="profile"/>
            </Avatar>
            <div>
            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
            <p>{user?.profile?.bio || "Bio not available"}</p>
            </div>
            </div>
            <Button onClick={() => setOpen(true)} className='text-right cursor-pointer' variant='outline'><Pen/></Button>
            </div>
            <div className='mt-4 '>
            <div className='flex items-center gap-3 my-2'>
                <Mail/>
                <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 '>
                <Contact/>
                <span>{user?.phoneNumber}</span>
            </div>
            </div>
            <div className='mt-3 '>
                <h1>Skills</h1>
                <div className='flex items-center gap-1 my-1'>
                {
                    user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item,index) => <Badge key={index}>{item}</Badge>) : <span>Skills Unavailable</span>
                }
                </div>
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label className='text-md font-bold'>Resume</Label>
                {
                    isResume ? <a  href={user?.profile?.resume} target='blank'  rel='noopener noreferrer' className='text-blue-600 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>Resume not available</span>
                }
            </div>
        </div>
        <div className='max-w-4xl xm-auto bg-white rouned-2xl'>
                <h1 className='font-bold text-lg my-3'>Applied Jobs</h1>
                {/* Application table */}
                <AppliedJobTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile