import { IoBagOutline, IoFilterOutline } from "react-icons/io5"

interface NavigationProps {
    toggleSidebar: () => void;
}

function Navigation({ toggleSidebar }: NavigationProps) {
    return (
        <div className="mt-[2rem] container w-[90%] ml-[5rem] flex justify-between items-center">
            <h1 className="logo">
                <IoFilterOutline onClick={toggleSidebar} size={27} className="ml-[4rem] cursor-pointer" />
            </h1>

            <nav className="cursor-pointer flex list-none items-center mr-[2rem] space-x-4">
                <li>Search</li>
                <li>Help</li>
                <li>My Account</li>
            </nav>

            <IoBagOutline size={24} className="cursor-pointer"/>
        </div>
    )
}

export default Navigation