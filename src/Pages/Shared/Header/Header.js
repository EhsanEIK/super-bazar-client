import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout().then(() => toast.success('Log out successfully'))
            .catch(err => console.error(err));
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Super-Bazar</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/products'>Products</Link></li>
                    <li><Link to='/employees'>Employees</Link></li>
                    <li><Link to='/orders'>Orders</Link></li>
                    {
                        user?.email ? <>
                            <li onClick={handleLogout}><Link>Logout</Link></li>
                            <li className='bg-teal-100 rounded-lg ml-2 px-2'><Link>Welcome {user?.email}</Link></li>
                        </>
                            : <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Header;