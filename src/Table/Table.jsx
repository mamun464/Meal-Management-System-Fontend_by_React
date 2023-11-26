import TableRow from "./TableRow";
import PropTypes from 'prop-types';

const Table = ({ users }) => {
    const handleUser = (id) => {
        console.log("Clocked: " + id);
    };
    return (
        <div className="p-4">

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>EMAIL</th>
                            <th>PHONE NO.</th>
                            <th>MEMBER STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <TableRow
                                key={user.id}
                                user={user}
                                handleUser={handleUser}
                            ></TableRow>)
                        }

                        {/* row 2 */}

                        {/* row 3 */}

                        {/* row 4 */}

                    </tbody>
                    {/* foot */}


                </table>
            </div>
        </div >
    );
};

Table.propTypes = {
    users: PropTypes.array.isRequired,
}
export default Table;