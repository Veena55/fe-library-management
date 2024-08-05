import axios from 'axios';
import React, { useState } from 'react';
import { BiLoaderCircle, BiSolidEdit, BiSort } from 'react-icons/bi';
import { BsPlusLg, BsTrash2Fill } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LibraryList = () => {
    const queryClient = useQueryClient();
    const [flag, setFlag] = useState(true);

    const fetchAll = async () => {
        const response = await axios.get("http://localhost:5000/library/all");
        return response.data;
    };

    const { data: library, isLoading, isError } = useQuery({
        queryKey: ['all_library_list'],
        queryFn: fetchAll,
        onError: () => {
            toast.error("Oops something went wrong!!");
        }
    });

    console.log(library);


    const mutation = useMutation((id) => axios.delete(`http://localhost:5000/library/delete/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries(['all_library_list']);
            toast.success("Deleted Successfully!!");
        },
        onError: (error) => {
            toast.error("Unable to delete!!", error.message);
        }
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };


    const sortRecords = () => {
        var sortedLibrary = [...library];
        sortedLibrary.sort((a, b) => {
            if (flag && (a.student.name || '').toLowerCase() < (b.student.name || '').toLowerCase()) {
                return -1;
            }
            if (flag && (a.student.name || '').toLowerCase() > (b.student.name || '').toLowerCase()) {
                return 1;
            }
            if (!flag && (a.student.name || '').toLowerCase() > (b.student.name || '').toLowerCase()) {
                return -1;
            }
            if (!flag && (a.student.name || '').toLowerCase() < (b.student.name || '').toLowerCase()) {
                return 1;
            }
            return 0;
        });
        queryClient.setQueryData('all_library_list', sortedLibrary);
        setFlag(!flag);
    }

    return (
        <>
            <div className='p-3 flex justify-between items-center'>
                <h3 className='font-bold text-xl'>All Library</h3>
                <Link to='/library/add' className='bg-indigo-600 hover:bg-indigo-500 hover:transition-all hover:scale-105 hover:duration-500 text-white py-2 px-3 shadow-md rounded-md flex gap-2 items-center'>
                    <BsPlusLg size={20} />New Record
                </Link>
            </div>
            <div className='clear-end'></div>
            <hr className='mb-3 border-t-[#bababa]' />
            <div className="bg-white rounded-xl shadow-md max-h-screen overflow-auto">
                <div className='grid grid-cols-7 p-5'>
                    <div><h5 className="font-semibold">Sr.No.</h5></div>
                    <div><h5 className="font-semibold flex items-center gap-1">Student Name <BiSort className='text-gray-500 cursor-pointer' onClick={sortRecords} /></h5></div>
                    <div><h5 className="font-semibold">Book Name</h5></div>
                    <div><h5 className="font-semibold">Start Date</h5></div>
                    <div><h5 className="font-semibold">End Date</h5></div>
                    <div><h5 className="font-semibold">Return Date</h5></div>
                    <div><h5 className="font-semibold">Action</h5></div>
                </div>
                <hr className='border-t-[#5058b2] mx-2' />
                {isLoading ? (
                    <div className='flex grid-cols-7 justify-center py-5 text-indigo-600'>
                        <BiLoaderCircle className='rotate' size={30} />
                    </div>
                ) : isError ? (
                    <p className='text-center text-red-500 py-5'>Error loading records</p>
                ) : !library?.length ? (
                    <p className='text-center text-red-500 py-5'>No Records Found</p>
                ) : (
                    library.map((element, index) => (
                        <div className='grid grid-cols-7 p-5 hover:bg-gray-100' key={element.id}>
                            <div><h5>{index + 1}</h5></div>
                            <div><h5 className='capitalize'>{element.student ? element.student.name : ''}</h5></div>
                            <div><h5>{element.book.name}</h5></div>
                            <div><h5>{new Date(element.startdate).toISOString().split('T')[0]}</h5></div>
                            <div><h5>{new Date(element.enddate).toISOString().split('T')[0]}</h5></div>
                            <div>
                                <h5>
                                    {!element.returndate ? (
                                        <span className='text-red-500'>Not Returned</span>
                                    ) : (
                                        <span className='text-green-500'>Returned <p className='text-black'> on {new Date(element.returndate).toLocaleDateString()}</p></span>
                                    )}
                                </h5>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <Link to={`/library/edit/${element.id}`} className='px-3 py-2 bg-green-50 text-green-800 rounded-lg'>
                                    <BiSolidEdit />
                                </Link>
                                <button className='px-3 py-2 bg-red-50 text-red-500 rounded-lg' onClick={() => handleDelete(element.id)}>
                                    <BsTrash2Fill />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default LibraryList;
