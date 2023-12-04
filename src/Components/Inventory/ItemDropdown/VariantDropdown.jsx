import PropTypes from 'prop-types';

const VariantDropdown = ({ VariantDropdown, handleVariant }) => {
    const handleClickEffect = (id) => {
        handleVariant(id);
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
                // refreshDropdown()
            }} tabIndex={0} role="button" className="btn m-1">Variant</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {VariantDropdown.map((item, index) => (
                    <li key={index}>
                        <a onClick={() => {
                            handleClickEffect(item.id);
                            // Add any additional logic you want here
                        }}>{`${item.variant}`}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

VariantDropdown.propTypes = {
    VariantDropdown: PropTypes.array.isRequired,
    handleVariant: PropTypes.func.isRequired,
    // refreshDropdown: PropTypes.func.isRequired,
    // userId: PropTypes.number.isRequired,
}
export default VariantDropdown;