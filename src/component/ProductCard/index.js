import CartContext from '../../context/CartContext'
import './index.css'


const ProductCard = props => {
  const {productData,clickAddBtn} = props
  const {title, brand, imageUrl, rating, price,isClicked,id} = productData 
  


return <CartContext.Consumer>
      {value => {
        
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...productData,quantity:1})
          clickAddBtn(id)
        }

        return (
          <li className="product-item">
            <img src={imageUrl} alt="product" className="thumbnail" />
            <h1 className="title">{title}</h1>
            <p className="brand">by {brand}</p>
            <div className="product-details">
              <p className="price">Rs {price}/-</p>
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              
            </div>
            <button onClick={onClickAddToCart} className='add-to-cart-btn'>{isClicked? "Added": "Add to Cart"}</button>
          </li>
        )
      }}
    </CartContext.Consumer>

  
}
export default ProductCard