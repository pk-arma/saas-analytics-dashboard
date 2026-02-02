// import { Input } from "postcss";
'use client';
import {SetStateAction, useState} from 'react';
const TopBar = ()=>{
    const [inputValue,setInputValue] = useState("")
    const handleChange =(e: { target: { value: SetStateAction<string>; }; })=>{
        setInputValue(e.target.value);
    }
    return (
        <div className=' flex w-full rounded-md h-10 mb-10'>
        <input className='bg-[rgb(var(--color-dark-navy))] w-full  rounded-xl h-15 border-amber-300' name="Search" value={inputValue} onChange={handleChange}/>
        <div className='flex'>
            <div>
           Notification     
            </div>
            <div>
profile
            </div>
        </div>
        
        </div>
    )
}

export default TopBar;