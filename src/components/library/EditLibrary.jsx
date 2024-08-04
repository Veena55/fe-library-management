import { CalendarDateRangeIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditLibrary = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        studentId: "",
        bookId: "",
        startdate: "",
        enddate: ""
    });

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        if (name === 'bookId') {
            try {
                const obj = JSON.parse(value);
                if (obj.quantity === 0) {
                    console.log("Not Allowed!!");
                    toast.error("This book is not available!!");
                    return;
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
                toast.error("Invalid book data");
                return;
            }
        }
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const fetchAllStudents = async () => {
        const response = await axios.get("http://localhost:5000/library/all_students");
        return response.data;
    };

    const fetchAllBooks = async () => {
        const response = await axios.get("http://localhost:5000/book/all");
        return response.data;
    };

    const fetchRecordById = async () => {
        const response = await axios.get(`http://localhost:5000/library/edit/${id}`);
        return response.data;
    };

    const { data: library, isLoading: isLibraryLoading, isError: isLibraryError, error: libraryError } = useQuery({
        queryKey: ['library_record', id],
        queryFn: fetchRecordById,
        onSuccess: (data) => {
            setData({
                studentId: data.studentId || "",
                bookId: data.bookId || "",
                startdate: new Date(data.startdate).toISOString().split('T')[0] || "",
                enddate: new Date(data.enddate).toISOString().split('T')[0] || "",
                returndate: new Date(data.returndate).toISOString().split('T')[0] || "",
            });
        },
        onError: (err) => {
            console.error('Library Record Query Error:', err);
            toast.error("Unable to fetch Library Record");
        }
    });
    console.log(library, data);

    const { data: students, isLoading: isStudentLoading, isError: isStudentError, error: studentError } = useQuery({
        queryKey: ['all_students_list'],
        queryFn: fetchAllStudents,
        onError: (err) => {
            console.error('Students Query Error:', err);
            toast.error("Unable to fetch Students Data");
        }
    });

    const { data: books, isLoading: isBookLoading, isError: isBookError, error: bookError } = useQuery({
        queryKey: ['all_books_list'],
        queryFn: fetchAllBooks,
        onError: (err) => {
            console.error('Books Query Error:', err);
            toast.error("Unable to fetch Books Data");
        }
    });

    const mutation = useMutation((formData) =>
        axios.put(`http://localhost:5000/library/edit_data/${id}`, formData), {
        onSuccess: () => {
            toast.success("Record Edited!!");
            navigate("/library/all");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(data);
    };

    if (isLibraryLoading || isStudentLoading || isBookLoading) {
        return <div>Loading...</div>;
    }

    if (isLibraryError) {
        return <div>Error: {libraryError.message}</div>;
    }

    if (isStudentError) {
        return <div>Error: {studentError.message}</div>;
    }

    if (isBookError) {
        return <div>Error: {bookError.message}</div>;
    }

    return (
        <form className='mx-auto my-10' onSubmit={handleSubmit}>
            <div className="bg-white p-5">
                <div className="border-b border-gray-900/10 px-5 pb-10">
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">Edit Record</h2>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="studentId" className="block text-sm font-medium leading-6 text-gray-900">
                                    Select Student
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset p-1 focus-within:ring-indigo-600">
                                        <select
                                            onChange={handleChangeData}
                                            name="studentId"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={data.studentId}
                                        >
                                            <option value="" disabled>-- Select --</option>
                                            {students.map((element) => (
                                                <option key={element.id} value={element.id}>
                                                    {element.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="bookId" className="block text-sm font-medium leading-6 text-gray-900">
                                    Book
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset p-1 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <select
                                            onChange={handleChangeData}
                                            name="bookId"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={data.bookId}
                                        >
                                            <option value="" disabled>-- Select --</option>
                                            {books.map((element) => (
                                                <option key={element.id} value={JSON.stringify({ id: element.id, quantity: element.quantity })}>
                                                    {element.name} - {element.quantity ? `(${element.quantity})` : "Not Available"}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Start Date
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <CalendarDateRangeIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                <input
                                    type="date"
                                    name="startdate"
                                    className='border p-1 rounded-md'
                                    onChange={handleChangeData}
                                    value={data.startdate}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                End Date
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <CalendarDateRangeIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                <input
                                    type="date"
                                    name='enddate'
                                    className='border p-1 rounded-md'
                                    onChange={handleChangeData}
                                    value={data.enddate}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Return Date
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <CalendarDateRangeIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                <input
                                    type="date"
                                    name='returndate'
                                    className='border p-1 rounded-md'
                                    onChange={handleChangeData}
                                    value={data.returndate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to="/library/all" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Edit {mutation.isLoading && <span><BiLoaderCircle /></span>}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default EditLibrary;
