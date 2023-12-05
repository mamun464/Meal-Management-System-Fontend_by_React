import { useState } from "react";


const SidePanel = ({ SelectedRow }) => {
    console.log('log from SidePanel', SelectedRow);
    const [damageInput, SetdamageInput] = useState(false)
    return (
        <>
            <div className="">

                <p className="text-[10px] uppercase mb-1">Item Name</p>
                <h1 className="text-[15px] uppercase mb-6">{SelectedRow?.item?.item_name}</h1>

                <p className="text-[10px] uppercase mb-1">Variant</p>
                <h1 className="text-[15px] uppercase mb-6">{SelectedRow?.item?.variant}</h1>

                <p className="text-[10px] uppercase mb-1">Price</p>
                <h1 className="text-[15px] mb-3">{SelectedRow?.price_per_unit} <span className="uppercase">{`Taka /${SelectedRow.item?.unit}`}</span></h1>

                <div className={`my-4 ${damageInput ? '' : 'hidden'}`}>
                    <div className="form-control">
                        <label className="input-group input-group-sm">
                            <span className="text-[16px] uppercase font-medium mr-4">Damage:</span>
                            <input type="number" placeholder="" className="input input-bordered input-sm w-28" />
                            <button
                                className={` ml-3 px-1 py-1 uppercase 'text-red-600 text-opacity-80 border-green-500 hover:bg-green-200 focus:border-green-300 shadow-md border border-solid border-opacity-40 rounded-md`}
                                onClick={() => {
                                    SetdamageInput(false)

                                }}
                            >Submit</button>
                        </label>
                    </div>
                </div>

                {/* <div className={`rounded-lg mb-6 py-2 px-2 ${userDetails?.user_accounts?.due_status ? 'bg-red-100' : 'bg-green-100'}`}>
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

                </div> */}

                <div className="flex justify-between">
                    <button className="border border-solid border-blue-500 border-opacity-40 px-3 py-2 uppercase text-[#233255CC] text-opacity-80 hover:bg-blue-200  shadow-md rounded-md">Details</button>
                    <button
                        onClick={() => {
                            SetdamageInput(true)
                            // if (userDetails?.user_details?.access_permissions?.is_active) {
                            //     // User is active, call handleUserDeactivate
                            //     handleUserDeactivate(userDetails?.user_details?.user_id);
                            // } else {
                            //     // User is not active, call handleUserActive
                            //     handleUserActive(userDetails?.user_details?.user_id);
                            // }
                        }}
                        className={`px-3 py-2 uppercase 'text-red-600 text-opacity-80 border-red-500 hover:bg-red-200 focus:border-red-300 shadow-md border border-solid border-opacity-40 rounded-md`}
                        style={{
                            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                        }}>Damage Issued</button>

                </div>

            </div>
        </>
    );
};

export default SidePanel;