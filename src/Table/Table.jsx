import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import PropTypes from 'prop-types';
import base_url from "../../public/config";
import { useLoaderData, useNavigate } from "react-router-dom";
import './TableRow.css';



const Table = ({ users }) => {
    const userDetails = useLoaderData()
    // console.log(userDetails2)
    let year = 2023
    let month = 8
    const [userId, setUsersId] = useState(null);
    // const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();
    // const [url, setUrl] = useState("");

    const handleUser = (id) => {
        console.log("Clocked: " + id);
        setUsersId(userId)
        const params = `${id}/${year}/${month}`;
        navigate(`/users/${params}`);

    };


    return (
        <div className="flex gap-2">
            <div className="add-shadow w-4/5 p-4 bg-[##F8F8F8]">

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-[#F8F8F8]">
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>EMAIL</th>
                                <th>PHONE NO.</th>
                                <th>MEMBER STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => <TableRow
                                    key={user.id}
                                    user={user}
                                    handleUser={handleUser}
                                ></TableRow>)
                            }

                            {/* row 2 */}

                            {/* row 3 */}

                            {/* row 4 */}

                        </tbody>
                        {/* foot */}


                    </table>
                </div>
            </div >
            <div className="flex-1 bg-[#FAFAFA]">
                <div className=" add-shadow bg-[#fff] p-4 text-[#233255CC] mr-4 h-fit rounded-lg">


                    <h1 className="text-xl font-medium mb-6 text-center">Member Details</h1>
                    <div className="avatar flex justify-center mb-3">
                        <div className="w-24 mask mask-squircle">

                            <img src={`${base_url}${userDetails?.user_details.profile_img}`} />
                        </div>
                    </div>
                    <p className="text-[10px] uppercase mb-1">Name</p>
                    <h1 className="text-[15px] uppercase mb-6">{userDetails?.user_details.fullName}</h1>

                    <p className="text-[10px] uppercase mb-1">email</p>
                    <h1 className="text-[15px] uppercase mb-6">{userDetails?.user_details.email}</h1>

                    <p className="text-[10px] uppercase mb-1">phone</p>
                    <h1 className="text-[15px] uppercase mb-3">{userDetails?.user_details.phone_no}</h1>

                    <div className={`rounded-lg mb-6 py-2 px-2 ${userDetails?.user_accounts.due_status ? 'bg-red-100' : 'bg-green-100'}`}>
                        <h1 className="uppercase text-[13px] text-[#233255CC] font-semibold text-center mb-3">User Account</h1>
                        <table className="w-full text-[13px]">
                            <tr>
                                <td className=" w-40"><p className="font-medium  text-[13px]">Total Pay:</p></td>
                                <td><span className="font-extrabold">{userDetails?.user_accounts.total_taka_submit}</span></td>
                            </tr>
                            <tr>
                                <td><p className="font-medium  text-[13px]">Meal Cost:</p></td>
                                <td><span className=" font-extrabold">{userDetails?.user_accounts.meal_cost_monthly}</span></td>
                            </tr>
                            <tr className="border-b-[1px] border-[#2332551A]">
                                <td><p className="font-medium  text-[13px]">Extra Expenses:</p></td>
                                <td><span className=" font-extrabold">{userDetails?.user_accounts.extra_cost.extra_cost_per_head}</span> (per person)</td>
                            </tr>

                            {userDetails?.user_accounts.due_status ? (
                                <tr>
                                    <td className="font-medium">Balance Due: </td>
                                    <td><span className=" font-extrabold">{userDetails?.user_accounts.due}</span></td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="font-medium">Remaining Balance: </td>
                                    <td><span className=" font-extrabold">{userDetails?.user_accounts.remain_balance}</span></td>
                                </tr>
                            )}

                        </table>
                        {/* <div className="grid grid-cols-3  gap-1">
                            <div className="col-span-2 pl-5">
                                <p className="font-medium  text-[13px]">Total Pay: <span className="text-base font-semibold">{userDetails?.user_accounts.total_taka_submit}</span></p>
                                <p className="font-medium  text-[13px]">Meal Cost: <span className="text-base font-semibold " >{userDetails?.user_accounts.meal_cost_monthly}</span></p>
                                <p className="font-medium  text-[13px]">Extra Expenses: <span className="text-base font-semibold">{userDetails?.user_accounts.extra_cost.extra_cost_per_head}</span></p>

                            </div>

                            <div>


                            </div>

                        </div> */}
                        {/* <p className='border-b-2 border-[#2332551A]'></p> */}
                        {/* <div className="pl-6">
                            <p className="font-medium text-[13px]">
                                {userDetails?.user_accounts.due_status ? (
                                    <>Balance Due: <span className="text-base font-semibold">{userDetails?.user_accounts.due}</span></>
                                ) : (
                                    <>Remaining Balance: <span className="text-base font-semibold">{userDetails?.user_accounts.remain_balance}</span></>
                                )}
                            </p>
                        </div> */}
                    </div>

                    <div className="flex justify-between">
                        <button className="border border-solid border-blue-500 border-opacity-40 px-3 py-2 uppercase text-[#233255CC] text-opacity-80 hover:bg-blue-200  shadow-md rounded-md">Details</button>
                        <button
                            className="px-3 py-2 uppercase text-red-600 text-opacity-80 shadow-md border border-solid border-red-500 border-opacity-40  hover:bg-red-200 focus:border-red-300 rounded-md"
                            style={{
                                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                textTransform: 'uppercase',
                            }}
                        >
                            Delete
                        </button>
                    </div>

                    {/* <h1 className="text-[15px] uppercase mb-6">{userDetails.user_details.fullName}</h1> */}
                </div>
            </div>
        </div >
    );
};

Table.propTypes = {
    users: PropTypes.array.isRequired,
}
export default Table;