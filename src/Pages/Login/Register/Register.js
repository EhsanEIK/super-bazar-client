import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Register = () => {
    const { createUser } = useContext(AuthContext);

    const [errorMsg, setErrorMsg] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        setErrorMsg('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(r => {
                toast.success("Registration Successful");
                form.reset();
            })
            .catch(err => setErrorMsg(err.message));
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left mb-3">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link to='/login' className="label-text-alt link link-hover">Login Here</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p className='text-red-600 text-center'>{errorMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;