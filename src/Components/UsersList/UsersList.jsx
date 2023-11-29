
import Table from '../../Table/Table';
import './usersList.css'
import { NavLink } from "react-router-dom";
import base_url from '../../../public/config';
import { useEffect, useState } from 'react';
import MonthYearPicker from '../MonthYear/MonthYearPicker';
import { ClockLoader } from "react-spinners";



const UsersList = () => {


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    const handleDatePicker = (p_month, p_year) => {
        setYear(p_year)
        setMonth(p_month)
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${base_url}/api/user/user-list/`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // Code to be executed regardless of success or failure
            setLoading(false);
        }
    };
    // console.log(users);
    return (
        <div className="border-[#F8F8F8] rounded-tl-2xl rounded-tr-2xl bg-[#F8F8F8]">
            <div className="flex justify-end items-center gap-4 p-4">
                <MonthYearPicker
                    handleDatePicker={handleDatePicker}
                ></MonthYearPicker>
                <button className="h-custom btn w-28 bg-gray-200 hover:bg-gray-300">PRINT</button>
                <button className="h-custom btn bg-[#233255] text-[#fff]">CREATE MEMBER</button>
            </div>

            <p className='border-b-2 border-[#2332551A]'></p>

            <div className="text-[#233255E5] font-bold uppercase flex gap-7 px-4">

                <NavLink className="py-3">All</NavLink>
                <NavLink className="py-3">Current Members</NavLink>
                <NavLink className="py-3">previous Members</NavLink>

            </div>
            <p className='border-b-2 border-[#2332551A]'></p>
            <div className='bg-[#FFF]'>
                <p className='font-medium text-[14px] text-[#2332557F] py-5 px-4 pb-0'>Showing 1 - 10 of 70 students</p>

                <Table
                    loadingForTable={loading}
                    users={users}
                    month={month}
                    year={year}
                    fetchData={fetchData}

                ></Table>
            </div>
            <h1>Users: {users.length}</h1>

        </div>
    );
};

export default UsersList;