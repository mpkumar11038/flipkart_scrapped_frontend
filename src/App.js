import React, { useState, useEffect } from 'react'
import './App.css';
import ProductList from './components/ProductList';
import Search from './components/Search';
import ProductService from '../src/services/product';

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    ProductService.getAll().then((products) => {
      setProducts(products)
    });
  }, []);

  return (
    <div>
      <Search setProducts={setProducts} products={products}/>
      <ProductList products={products}/>
    </div>
  );
}

export default App;
