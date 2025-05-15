import React,{useState,useEffect} from 'react';
import { RadioGroup, RadioGroupItem,  } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice.js'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "50-1lakh", "1lakh to 5lakh"]
  }
];

const filterCard = () => {
  const[selectedValue, setSelectedValue] = useState('')
const dispatch = useDispatch()

  const handleChange = (value) =>{
    setSelectedValue(value)
  }

  useEffect(() =>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-medium text-lg'>Filter Jobs</h1>
      <hr className='mt-3 ' />
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div  className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
};

export default filterCard;