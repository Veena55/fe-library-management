import { BookOpenIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { BiBookContent, BiBookOpen } from 'react-icons/bi'
import { FaBarsStaggered } from 'react-icons/fa6'
import { GiBookshelf } from 'react-icons/gi'
import { PiStudentFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const menu = (window.location.pathname).split('/')[1];
    const [active, setActive] = useState(menu);



    return (
        <div className='w-full h-screen bg-white p-5' id='sidebar'>
            <div className='p-5 flex justify-between items-center text-indigo-600 relative'>
                <h1 className='font-bold flex gap-2 items-center'><BiBookOpen size={40} /> <p className='text-2xl' id='logo_title'>Library</p></h1>
                {/* <FaBarsStaggered size={20} id="toggleBtn" className='cursor-pointer absolute right-0' onClick={toggleSideBar} /> */}
            </div>
            <hr className='p-2 border-t-indigo-500' />
            <div className={`p-2 mt-5 flex items-center gap-3 rounded-lg ${active == 'student' ? "bg-indigo-700 shadow-md shadow-gray-400 text-white" : "text-indigo-600"}`}>
                <PiStudentFill className='ml-2' size={25} />
                <Link to='/student/all' className='text-lg' onClick={() => setActive("student")}>Students</Link>
            </div>
            {/* <hr /> */}
            <div className={`p-2 mt-5 flex items-center gap-3 rounded-lg ${active == 'book' ? "bg-indigo-700 shadow-md shadow-gray-400 text-white" : "text-indigo-600"}`}>
                <BiBookContent className='ml-2' size={25} />
                <Link to='/book/all' className='text-lg' onClick={() => setActive("book")}>Books</Link>
            </div>
            <div className={`p-2 mt-5 flex items-center gap-3 rounded-lg ${active == "library" ? "bg-indigo-700 shadow-md shadow-gray-400 text-white" : "text-indigo-600"}`}>
                <GiBookshelf className='ml-2' size={25} />
                <Link to='/library/all' className='text-lg' onClick={() => setActive("library")}>Library</Link>
            </div>

        </div>
    )
}

export default Sidebar