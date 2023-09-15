import React, { useState, useEffect } from 'react'
import ProductService from '../services/product';

export default function Search(props) {
  
  let setProducts = props.setProducts
  const products = props.products
  const [data, setData] = useState({});
  const [debouncedData, setDebouncedData] = useState({});
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setData({ url: newValue });

    // Clear the previous timeout whenever a new change occurs
    if (debouncedData.timeoutId) {
      clearTimeout(debouncedData.timeoutId);
    }

    // Set a new timeout to update debouncedData after a delay
    const newTimeoutId = setTimeout(() => {
      setDebouncedData({ url: newValue, timeoutId: null });
    }, 3000);
    
    setDebouncedData({ url: newValue, timeoutId: newTimeoutId });
  }

  useEffect(() => {
    // Check if debouncedData.url exists before making the API call
    if (debouncedData.url) {
      ProductService.scrape_url(debouncedData).then(res => {
        if (!products.some(hash => hash.id === res.data.id)) {
          setProducts([...products, res.data])
        }          
      });
    }
  }, [debouncedData.url]); // Only trigger the effect when debouncedData.url changes

  return (
    <div className="App d-flex justify-content-center align-items-center">
      <form className="w-50 p-4 bg-light rounded">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className='mb-2'>Enter url here</label>
          <input className="form-control mb-4" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="http://example.com/"/>          
        </div>        
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  )
}
