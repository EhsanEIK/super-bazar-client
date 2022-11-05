import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Order from './Order';

const Orders = () => {
    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`https://super-bazar-server.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('my-shop-token')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [])

    const handleDeleteOrder = id => {
        const agree = window.confirm('Are you sure to delete this order?');
        if (agree) {
            fetch(`https://super-bazar-server.vercel.app/orders/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('my-shop-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Order Deleted Successfully!');
                        const remainingOrders = orders.filter(order => order._id !== id);
                        setOrders(remainingOrders);
                    }
                })
        }
    }

    return (
        <div className="overflow-x-auto w-full">
            <h1 className='text-3xl text-center font-semibold my-3'>
                Total Orders: {orders.length}
            </h1>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Photo</th>
                        <th>Product Name</th>
                        <th>Customer Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => <Order
                            key={order._id}
                            order={order}
                            handleDeleteOrder={handleDeleteOrder}></Order>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Orders;