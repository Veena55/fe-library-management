import { UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBook = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        author: '',
        publications: '',
        quantity: '',
        year: ''
    });
    const { id } = useParams();
    const fetchbookDetails = async () => {
        const response = await axios.get(`http://localhost:5000/book/edit/${id}`);
        return response.data;
    }

    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['edit_book'], queryFn: fetchbookDetails,
        onSuccess: (data) => {
            setData({
                name: data.name,
                author: data.author,
                publications: data.publications,
                quantity: data.quantity,
                year: data.year
            })
        }
    });
    if (isError) {
        toast.error("Oops something went wrong!!");
    }

    const mutation = useMutation((formData) =>
        axios.put(`http://localhost:5000/book/edit_data/${id}`, formData, {
        }), {
        onSuccess: () => {
            toast.success("Book Record Edited!!");
            // window.location.href = "/book/all";
            navigate("/book/all");

        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(data);
    };
    if (isError) return <div>Error loading Book details.</div>;
    return (
        <form className='mx-auto my-10' onSubmit={handleSubmit}>
            <div className="bg-white p-5">
                <div className="border-b border-gray-900/10 px-5 pb-10">
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">Edit details of <span className='capitalize font-bold text-lg underline underline-offset-2'> {book && book.name} </span></h2>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Enter Name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={data.name}
                                            onChange={handleChangeData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                    Author
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            name="author"
                                            type="text"
                                            placeholder="Enter Author"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={data.author}
                                            onChange={handleChangeData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                    Publications
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            name="publications"
                                            type="text"
                                            placeholder="Enter Publications"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={data.publications}
                                            onChange={handleChangeData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            name="quantity"
                                            type="number"
                                            placeholder="Enter Publications"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={data.quantity}
                                            onChange={handleChangeData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                    Year
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            name="year"
                                            type="number"
                                            placeholder="Enter Year"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={data.year}
                                            onChange={handleChangeData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to="/book/all" type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={mutation.isLoading && true}
                    >
                        Edit {mutation.isLoading && <span>
                            <BiLoaderCircle />
                        </span>}
                    </button>
                </div>
            </div>
        </form >
    );
}

export default EditBook;
