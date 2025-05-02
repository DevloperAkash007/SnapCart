import { Navigate, Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import Cart from './component/Cart';
import CartContext from './context/CartContext';
import Home from './component/Home';
import NotFound from './component/NotFound';
import ProductItemDetails from './component/ProductItemDetails';
import Products from './component/Products';



class App extends Component{ 
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartList = cartList.filter(cart => cart.id !== id)
    this.setState({cartList: newCartList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cart => {
        if (cart.id === id) {
          const quantity = cart.quantity + 1
          return {...cart, quantity}
        }
        return cart
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(item => item.id === id)
    const {quantity} = product
    if (quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(cart => {
          if (cart.id === id) {
            const quantity = cart.quantity - 1
            return {...cart, quantity}
          }
          return cart
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const existingProduct = cartList.find(each => {
      if (each.id === product.id) {
        return true
      }
    })

    if (existingProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    if (existingProduct !== undefined) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (product.id === item.id) {
            const quantity = existingProduct.quantity + product.quantity

            return {...existingProduct, quantity}
          }
          return item
        }),
      }))
    }
  }
  
  render() { 
    const {cartList} = this.state
    return (  <CartContext.Provider
      value={{
        cartList,
        addCartItem: this.addCartItem,
        removeCartItem: this.removeCartItem,
        removeAllCartItems: this.removeAllCartItems,
        incrementCartItemQuantity: this.incrementCartItemQuantity,
        decrementCartItemQuantity: this.decrementCartItemQuantity,
      }}
    >
      <Routes>
    <Route exact path='/' element={<Navigate to="/home" replace/>} />
    <Route exact path='/home' Component={Home}/>
    <Route exact path='/products' element={<Products/>}/>
    <Route exact path='/products/:id'element={<ProductItemDetails/>}/> 
    <Route exact path='/cart' element={<Cart/>}/> 
    <Route exact path='/not-found' element={<NotFound/>}/>
    <Route path='*'  element={<Navigate to="/not-found" replace/>}/>
    </Routes>
    </CartContext.Provider>
    
    
    )
    
     
  
}
}

export default App;
