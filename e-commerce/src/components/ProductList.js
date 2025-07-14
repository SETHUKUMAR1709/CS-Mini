import React from "react";
import ProductCard from "./ProductCard";
import './ProductList.css'; // Import your CSS file for styling

const ProductList = ({ products, onLikeToggle }) => {

    
    console.log("ProductList component rendered with products:", products);
    return (
        <div className="product-list-container">
            <div className="product-grid">
                {
                    products.map((product, index) => (
                        <ProductCard product={product} key={index} onLikeToggle={onLikeToggle} />
                    ))
                }
            </div>
        </div>
    );
}

export default ProductList;