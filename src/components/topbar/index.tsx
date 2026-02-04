// import { Input } from "postcss";
'use client';
import { SetStateAction, useState } from 'react';
const TopBar = () => {
    const [inputValue, setInputValue] = useState("")
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    }
    return (
        <div className='flex items-center justify-between w-full h-16 px-6 bg-[rgb(var(--bg))] border-b border-[rgb(var(--border))] mb-6'>
            <div className='flex-1 max-w-md'>
                <input
                    className='w-full px-4 py-2 rounded-lg bg-[rgb(var(--border))] border-none focus:ring-2 focus:ring-[rgb(var(--primary))] text-[rgb(var(--text))] placeholder:text-gray-500'
                    placeholder="Search..."
                    name="Search"
                    value={inputValue}
                    onChange={handleChange}
                />
            </div>
            <div className='flex items-center gap-6'>
                <div className='relative cursor-pointer hover:text-[rgb(var(--primary))] transition-colors'>
                    <span className="text-sm font-medium">Notifications</span>
                    <span className="absolute -top-1 -right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                </div>
                <div className='flex items-center gap-3 cursor-pointer group'>
                    <div className='w-8 h-8 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white font-bold'>
                        JD
                    </div>
                    <span className='font-medium group-hover:text-[rgb(var(--primary))] transition-colors'>John Doe</span>
                </div>
            </div>
        </div>
    )
}

export default TopBar;