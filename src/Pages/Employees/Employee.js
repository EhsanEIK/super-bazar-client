import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Employee = ({ employee, handleDelete }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, position } = employee;

    return (
        <tr>
            <th>#</th>
            <td>{name}</td>
            <td>{position}</td>
            <td>
                {
                    user?.email ?
                        <>
                            <Link to={`/employees/${_id}`}>
                                <button className="btn btn-success mr-2">Update</button>
                            </Link>
                            <button onClick={() => handleDelete(_id)} className="btn btn-error">Delete</button>
                        </>
                        : <></>
                }
            </td>
        </tr>
    );
};

export default Employee;