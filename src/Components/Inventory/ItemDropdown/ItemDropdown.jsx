import PropTypes from 'prop-types';

const ItemDropdown = ({ itemDropdown, handleItem, refreshDropdown }) => {
    const handleClickEffect = (item) => {
        handleItem(item);
        // console.log(id);
        // document.querySelectorAll('.table-row').forEach(row => {
        //     const rowId = parseInt(row.getAttribute('id'));
        //     if (rowId !== id) {
        //         row.classList.remove('clicked-row');
        //     } else row.classList.add('clicked-row');
        // });
    };
    return (
        <div className="dropdown dropdown-bottom">
            <div onClick={() => {
                refreshDropdown()
            }} tabIndex={0} role="button" className="btn m-1">Item Category</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {itemDropdown.map((item, index) => (
                    <li className='text-center' key={index}>
                        <button className='w-full text-center font-semibold uppercase mb-1' onClick={() => {
                            handleClickEffect(item);
                            // Add any additional logic you want here
                        }}>{`${item}`}</button>

                    </li>
                ))}
                <li className='flex items-end'><button onClick={() => {
                    handleItem('ALL');
                }} className='text-center w-fit bg-red-200 text-red-600 font-bold'>RESET</button></li>
            </ul>
        </div>
    );
};

ItemDropdown.propTypes = {
    itemDropdown: PropTypes.array.isRequired,
    handleItem: PropTypes.func.isRequired,
    refreshDropdown: PropTypes.func.isRequired,
    // userId: PropTypes.number.isRequired,
}


export default ItemDropdown;