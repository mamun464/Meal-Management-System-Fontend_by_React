import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from "../../../../../public/config";
import PropTypes from 'prop-types';




const SidePanel = ({ SelectedRow, RowID, fetchInventoryData, filterUrl, StockData, InventoryStockFetch, year, month, ItemId }) => {
    // console.log('log from SidePanel', SelectedRow);
    const [damageInput, SetDamageInput] = useState(false)
    const [cookedInput, SetCookedInput] = useState(false)
    const [refresh, SetResfrsh] = useState(0)
    const [damageAmount, setDamageAmount] = useState(0);
    const [cookingAmount, setcookingAmount] = useState(0);
    console.log('Side pane Stock:', StockData)

    const handleDamageRequest = async (customUrl, damage_amount) => {
        try {
            console.log('damge: ', damage_amount);
            // Replace the following lines with your actual logic
            const response = await fetch(customUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    damage_quantity: damage_amount, // Customize as needed
                    // Other data if required
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Show success toast
                fetchInventoryData(filterUrl)
                toast.success('Damage Issued Successfully.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                // Show error toast with the specific error message
                toast.error(`${data.Error.damage_quantity[0]}`, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            // Show error toast for unexpected errors
            toast.error(`An unexpected error occurred. ${error}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };
    // useEffect(() => {
    //     // const customUrl = 'www.damage.com/add'; // Customize this URL
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>:", refresh);
    //     InventoryStockFetch(`${base_url}/api/inventory/stock/?item_id=${ItemId}&month=${month}&year=${year}`)
    // }, [refr]);


    const handleDamageSubmit = () => {
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>", damageAmount)
        handleDamageRequest(`${base_url}/api/inventory/add-damage/?inventory_id=${RowID}`, damageAmount);

        let url = `${base_url}/api/inventory/stock/?item_id=${ItemId}&month=${month}&year=${year}`;
        InventoryStockFetch(url)
        SetDamageInput(false);
        console.log(">>>>>>>>>>>>>>Calling InventoryStockFetch >>>>>>>>>", url);

    }
    const handleCookingSubmit = () => {
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>", damageAmount)
        // handleDamageRequest(`${base_url}/api/inventory/add-damage/?inventory_id=${RowID}`, damageAmount);

        // let url = `${base_url}/api/inventory/stock/?item_id=${ItemId}&month=${month}&year=${year}`;
        // InventoryStockFetch(url)
        SetCookedInput(false);
        // console.log(">>>>>>>>>>>>>>Calling InventoryStockFetch >>>>>>>>>", url);

    }
    return (
        <>
            <div className="p-6 shadow-lg">

                <p className="text-[10px] uppercase mb-1">Item Name</p>
                <h1 className="text-[15px] font-medium uppercase mb-6">{SelectedRow?.item?.item_name}</h1>

                <p className="text-[10px] uppercase mb-1">Variant</p>
                <h1 className="text-[15px] font-medium uppercase mb-6">{SelectedRow?.item?.variant}</h1>

                <p className="text-[10px] uppercase mb-1">Price</p>
                <h1 className="text-[15px] font-medium mb-3">{SelectedRow?.price_per_unit} <small className="font-normal">{`Taka /${SelectedRow.item?.unit}`}</small></h1>




                <div className={`rounded-lg mb-6 py-2 px-2 ${StockData && StockData.low_stock ? 'bg-red-100' : 'bg-green-100'}`}>
                    <h1 className="uppercase text-[13px] text-[#233255CC] font-bold text-center mb-3">Inventory Stocks</h1>
                    <table className="w-full text-[13px]">
                        <tr>
                            <td className=" w-40"><p className="font-medium  text-[13px]">Total Purchasing Lots:</p></td>
                            <td><span className="font-extrabold">{StockData?.purchase_count}</span></td>
                        </tr>
                        <tr>
                            <td className=" w-40"><p className="font-medium  text-[13px]">Total Quantity:</p></td>
                            <td><span className="font-extrabold">{StockData?.total_purchases_quantity}</span></td>
                        </tr>
                        <tr>
                            <td><p className="font-medium  text-[13px]">Total Usages:</p></td>
                            <td><span className=" font-extrabold">{StockData?.total_usages}</span></td>
                        </tr>
                        <tr className="border-b-[1px] border-[#2332551A]">
                            <td><p className="font-medium  text-[13px]">Total Damage:</p></td>
                            <td><span className=" font-extrabold">{StockData?.total_damage_quantity}</span></td>
                        </tr>

                        {/* {userDetails?.user_accounts?.due_status ? ( */}
                        <tr>
                            <td className="font-medium">Available Stock: </td>
                            <td><span className=" font-extrabold">{StockData?.inventory_stock}</span></td>
                        </tr>
                        {/* ) : ( */}
                        {/* <tr>
                            <td className="font-medium">Remaining Balance: </td>
                            <td><span className=" font-extrabold">{userDetails?.user_accounts?.remain_balance}</span></td>
                        </tr> */}
                        {/* )} */}

                    </table>

                </div>

                <div className="flex justify-between">
                    <button className="border border-solid border-blue-500 border-opacity-40 px-3 py-2 uppercase text-[#233255CC] text-opacity-80 hover:bg-blue-200  shadow-md rounded-md">Cooked</button>
                    <button
                        onClick={() => {
                            SetDamageInput(true)

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

                <div className={`my-4 ${damageInput ? '' : 'hidden'}`}>
                    <div className="form-control">
                        <label className="input-group input-group-sm">
                            <span className="text-[12px] uppercase font-medium mr-4">Damage:</span>
                            <input
                                type="number"
                                placeholder="Amount"
                                className="input input-bordered input-sm w-28"
                                required
                                onChange={(e) => setcookingAmount(e.target.value)}
                            />
                            <button
                                className={`ml-3 px-1 py-1 uppercase 'text-red-600 text-opacity-80 border-green-500 hover:bg-green-200 focus:border-green-300 shadow-md border border-solid border-opacity-40 rounded-md`}
                                onClick={() => {
                                    if (!cookingAmount) {
                                        // If damageAmount is empty, show a warning or handle the error as needed
                                        toast.error('Please fill in the damage amount.', {
                                            position: 'top-right',
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: 'light',
                                        });
                                        return;
                                    }
                                    handleDamageSubmit()


                                }}
                            >
                                Submit
                            </button>
                        </label>
                    </div>
                </div>

                {/* for Cooked */}
                <div className={`my-4 ${cookedInput ? '' : 'hidden'}`}>
                    <div className="form-control">
                        <label className="input-group input-group-sm">
                            <span className="text-[12px] uppercase font-medium mr-4">Cooked:</span>
                            <input
                                type="number"
                                placeholder="Amount"
                                className="input input-bordered input-sm w-28"
                                required
                                onChange={(e) => setcookingAmount(e.target.value)}
                            />
                            <button
                                className={`ml-3 px-1 py-1 uppercase 'text-red-600 text-opacity-80 border-green-500 hover:bg-green-200 focus:border-green-300 shadow-md border border-solid border-opacity-40 rounded-md`}
                                onClick={() => {
                                    if (!damageAmount) {
                                        // If damageAmount is empty, show a warning or handle the error as needed
                                        toast.error('Please fill in the Cooking amount.', {
                                            position: 'top-right',
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: 'light',
                                        });
                                        return;
                                    }
                                    handleCookingSubmit()


                                }}
                            >
                                Submit
                            </button>
                        </label>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

SidePanel.propTypes = {

    SelectedRow: PropTypes.object.isRequired,
    StockData: PropTypes.object.isRequired,
    RowID: PropTypes.number.isRequired,
    fetchInventoryData: PropTypes.func.isRequired,
    filterUrl: PropTypes.string.isRequired,
    InventoryStockFetch: PropTypes.func.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    ItemId: PropTypes.number.isRequired,
    // users: PropTypes.array.isRequired,

    // loadingForTable: PropTypes.bool.isRequired,
    // navClick: PropTypes.string.isRequired,
}

export default SidePanel;