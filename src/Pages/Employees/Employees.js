import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Employee from './Employee';

const Employees = () => {
    const { user, logout, setLoading, loading } = useContext(AuthContext);
    if (loading) {
        return <div>Loading....</div>
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [employees, setEmployees] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch(`https://super-bazar-server.vercel.app/employees?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('my-shop-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    logout()
                        .then(() => { toast.success("unauthorized access") })
                        .catch(err => console.error(err))
                    return setLoading(false);
                }
                return res.json();
            })
            .then(data => setEmployees(data))
    }, [user?.email])

    const handleDelete = id => {
        const agree = window.confirm("Are you sure you want to delete this employee details?");
        if (agree) {
            fetch(`https://super-bazar-server.vercel.app/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('my-shop-token')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        logout()
                            .then(() => { toast.success("unauthorized access") })
                            .catch(err => console.error(err))
                        return setLoading(false);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Employee Deleted Successfully!');
                        const remainingEmployees = employees.filter(emp => emp._id !== id);
                        setEmployees(remainingEmployees);
                    }
                })
        }
    }

    return (
        <div className="overflow-x-auto">
            <Link to='/addEmployee'>
                <button className="btn btn-info mt-5">Create New Employee</button>
            </Link>
            <table className="table table-zebra w-full mt-6">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees?.map(employee => <Employee
                            key={employee._id}
                            employee={employee}
                            handleDelete={handleDelete}></Employee>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Employees;