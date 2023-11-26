
import PropTypes from 'prop-types';
import { FaPersonCircleCheck } from "react-icons/fa6"
import { FaPersonCircleXmark } from "react-icons/fa6";
import base_url from './../../public/config';
import './TableRow.css';
import { useState } from 'react';
const TableRow = ({ user, handleUser }) => {
    const { id, fullName, email, phone_no, user_profile_img, is_active, is_manager, } = user;
    const [clickedRow, setClickedRow] = useState(null);

    const handleClickEffect = () => {
        handleUser(id);

        // Toggle the class based on the current state
        setClickedRow((prevClickedRow) => (prevClickedRow === id ? null : id));


    };

    return (
        <>
            {/* row 1 */}
            <tr
                className={`table-row ${clickedRow === id ? 'clicked-row' : ''}`}
                data-id={id}
                onClick={handleClickEffect}>
                <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={`${base_url}${user_profile_img}`} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{fullName}</div>
                            {is_manager && (
                                <span className="badge badge-ghost badge-sm bg-green-500 text-white px-2 py-[10px]">Manager</span>
                            )}
                        </div>
                    </div>
                </td>
                <td>
                    {email}
                    <br />

                </td>
                <td>{phone_no}</td>
                <th className="">
                    {is_active ? (
                        <FaPersonCircleCheck className='w-1/2 text-green-600 ' />
                    ) : (
                        <FaPersonCircleXmark className='w-1/2 text-red-600 ' />
                    )}
                </th>
            </tr>

            {/* <h1>{user_profile_img}</h1> */}
        </>
    );
};

TableRow.propTypes = {
    user: PropTypes.object.isRequired,
    handleUser: PropTypes.func.isRequired,

}

export default TableRow;