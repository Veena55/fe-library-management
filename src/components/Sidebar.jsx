import React from 'react'
import { BiBookContent } from 'react-icons/bi'
import { FaBarsStaggered } from 'react-icons/fa6'
import { GiBookshelf } from 'react-icons/gi'
import { PiStudentFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-full h-screen bg-white p-5'>
            <div className='p-5 flex justify-between items-center text-purple-600'>
                <h1 className='text-2xl font-bold '>LOGO</h1>
                <FaBarsStaggered size={20} />
            </div>
            <hr className='p-2 border-t-purple-500' />
            <div className='p-3 mt-5 flex items-center gap-3 text-purple-600  rounded-2xl'>
                <PiStudentFill size={20} />
                <Link to='/student/all' className='text-lg'>Students</Link>
            </div>
            {/* <hr /> */}
            <div className='p-3 mt-8 flex items-center gap-3 text-purple-600  rounded-2xl'>
                <BiBookContent />
                <Link to='/book/all' className='text-lg'>Books</Link>
            </div>
            <div className='p-3 mt-8 flex items-center gap-3 text-purple-600 bg-[#F9F9F9] rounded-2xl'>
                <GiBookshelf />
                <Link to='/library/all' className='text-lg'>Library</Link>
            </div>

        </div>
    )
}

export default Sidebar