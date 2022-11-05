import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Order = ({ order, handleDeleteOrder }) => {
    const { _id, productId, productName, customerName, price, message } = order;

    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`https://super-bazar-server.vercel.app/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])

    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handleDeleteOrder(_id)} className="btn btn-sm btn-circle btn-outline">X</button>
                </label>
            </th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={product.img} alt={productName} />
                    </div>
                </div>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="font-bold">{productName}</div>
                </div>
            </td>
            <td>
                {customerName}
            </td>
            <td>{price}</td>
            <td>{message}</td>
            {/* <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th> */}
        </tr>
    );
};

export default Order;