import { UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/solid'

const AddStudent = () => {
    return (
        <form className='mx-auto my-10'>
            <div className=" bg-white p-5">
                <div className="border-b border-gray-900/10 px-5 pb-10">
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">Add New Student</h2>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="sname" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            id="sname"
                                            name="sname"
                                            type="text"
                                            placeholder="Enter Name"
                                            autoComplete="sname"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="sclass" className="block text-sm font-medium leading-6 text-gray-900">
                                    Class
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            id="sclass"
                                            name="sclass"
                                            type="text"
                                            placeholder="Enter Class"
                                            autoComplete="sname"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                <input type="file" hidden id="photo" />
                                <label
                                    htmlFor="photo"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Upload
                                </label>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <p className="block text-sm font-medium leading-6 text-gray-900">
                                Video
                            </p>
                            <div className="mt-2 flex items-center gap-x-3">
                                <VideoCameraIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                <label htmlFor="video"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Upload
                                </label>
                                <input type="file" hidden
                                    id="video" />
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
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>

        </form>
    )
}

export default AddStudent;
