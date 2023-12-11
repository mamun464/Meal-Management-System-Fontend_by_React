import TableRowInventory from "./TableRowInventory";
import PropTypes from 'prop-types';
import '../Table/InventoryTable.css'
import NoRecordFound from "../../NoRecordFound/NoRecordFound";
import { useEffect, useState } from "react";
import base_url from "../../../../public/config";
import SidePanel from "./sidePanel/SidePanel";

const InventoryTable = ({ filterData, fetchInventoryData, filterUrl, month, year }) => {
    const [SelectedRow, setSelectedRow] = useState('');
    const [RowID, setRowID] = useState('');
    const [ItemId, setItemId] = useState();
    const [invoiceId, setInvoiceId] = useState();
    const [StockData, setStockData] = useState({})

    const InventoryStockFetch = async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setStockData(result.data);
            console.log("New Data: ", StockData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
        InventoryStockFetch(`${base_url}/api/inventory/stock/?item_id=${ItemId}&month=${month}&year=${year}`);

    }, [RowID, ItemId, month, year]);


    const handleInventoryList = (inventoryId, item_id, Invoice_no) => {
        setRowID(inventoryId);
        setItemId(item_id);
        setInvoiceId(Invoice_no);
    };

    return (
        <div className="flex mb-4 mt-4 bg-[#fafafa]">
            <div className="add-shadow w-3/4 p-4 ">
                <div className="overflow-x-auto bg-[#fff] rounded-lg">
                    <table className="table">
                        <thead>
                            <tr className="text-[15px]">
                                <th>No</th>
                                <th>Purchase Date</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Damage Quantity</th>
                                <th>Price Per Unit</th>
                                <th>Invoice No.</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filterData.map((item, index) => (
                                <TableRowInventory
                                    key={item.id}
                                    index={index}
                                    item_inventory={item}
                                    handleInventoryList={handleInventoryList}
                                    year={year}
                                    month={month}
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
                            <SidePanel SelectedRow={SelectedRow}
                                RowID={RowID}
                                fetchInventoryData={fetchInventoryData}
                                filterUrl={filterUrl}
                                StockData={StockData}
                                InventoryStockFetch={InventoryStockFetch}
                                year={year}
                                month={month}
                                ItemId={ItemId}

                            ></SidePanel>
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
    nodata: PropTypes.bool,
    fetchInventoryData: PropTypes.func.isRequired,
    filterUrl: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
};

export default InventoryTable;
