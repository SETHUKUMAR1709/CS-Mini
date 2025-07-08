import React from "react";

const ProductList = () => {
    return(
        <div className="product-list">
            <h2>Product List</h2>
            <div className="product-grid">
                {/* Example product cards */}
                <div className="product-card">
                    <img src="https://via.placeholder.com/150" alt="Product 1" />
                    <h3>Product 1</h3>
                    <p>Description of Product 1</p>
                    <span>$19.99</span>
                </div>
                <div className="product-card">
                    <img src="https://via.placeholder.com/150" alt="Product 2" />
                    <h3>Product 2</h3>
                    <p>Description of Product 2</p>
                    <span>$29.99</span>
                </div>
                {/* Add more product cards as needed */}
            </div>
        </div>
    );
}

export default ProductList;