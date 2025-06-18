import { IoIosSearch } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";

function Search () {
    return (
        <>
            <div className="h-[91vh]  flex flex-col items-center justify-center">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-6">Search Anything</h1>
                    <p className="text-center text-gray-600 mb-4">Type your query below to search across the web.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] border-2 border-[#0D92F4] flex flex-row items-center justify-between gap-4">
                    <div>
                        <IoIosSearch size={33}/>
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Enter your Query"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <MdKeyboardVoice size={33}/>
                        <IoMdSend size={33}/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Search;