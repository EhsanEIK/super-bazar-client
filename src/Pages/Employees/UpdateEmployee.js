import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
    const stordEmployee = useLoaderData();

    const navigate = useNavigate();

    const handleUpdateEmployee = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const position = event.target.position.value;

        const employee = { name, position };

        fetch(`https://super-bazar-server.vercel.app/employees/${stordEmployee._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('super-bazar-token')}`
            },
            body: JSON.stringify(employee),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Congratulations, Employee Updated Successfully!!!');
                    navigate('/employees');
                }
            })
    }

    return (
        <div className="hero min-h-screen bg-teal-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left mb-3">
                    <h1 className="text-5xl font-bold">Update Employee!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleUpdateEmployee} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={stordEmployee.name} name='name' placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Position</span>
                            </label>
                            <input type="text" defaultValue={stordEmployee.position} name='position' placeholder="Position" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-success">Update Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;