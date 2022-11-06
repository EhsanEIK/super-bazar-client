import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const Products = () => {
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        fetch(`https://super-bazar-server.vercel.app/products?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setCount(data.count);
            })
    }, [page, size]);

    const pages = Math.ceil(count / size);

    return (
        <div>
            <h1 className='text-4xl text-center'>Total Products in this page: {products?.length}</h1>
            <div className='pagination text-center my-5'>
                <p>Current Page: {page + 1} & Size: {size}</p>
                <div className="btn-group">
                    {
                        [...Array(pages).keys()].map(number => {
                            return <button onClick={() => setPage(number)} key={number} className="btn">{number + 1}</button>
                        })
                    }
                    <select onChange={event => setSize(event.target.value)} className="select select-bordered w-auto max-w-xs ml-2">
                        <option value='5'>5</option>
                        <option value='10' selected>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='30'>30</option>
                        <option value={count}>All</option>
                    </select>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;