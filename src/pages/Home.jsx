import React from 'react'
import { BiBookOpen } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='h-screen w-full bg-indigo-900 flex justify-center items-center'>
            <div>
                <BiBookOpen size={200} className='text-white mx-auto' />
                <h1 className='text-white text-3xl text-center'>Library Management System</h1>
                <div className="text-center mt-10">
                    <Link to="/student/all" className='bg-white px-5 py-3 rounded-full font-medium hover:transition-all hover:bg-indigo-200 hover:scale-105 hover:duration-700'>Get Started</Link>
                </div>
            </div>
        </div>
    )
}

export default Home