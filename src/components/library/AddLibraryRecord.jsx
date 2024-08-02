import { CalendarDateRangeIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/solid'

const AddLibraryRecord = () => {
    return (
        <form className='mx-auto my-10'>
            <div className=" bg-white p-5">
                <div className="border-b border-gray-900/10 px-5 pb-10">
                    <h2 className="text-base font-semibold leading-7 text-indigo-500">Add New Record</h2>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="sname" className="block text-sm font-medium leading-6 text-gray-900">
                                    Student Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset p-1 focus-within:ring-indigo-600 ">
                                        <select
                                            id="sname"
                                            name="sname"
                                            type="text"
                                            placeholder="Enter Name"
                                            autoComplete="sname"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        >
                                            <option selected disabled>-- Select --</option>
                                            <option>Option1</option>
                                            <option>Option2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="sm:col-span-4">
                                <label htmlFor="sclass" className="block text-sm font-medium leading-6 text-gray-900">
                                    Book
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset p-1 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <select
                                            id="sname"
                                            name="sname"
                                            type="text"
                                            placeholder="Enter Name"
                                            autoComplete="sname"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        >
                                            <option selected disabled>-- Select --</option>
                                            <option>Option1</option>
                                            <option>Option2</option>
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
                                <input type="date" id="start-date" className='border p-1 rounded-md' />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                End Date
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <CalendarDateRangeIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                <input type="date" id="end-date" className='border p-1 rounded-md' />
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

export default AddLibraryRecord;
