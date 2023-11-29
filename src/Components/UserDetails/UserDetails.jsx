
import PropTypes from 'prop-types';


const UserDetails = ({ userDetails, handleUserDeactivate, handleUserActive }) => {

    return (
        <>
            <div className=" add-shadow bg-[#fff] p-4 text-[#233255CC] mr-4 h-fit rounded-lg">


                <h1 className="text-xl font-medium mb-6 text-center">Member Details</h1>
                <div className={`user-details ${!userDetails && 'hidden'}`}>
                    <div className="avatar flex justify-center mb-3">
                        <div className="w-24 mask mask-squircle">

                            <img src={`${userDetails?.user_details?.profile_img}`} />
                        </div>
                    </div>
                    <p className="text-[10px] uppercase mb-1">Name</p>
                    <h1 className="text-[15px] uppercase mb-6">{userDetails?.user_details?.fullName}</h1>

                    <p className="text-[10px] uppercase mb-1">email</p>
                    <h1 className="text-[15px] uppercase mb-6">{userDetails?.user_details?.email}</h1>

                    <p className="text-[10px] uppercase mb-1">phone</p>
                    <h1 className="text-[15px] uppercase mb-3">{userDetails?.user_details?.phone_no}</h1>

                    <div className={`rounded-lg mb-6 py-2 px-2 ${userDetails?.user_accounts?.due_status ? 'bg-red-100' : 'bg-green-100'}`}>
                        <h1 className="uppercase text-[13px] text-[#233255CC] font-bold text-center mb-3">User Account</h1>
                        <table className="w-full text-[13px]">
                            <tr>
                                <td className=" w-40"><p className="font-medium  text-[13px]">Total Meal:</p></td>
                                <td><span className="font-extrabold">{userDetails?.user_accounts?.total_meal_monthly}</span></td>
                            </tr>
                            <tr>
                                <td className=" w-40"><p className="font-medium  text-[13px]">Total Pay:</p></td>
                                <td><span className="font-extrabold">{userDetails?.user_accounts?.total_taka_submit}</span></td>
                            </tr>
                            <tr>
                                <td><p className="font-medium  text-[13px]">Meal Cost:</p></td>
                                <td><span className=" font-extrabold">{userDetails?.user_accounts?.meal_cost_monthly}</span></td>
                            </tr>
                            <tr className="border-b-[1px] border-[#2332551A]">
                                <td><p className="font-medium  text-[13px]">Extra Expenses:</p></td>
                                <td><span className=" font-extrabold">{userDetails?.user_accounts?.extra_cost.extra_cost_per_head}</span> (per person)</td>
                            </tr>

                            {userDetails?.user_accounts?.due_status ? (
                                <tr>
                                    <td className="font-medium">Balance Due: </td>
                                    <td><span className=" font-extrabold">{userDetails?.user_accounts?.due}</span></td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="font-medium">Remaining Balance: </td>
                                    <td><span className=" font-extrabold">{userDetails?.user_accounts?.remain_balance}</span></td>
                                </tr>
                            )}

                        </table>

                    </div>

                    <div className="flex justify-between">
                        <button className="border border-solid border-blue-500 border-opacity-40 px-3 py-2 uppercase text-[#233255CC] text-opacity-80 hover:bg-blue-200  shadow-md rounded-md">Details</button>
                        <button
                            onClick={() => {
                                if (userDetails?.user_details?.access_permissions?.is_active) {
                                    // User is active, call handleUserDeactivate
                                    handleUserDeactivate(userDetails?.user_details?.user_id);
                                } else {
                                    // User is not active, call handleUserActive
                                    handleUserActive(userDetails?.user_details?.user_id);
                                }
                            }}
                            className={`px-3 py-2 uppercase ${userDetails?.user_details?.access_permissions?.is_active
                                ? 'text-red-600 text-opacity-80 border-red-500 hover:bg-red-200 focus:border-red-300'
                                : 'text-green-600 text-opacity-80 border-green-500 hover:bg-green-200 focus:border-green-300'
                                } shadow-md border border-solid border-opacity-40 rounded-md`}
                            style={{
                                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                textTransform: 'uppercase',
                            }}
                        // No need for the disabled attribute in this case
                        >
                            {userDetails?.user_details?.access_permissions?.is_active
                                ? 'Deactivate'
                                : 'Activate'}
                        </button>

                    </div>

                </div>
                <div className={`user-details ${userDetails && 'hidden'}`} >
                    <div>

                        <div className="flex justify-center mt-20">
                            <img src="../../../public/nodata.png" alt="No_data_Image" />
                        </div>

                        <div className=" text-[#233255CC] font-bold text-2xl text-center mt-8">
                            <h1 className=''>Oops!! Sorry, <br /> Click Member to content here!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

UserDetails.propTypes = {
    userDetails: PropTypes.object.isRequired,
    handleUserActive: PropTypes.func.isRequired,
    handleUserDeactivate: PropTypes.func.isRequired,
    // userId: PropTypes.number.isRequired,
}

export default UserDetails;