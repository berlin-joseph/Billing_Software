// src/components/ProductList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/products/create">Add New Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.product_name}</Link>
            <span> - {product.product_price}</span>
            <Link to={`/products/edit/${product._id}`}>Edit</Link>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
