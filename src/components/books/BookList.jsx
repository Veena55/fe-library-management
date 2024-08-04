import axios from 'axios';
import React, { useState } from 'react';
import { BiLoaderCircle, BiSolidEdit, BiSort } from 'react-icons/bi';
import { BsPlusLg, BsTrash2Fill } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookList = () => {
    const queryClient = useQueryClient();
    const [flag, setFlag] = useState(true);

    const fetchAll = async () => {
        const response = await axios.get("http://localhost:5000/book/all");
        return response.data;
    }

    const { data: books, isLoading, isError } = useQuery({ queryKey: ['all_books'], queryFn: fetchAll });
    if (isError) {
        toast.error("Oops something went wrong!!");
    }
    console.log(books);

    const mutation = useMutation((id) => axios.delete(`http://localhost:5000/book/delete/${id}`), {
        onSuccess: () => {
            // Invalidate the query to refetch data
            queryClient.invalidateQueries(["all_books"]);
            toast.success("Deleted Successfully!!")
        },
        onError: (error) => {
            toast.error("Unable to delete!!", error)
        }
    });

    const handleDelete = async (id) => {
        mutation.mutate(id);
    }


    const sortRecords = () => {
        var sortedBooks = [...books];
        sortedBooks.sort((a, b) => {
            if (flag && (a.name || '').toLowerCase() < (b.name || '').toLowerCase()) {
                return -1;
            }
            if (flag && (a.name || '').toLowerCase() > (b.name || '').toLowerCase()) {
                return 1;
            }
            if (!flag && (a.name || '').toLowerCase() > (b.name || '').toLowerCase()) {
                return -1;
            }
            if (!flag && (a.name || '').toLowerCase() < (b.name || '').toLowerCase()) {
                return 1;
            }
            return 0;
        });
        queryClient.setQueryData('all_books', sortedBooks);
        setFlag(!flag);
    }

    return (
        <>
            <div className='p-3 flex justify-between items-center'>
                <h3 className='font-bold text-xl'>All Books</h3>
                <Link to='/book/add' className='bg-indigo-600 hover:bg-indigo-500 hover:transition-all hover:scale-105 hover:duration-500 text-white py-2 px-3 shadow-md rounded-md flex gap-2 items-center'>
                    <BsPlusLg size={20} />New Book
                </Link>
            </div>
            <div className='clear-end'></div>
            <hr className='mb-3 border-t-[#bababa]' />
            <div className="bg-white rounded-xl shadow-md max-h-screen overflow-auto">
                <div className='grid grid-cols-6 p-5'>
                    <div>
                        <h5 className="font-semibold">Sr.No.</h5>
                    </div>
                    <div>
                        <h5 className="font-semibold flex items-center gap-1">Name <span><BiSort className='text-gray-500 cursor-pointer' onClick={sortRecords} /></span></h5>
                    </div>
                    <div>
                        <h5 className="font-semibold">Author</h5>
                    </div>
                    <div>
                        <h5 className="font-semibold">Publications</h5>
                    </div>
                    <div>
                        <h5 className="font-semibold">Year</h5>
                    </div>
                    <div>
                        <h5 className="font-semibold">Action</h5>
                    </div>
                </div>
                <hr className='border-t-[#5058b2] mx-2' />
                {/* Values */}
                {isLoading ?
                    <div className='flex justify-center py-5 text-indigo-600'>
                        <BiLoaderCircle className='rotate' size={30} />
                    </div>
                    : !books ?
                        <p className='text-center text-red-500 py-5'>No Records Found</p>
                        : books.map((element, index) => (
                            <div className='grid grid-cols-6 p-5' key={index}>
                                <div>
                                    <h5>{index + 1}</h5>
                                </div>
                                <div>
                                    <h5>{element.name}</h5>
                                </div>
                                <div>
                                    <h5>{element.author}</h5>
                                </div>
                                <div>
                                    <h5>{element.publications}</h5>
                                </div>
                                <div>
                                    <h5>{element.year}</h5>
                                </div>
                                <div className='flex gap-3'>
                                    <Link to={`/book/edit/${element.id}`} className='flex items-center px-3 py-2 bg-green-50 text-green-800 rounded-lg'>
                                        <BiSolidEdit />
                                    </Link>
                                    <button className='flex items-center px-3 py-2 bg-red-50 text-red-500 rounded-lg' onClick={() => handleDelete(element.id)}>
                                        <BsTrash2Fill />
                                    </button>
                                </div>
                            </div>
                        )
                        )}
            </div>
        </>
    );
};

export default BookList;
