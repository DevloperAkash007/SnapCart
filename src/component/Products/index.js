import { Component } from 'react'
import {ThreeDots} from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import Header from '../Header'

import './index.css'




class Products extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {

    const apiUrl = `https://dummyjson.com/products`
    
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.thumbnail,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        
      })
    } else {
      this.setState({
        productsList: []
      })
    }
  }

 
  

  

  renderProductsListView = () => {
    const {productsList} = this.state
   

    return  (
      <div className="all-products-container">
        
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) 
  }

  


  render() {
   const {productsList} = this.state

   const isEmpty = productsList === 0 ? true: false

    return (
       <> 
        <Header/>
        <div className="all-products-section">
            
            {this.renderProductsListView()}
        </div>
      </>
    )
  }
}

export default Products