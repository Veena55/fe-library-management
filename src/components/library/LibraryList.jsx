import React from 'react'
import { BiSolidEdit, BiSort } from 'react-icons/bi'
import { BsPlusLg, BsTrash2Fill } from 'react-icons/bs'

const LibraryList = () => {
    return (
        <>
            <div className='p-3 flex justify-between items-center'>
                <h3 className='font-bold text-xl'>All Library</h3>
                <button className='bg-[#5058b2] text-white py-2 px-3 shadow-md rounded-md flex gap-2 items-center'><BsPlusLg size={20} />New Library</button>
            </div>
            <div className='clear-end'></div>
            <hr className='mb-3 border-t-[#bababa]' />
            <div className="bg-white rounded-xl shadow-md">
                <div className='grid grid-cols-6 p-5'>
                    <div>
                        <h5 className="font-semibold">Sr.No.</h5>
                    </div>

                    <div>
                        <h5 className="font-semibold flex items-center gap-1">Student Name <span><BiSort className='text-gray-500' /></span></h5>
                    </div>

                    <div>
                        <h5 className="font-semibold">Book Name</h5>
                    </div>

                    <div>
                        <h5 className="font-semibold">Sart Date</h5>
                    </div>

                    <div>
                        <h5 className="font-semibold">End Date</h5>
                    </div>

                    <div>
                        <h5 className="font-semibold">Action</h5>
                    </div>
                </div>
                <hr className='border-t-[#5058b2] mx-2' />
                {/* Values */}
                <div className='grid grid-cols-6 p-5'>
                    <div>
                        <h5>1.</h5>
                    </div>
                    <div>
                        <h5>Student 1</h5>
                    </div>
                    <div>
                        <h5>Book 1</h5>
                    </div>
                    <div>
                        <h5>Picture 1</h5>
                    </div>
                    <div>
                        <h5>Video 1</h5>
                    </div>

                    <div className='flex gap-3'>
                        <button className='flex items-center px-3 py-2 bg-green-50 text-green-800 rounded-lg' title="Edit"><BiSolidEdit /></button>
                        <button className='flex items-center px-3 py-2 bg-red-50 text-red-500  rounded-lg' title="Delete"><BsTrash2Fill /></button>
                    </div>
                </div>

            </div>
        </>

    )
}

export default LibraryList