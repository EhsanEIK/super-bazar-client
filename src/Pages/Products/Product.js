import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { _id, img, name, price, shipping, seller } = product;

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{seller}</p>
                <p>{price}</p>
                <p>{shipping}</p>
                <div className="card-actions justify-end">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-primary">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default Product;