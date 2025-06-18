import { BsStars } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
    return (
        <>
            <div className="h-[9vh] bg-black text-white flex items-center justify-between px-4 border-b-6 border-[#05409f]">
                <div className="flex items-center flex-row gap-3">
                    <BsStars size={35} />
                    <span className="text-2xl font-mono ml-2">GLobal Search</span>
                </div>
                <div className="flex items-center flex-row gap-3">
                    <FaSignOutAlt size={35} />
                    <FaSignInAlt size={35} />
                </div>
            </div>
        </>
    )
}

export default Navbar