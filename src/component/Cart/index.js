import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
 

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const itemCount = cartList.length
      let totalAmount = 0
      for (const item of cartList) {
        totalAmount += item.quantity * item.price
      }
      // TODO: Update the functionality to remove all the items in the cart
      const onRemoveAllCartItems = () => removeAllCartItems()

      return (
        <>
          <Header />
          <div className="cart-container">
            
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="remove-all-container">
                  <button
                    className="remove-all-button"
                    onClick={onRemoveAllCartItems}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <div className="order-summary-container">
                  <div className="order-summary">
                    <h1 className="total-order-text">
                      Order Total:
                      <span className="total-amount"> Rs {totalAmount}/-</span>
                    </h1>
                    <p className="item-count">{itemCount} Items in cart</p>
                    <button type="button" className="checkout-button">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
