import { Component } from 'react'


import Header from '../Header'
import ProductCard from '../ProductCard'

import './index.css'




class Products extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  clickAddBtn = (id) => {
    const {productsList} = this.state 
    const updatedProductsList = productsList.map(item => {
        if (item.id === id){
           return {...item, isClicked: !item.isClicked}

        }
        return item

    })
    this.setState({
        productsList: updatedProductsList
    })
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
        isClicked: false
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
            <ProductCard productData={product} key={product.id} clickAddBtn={this.clickAddBtn}/>
          ))}
        </ul>
      </div>
    ) 
  }

  


  render() {
   

  

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