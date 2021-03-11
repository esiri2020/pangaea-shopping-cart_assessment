import React, { useState, useEffect }  from 'react';
import Cart from './components/Cart';
import Header from './components/Header';
import Main from './components/Main';
// import data from './data';
import Modal from 'react-bootstrap/Modal';
import {gql, useQuery} from '@apollo/client';


const PRODUCTS_QUERY = gql`
  query products($currency: Currency!) {
  products {
    id
    title
    image_url
    price(currency: $currency)
    }
    currency
}
`

function App() {

  const [cartItems, setCartItems] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");


 
  const handleChangeSelectCurrency = (event) => {
    event.preventDefault();
    setSelectedCurrency(event.target.value);
    
  };
  
  // const { products } = data;
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {variables: {currency: selectedCurrency}});


    useEffect(()=>{
      if (data && cartItems.length){
        let newCart = []
        let ci = {}
        for (var i = 0; i < cartItems.length; i++) {
          let [y] = data.products.filter(x => x.id === cartItems[i].id)
          ci = {...y, qty: cartItems[i].qty}
          newCart.push(ci)
        }
        setCartItems(newCart)
      }
    },[data])
  

  const onAdd = (product) => {
    setShow(true)
    // const updatePrice= cartItems.find((x) => x.id ===product.id)
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1  } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  return (
    
 
      <div className="App">
        <Header countCartItems={cartItems.length} show={setShow}></Header>

              <Main products={data.products} selectedCurrency={selectedCurrency} onAdd={onAdd}></Main>
      

          <Modal show={show} onHide={handleClose}>
            {/* <button onClick={handleClose} className="close"> x </button> */}
            <Modal.Body>


               
                  <Cart
                    currency={data?.currency}
                    handleClose={handleClose}
                    selectedCurrency= {selectedCurrency}
                    handleChangeSelectCurrency = {handleChangeSelectCurrency}
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  ></Cart>

            </Modal.Body>  
          </Modal>
          

      </div>
    
  );
}

export default App;

