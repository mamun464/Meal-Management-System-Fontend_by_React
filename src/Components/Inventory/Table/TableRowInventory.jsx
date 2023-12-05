
import PropTypes from 'prop-types';

const TableRowInventory = ({ item_inventory, index, handleInventoryList }) => {
    const { id, item, quantity, price_per_unit, damage_quantity, purchase_date } = item_inventory
    const handleClickEffect = () => {
        handleInventoryList(id);
        // console.log(id);
    };
    return (
        <>
            <tr onClick={handleClickEffect} className="hover cursor-pointer">
                <th>{index + 1}</th>
                <td>{purchase_date}</td>
                <td>{`${item?.item_name}-(${item?.variant})`}</td>
                <td>{quantity}</td>
                <td>{price_per_unit}</td>
                <td>{damage_quantity}</td>
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
    // handleItem: PropTypes.func.isRequired,
    // refreshDropdown: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}
export default TableRowInventory;