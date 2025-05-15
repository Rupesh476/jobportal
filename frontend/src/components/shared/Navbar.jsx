import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { User2, LogOut } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios';
import { setUser } from '../../redux/authSlice.js'

const Navbar = () => {
  const {user} = useSelector(store=>store.auth); 
  const dispatch = useDispatch();
        const navigate = useNavigate();

  const logOutHandler = async () =>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/logout`,{withCredentials:true})
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 '>
      <div>
      <h1 className='text-2xl font-bold'><Link to='/'>Job<span className='text-[#f83002]'>Portal</span></Link></h1>
    </div>
    <div className='flex items-center gap-12 cursor-pointer'>
      <ul className='flex font-medium items-center gap-5'>
        {
          user && user.role === 'recruiter' ? (
            <>
            <li><Link to='/admin/companies'>Companies</Link></li>
            <li><Link to='/admin/jobs'>Jobs</Link></li>
            </>
          ):(
            <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/jobs'>Jobs</Link></li>
            <li><Link to='/browse'>Browse</Link></li>
            </>
          )
        }
      </ul>
      {
        !user? (
          <div className='flex items-center gap-2'>
          <Link to='/login'><Button variant='outline'>Login</Button></Link>
          <Link to='/signup'><Button className='bg-red-600 hover:bg-red-700 cursor-pointer'>Sign Up</Button></Link>
          </div>
        ):(
          <Popover>
        <PopoverTrigger>
          <Avatar className='cursor-pointer'>
            <AvatarImage src={user?.profile?.profilePhoto} alt="profile"/>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='w-80'>
          <div className='flex gap-4 space-y-2'>
        <Avatar className='cursor-pointer'>
            <AvatarImage src={user?.profile?.profilePhoto} alt="profile"/>
          </Avatar>
          <div>
          <h4 className='font-medium'>{user?.fullname}</h4>
          <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
          </div>
          </div>
          <div className='flex flex-col gap-2 text-gray-600'>
            {
              user && user.role === 'student' && (
                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                <User2/>
              <Button  className='cursor-pointer' variant="link"><Link to='/profile'>View Profile</Link></Button>
              </div>
              )
            }
            <div className='flex w-fit items-center gap-2 cursor-pointer'>
              <LogOut/>
            <Button onClick={logOutHandler} className='cursor-pointer' variant="link">Logout</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
        )
      }
      
    </div>
    </div>
    </div>
  )
}

export default Navbar