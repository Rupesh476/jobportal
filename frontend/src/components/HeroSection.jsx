import React,{useState} from 'react'
import { Button } from '../components/ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice.js'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const[query,setQuery] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () =>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
      <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-600 font-medium'>No.1 Job Hunt Website</span>
      <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-green-700'>Dream Jobs</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente magnam ullam, quod odio tempora excepturi facere beatae nobis itaque inventore possimus eaque dignissimos, repellat, tempore atque quae repudiandae temporibus maiores?</p>
      <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto gap-4'>
        <input type="text" onChange={(e) => setQuery(e.target.value)}
        placeholder='Find your dream jobs' className='outline-none border-none w-full'/>

      <Button onClick={searchJobHandler} className='cursor-pointer rounded-r-full bg-red-600'><Search className='h-5 w-5'/></Button>
      </div>
      </div>
    </div>
  )
}

export default HeroSection