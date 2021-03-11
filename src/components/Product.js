import React from 'react';



export default function Product(props) {
  const { product, onAdd, selectedCurrency  } = props;

  
  return (
    <div className="product-card">
      <img className="small img" src={product.image_url} alt={product.title} />
      <h3 >{product.title}</h3>
      <div > {selectedCurrency} {product.price}</div>
      <div >
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}
