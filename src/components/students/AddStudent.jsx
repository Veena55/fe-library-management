import { UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudent = () => {
    const [preview, setPreview] = useState({ img: '', video: '' });
    const [data, setData] = useState({
        name: '',
        class: '',
        photo: null,
        video: null
    });
    const navigate = useNavigate();

    const mutation = useMutation((formData) =>
        axios.post('http://localhost:5000/students/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }), {
        onSuccess: () => {
            toast.success("New Student Added!!");
            navigate("/student/all");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const handleChangeData = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setData(prevData => ({
                ...prevData,
                [name]: file
            }));
            if (name === 'photo') {
                const previewURL = URL.createObjectURL(file);
                setPreview(prevState => ({ ...prevState, img: previewURL }))
            }
            if (name === 'video') {
                const previewURL = URL.createObjectURL(file);
                setPreview(prevState => ({ ...prevState, video: previewURL }))
            }
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('class', data.class);
        if (data.photo) formData.append('image', data.photo);
        if (data.video) formData.append('video', data.video);
        console.log(data.photo);

        mutation.mutate(formData);
    };

    return (
        <form className='mx-auto my-10' onSubmit={handleSubmit}>
            <div className="bg-white p-5">
                <div className="border-b border-gray-900/10 px-5 pb-10">
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">Add New Student</h2>
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
                                            onChange={handleChangeData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                    Class
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            name="class"
                                            type="text"
                                            placeholder="Enter Class"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={handleChangeData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <p className="block text-sm font-medium leading-6 text-gray-900">
                                Photo
                            </p>
                            <div className="mt-2 flex items-center gap-x-3">
                                <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                <input type="file" hidden id="photo" name="photo" onChange={handleChangeData} />
                                <label
                                    htmlFor="photo"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Upload
                                </label>
                                {/* Image Preview */}
                                {preview.img && <img src={preview.img} width="50" />}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <p className="block text-sm font-medium leading-6 text-gray-900">
                                Video
                            </p>
                            <div className="mt-2 flex items-center gap-x-3">
                                <VideoCameraIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                <input type="file" hidden id="video" name="video" onChange={handleChangeData} />
                                <label htmlFor="video"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Upload
                                </label>
                                {/* Video Preview */}
                                {preview.video && <video width="100" height="100" controls>
                                    <source src={preview.video} type="video/mp4"></source>
                                </video>}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={mutation.isLoading && true}
                    >
                        Save {mutation.isLoading && <span>
                            <BiLoaderCircle />
                        </span>}
                    </button>
                </div>
            </div>
        </form >
    );
}

export default AddStudent;
