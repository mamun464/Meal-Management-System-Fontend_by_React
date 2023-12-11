
import PropTypes from 'prop-types';

const TableRowInventory = ({ item_inventory, index, handleInventoryList }) => {
    const { id, item, quantity, price_per_unit, damage_quantity, purchase_date, Invoice_no } = item_inventory



    const handleClickEffect = () => {
        handleInventoryList(id, item.id, Invoice_no);
        // console.log("Iteam: ", item.id);

    };
    return (
        <>
            <tr onClick={handleClickEffect} className="hover cursor-pointer">
                <th>{index + 1}</th>
                <td>{purchase_date}</td>
                <td>{`${item?.item_name}-(${item?.variant})`}</td>
                <td>{quantity}</td>
                <td>{damage_quantity}</td>
                <td>{price_per_unit}</td>
                <td>{Invoice_no}</td>
                {/* <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td> */}
            </tr>
        </>
    );
};

TableRowInventory.propTypes = {
    item_inventory: PropTypes.object.isRequired,
    handleInventoryList: PropTypes.func.isRequired,
    // refreshDropdown: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
}
export default TableRowInventory;