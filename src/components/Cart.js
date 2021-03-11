import React from 'react';


export default function Cart(props) {
    const { cartItems, onAdd, onRemove, currency, selectedCurrency, handleChangeSelectCurrency, handleClose} = props;
   
    const itemsPrice = cartItems.reduce((a, c,) => (a + c.qty * c.price),  0);


    console.log(itemsPrice)
    
    // const taxPrice = itemsPrice * 0.14;
    // const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    // const totalPrice = itemsPrice + taxPrice + shippingPrice;

    return (
      <aside className="row">
        <div className="row-container">
          <div className="cart-header">
          <h2 className="cart-item-h">Cart Items</h2>
          <button onClick={handleClose} className="close"> x </button>
          </div>

        <select onChange={handleChangeSelectCurrency} className="selectme">
              <option value={selectedCurrency}>USD</option>
              {currency.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          {cartItems.length === 0 && <div>Cart is empty</div>}
          {cartItems.map((item) => (
            <>
            <div key={item.id} className="row cart-item">
              <div className="col-2 title">{item.title}
                <div className="quantity-price">
                  <div className="quantity-buttons">
                    <span onClick={() => onRemove(item)} className="remove"> - </span>
                    {' '} <span>{item.qty}</span> {' '}
                    <span onClick={() => onAdd(item)} className="add"> + </span>
                  </div>
                  <div className="col-2 price">
                    {item.qty} x {selectedCurrency} {item.price.toFixed(2)}
                  </div>
                </div>
              </div>
              
  
              <div className="col-2 text-right">
              <img className="small img" src={item.image_url} alt={item.title} />
              </div>
            </div>
            <hr />
            </>
            
          ))}
  
          {cartItems.length !== 0 && (
            <div className="cart-footer">
              <hr></hr>
              <div className="row">
                <div className="col-2">Sub Total</div>
                <div className="col-1 text-right">{selectedCurrency}{itemsPrice.toFixed(2)}</div>
              </div>

              <hr />
              <div className="row">
                <button onClick={() => alert('Congratulations!')} className="checkout-btn">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    );
}
