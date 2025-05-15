import React,{useState,useEffect} from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice.js'
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/authSlice.js'

const Login = () => {
  const [input,setInput] = useState({
    email:"",
    password:"",
    role:"",
  })

  const {loading,user} = useSelector(store => store.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  
  const submitHandler = async(e)=>{
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/login`,input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setLoading(false));
    }
  }

  useEffect(()=>{
    if (user) {
      navigate("/")
    }
  },[])
  
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Login</h1>
                <div className = 'my-2 mb-5'>
                  <Label className='mb-1'>Email</Label>
                  <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your email"/>
                </div>
                <div className = 'my-2 mb-5'>
                  <Label className='mb-1'>Password</Label>
                  <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your Password"/>
                </div>
                
                <div className='flex items-center justify-between'>
                <RadioGroup className='flex items-center justify-between'>
                <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='student' checked={input.role === 'student'} onChange={changeEventHandler} className='cursor-pointer'/>
                  <Label htmlFor="option-one">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='recruiter' checked={input.role === 'recruiter'} onChange={changeEventHandler} className='cursor-pointer'/>
                <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </RadioGroup>
                </div>
                {
                  loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
                  : <Button type='submit' className='w-full cursor-pointer'>Login</Button>
                }
                
                <span>Don't have an account? <Link to='/signup' className='text-blue-600'>Sign Up</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Login