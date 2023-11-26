
import './usersList.css'
import { NavLink } from "react-router-dom";
const UsersList = () => {
    return (
        <div className="border-[#F8F8F8] rounded-tl-2xl rounded-tr-2xl bg-[#F8F8F8]">
            <div className="flex justify-end gap-4 p-4">
                <button className="btn">PRINT</button>
                <button className="btn bg-[#233255] text-[#fff]">CREATE MEMBER</button>
            </div>

            <p className='border-b-2 border-[#2332551A]'></p>

            <div className="text-[#233255E5] font-bold uppercase flex gap-7 px-4">

                <NavLink className="py-3">All</NavLink>
                <NavLink className="py-3">Current Members</NavLink>
                <NavLink className="py-3">previous Members</NavLink>

            </div>
            <p className='border-b-2 border-[#2332551A]'></p>

        </div>
    );
};

export default UsersList;