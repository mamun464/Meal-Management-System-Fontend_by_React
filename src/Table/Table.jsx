import { useState } from "react";
import TableRow from "./TableRow";
import PropTypes from 'prop-types';
import base_url from "../../public/config";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TableRow.css';
import UserDetails from './../Components/UserDetails/UserDetails';
import { ClockLoader } from "react-spinners";



const Table = ({ users, month, year, fetchData }) => {
    const userDetails = useLoaderData()



    const [userId, setUsersId] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();
    // const [url, setUrl] = useState("");

    const handleUser = (id) => {
        console.log("Clocked: " + id);
        setUsersId(id);
        // console.log("Usaer id: " + userId + "  Get Id" + id);
        // console.log('Clicks row with month:', month)
        // console.log('Clicks row with year', year)
        const params = `${id}/${month}/${year}`;
        navigate(`/users/${params}`);

    };

    const handleUserDeactivate = (userId) => {
        // const params = `${userId}`;
        setLoading(true);
        fetch(`${base_url}/api/user/status-change/${userId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    // User deactivated successfully
                    // You may want to update your UI or perform any other actions
                    navigate(`/users/`);
                    fetchData()
                    toast.warn('Deactivated Successfully', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(`User with ID ${userId} deactivated successfully`);
                } else if (response.status === 404) {
                    // User was already deactivated
                    // You may want to show a message to the user
                    toast.error(`Error: ${response.status}: Page Not Found!`, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(`User with ID ${userId} is already deactivated`);
                } else {
                    // Handle other error cases
                    response.json().then(data => {
                        // Log or print the error message and status
                        console.error(`Error: ${data.detail}`);
                        console.error(`Status: ${response.status}`);

                        // Show a toast message with the error details
                        toast.error(`Error: ${data.detail}`, {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
                }
            })
            .catch(error => {
                // Handle network errors or other issues
                console.error('Error:', error);
                toast.error('Network error or other issues', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

            .finally(() => {
                setLoading(false);
            });

    }

    const handleUserActive = (userId) => {
        setLoading(true);

        fetch(`${base_url}/api/user/status-change/${userId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    // User deactivated successfully
                    // You may want to update your UI or perform any other actions
                    navigate(`/users/`);
                    fetchData()
                    toast.success('Activated Successfully', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(`User with ID ${userId} Activated successfully`);
                } else if (response.status === 404) {
                    // User was already deactivated
                    // You may want to show a message to the user
                    toast.error(`Error: ${response.status}: Page Not Found!`, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(`User with ID ${userId} is already Activated`);
                } else {
                    // Handle other error cases
                    response.json().then(data => {
                        // Log or print the error message and status
                        console.error(`Error: ${data.detail}`);
                        console.error(`Status: ${response.status}`);

                        // Show a toast message with the error details
                        toast.error(`Error: ${data.detail}`, {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
                }
            })
            .catch(error => {
                // Handle network errors or other issues
                console.error('Error:', error);
                toast.error('Network error or other issues', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })

            .finally(() => {
                setLoading(false);
            });
    }




    return (
        <div className="flex  gap-2">
            <div className="add-shadow w-3/4 p-4 bg-[##F8F8F8]">

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
            <div className="flex-1 bg-[#FAFAFA] ">
                {!loading && (
                    <UserDetails
                        userDetails={userDetails}
                        handleUserDeactivate={handleUserDeactivate}
                        handleUserActive={handleUserActive}
                        userId={userId}
                    />
                )}
                <div className="w-full mt-24 items-center flex justify-center">
                    <ClockLoader
                        color="#4fa94d"
                        loading={loading}
                        // cssOverride={override}
                        size={80}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div >

    );
};

Table.propTypes = {
    users: PropTypes.array.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired,
}
export default Table;