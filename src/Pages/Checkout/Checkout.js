import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const product = useLoaderData();
    const { _id, name, price } = product;

    const navigate = useNavigate();

    const handleOrder = event => {
        event.preventDefault();
        const form = event.target;
        const customerName = form.name.value;
        const message = form.message.value;
        const email = user?.email;

        const order = {
            productId: _id,
            productName: name,
            customerName,
            email,
            message
        }

        fetch('https://super-bazar-server.vercel.app/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('super-bazar-token')}`
            },
            body: JSON.stringify(order),
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Orders Added Successfully!!!');
                    event.target.reset();
                    navigate('/orders');
                }
            })
    }

    return (
        <div>
            <h1 className='text-5xl text-center font-semibold my-3'>Checkout for {name}</h1>
            <form onSubmit={handleOrder} className='p-20 pt-5'>
                <div className='grid grid-cols-2 gap-5'>
                    <input type="text" name='name' placeholder="Type your name" className="input input-bordered w-full" />
                    <input type="email" defaultValue={user?.email} readOnly placeholder="email" className="input input-bordered w-full" />
                    <textarea name='message' className="textarea textarea-bordered w-full" placeholder="Type your message"></textarea>
                </div>
                <button className="btn bg-teal-700 text-white border-teal-700 mt-3 w-full">Order Now</button>
            </form>
        </div >
    );
};

export default Checkout;