import TableRowInventory from "./TableRowInventory";
import PropTypes from 'prop-types';
import '../Table/InventoryTable.css'
import NoRecordFound from "../../NoRecordFound/NoRecordFound";
import { useEffect, useState } from "react";
import base_url from "../../../../public/config";
import SidePanel from "./sidePanel/SidePanel";

const InventoryTable = ({ filterData, nodata }) => {
    const [SelectedRow, setSelectedRow] = useState('');
    const [RowID, setRowID] = useState('');

    const InventoryListFetch = async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setSelectedRow(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log(RowID);
        InventoryListFetch(`${base_url}/api/inventory/single-inventory/?inventory_id=${RowID}`);
    }, [RowID]);

    const handleInventoryList = (inventoryId) => {
        setRowID(inventoryId);
    };

    return (
        <div className="flex mb-4 mt-4 bg-[#fafafa]">
            <div className="add-shadow w-3/4 p-4 ">
                <div className="overflow-x-auto bg-[#fff] rounded-lg">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Purchase Date</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price Per Unit</th>
                                <th>Damage Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData.map((item, index) => (
                                <TableRowInventory
                                    key={item.id}
                                    index={index}
                                    item_inventory={item}
                                    handleInventoryList={handleInventoryList}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex-1 bg-[#FAFAFA] p-4 ">
                <div className=" add-shadow bg-[#fff] p-4 text-[#233255CC] h-fit rounded-lg">
                    <h1 className="text-xl font-medium mb-6 text-center">Inventory Details</h1>

                    {SelectedRow !== '' ? (
                        <>
                            {/* <h1>{SelectedRow?.item?.item_name}</h1> */}
                            {/* {console.log("From InventoryTable.jsx", SelectedRow)} */}
                            <SidePanel SelectedRow={SelectedRow}></SidePanel>
                        </>
                    ) : (
                        <NoRecordFound />
                    )}

                    <div className="w-full mt-2 items-center flex justify-center">
                        {/* Loading indicator or other components */}
                    </div>
                </div>
            </div>
        </div>
    );
};

InventoryTable.propTypes = {
    filterData: PropTypes.array.isRequired,
    nodata: PropTypes.bool,  // Add any other props if needed
};

export default InventoryTable;
