import React from 'react'
import Product from './Product';


export default function Main(props) {
    const { products, onAdd, selectedCurrency } = props;

    return (
        <main className="block col-2 main-block">
            <h1 className="product-head">Products</h1>
            <div className="main-products">
                <div className="grid-container">
                    {products.map((product) => (
                    <Product key={product.id} selectedCurrency={selectedCurrency} currency={selectedCurrency} product={product}  onAdd={onAdd}></Product>
                    ))}
                </div>
            </div>
            </main>
    )
}
