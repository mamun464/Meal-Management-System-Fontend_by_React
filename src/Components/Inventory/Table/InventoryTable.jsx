import TableRowInventory from "./TableRowInventory";
import PropTypes from 'prop-types';


const InventoryTable = ({ filterData }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
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
                    {/* row 1 */}
                    {/* filterData.map((item) =>(>
                    ) */}
                    {filterData.map((item, index) => (
                        <TableRowInventory key={item.id} index={index} item_inventory={item} />
                    ))}


                </tbody>
            </table>
        </div>
    );
};

InventoryTable.propTypes = {
    filterData: PropTypes.array.isRequired,
    // handleItem: PropTypes.func.isRequired,
    // refreshDropdown: PropTypes.func.isRequired,
    // userId: PropTypes.number.isRequired,
}

export default InventoryTable;