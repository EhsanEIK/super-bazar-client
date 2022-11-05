import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='w-1/5 mx-auto'>
            <button className="btn btn-square loading mt-10"></button>
        </div>
    }
    if (user && user?.email) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;