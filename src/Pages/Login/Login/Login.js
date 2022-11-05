import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { json, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { login } = useContext(AuthContext);

    const [errorMsg, setErrorMsg] = useState('');

    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        setErrorMsg('');

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                fetch('https://super-bazar-server.vercel.app/jwt', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ currentUserEmail: result.user.email })
                })
                    .then(res => res.json())
                    .then(data => {
                        // localStorage.setItem('my-shop-token', data.token);
                        localStorage.setItem('my-shop-token', data);
                        toast.success("Login Successful");
                        form.reset();
                        navigate(from, { replace: true });
                    })
            })
            .catch(err => setErrorMsg(err.message));
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left mb-3">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
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
                                <Link to='/register' className="label-text-alt link link-hover">Register Here</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p className='text-red-600 text-center'>{errorMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;