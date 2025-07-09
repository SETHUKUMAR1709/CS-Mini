import React from "react";
import ProductCard from "./ProductCard";
import './ProductList.css'; // Import your CSS file for styling

const ProductList = ({ products, setProducts }) => {

    const onClickToggle = (productId, liked) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, likes: liked ? product.likes + 1 : product.likes - 1 } : product
            )
        );
    };
    console.log("ProductList component rendered with products:", products);
    return (
        <div className="product-list-container">
            <div className="product-grid">
                {
                    products.map((product, index) => (
                        <ProductCard product={product} key={index} onLikeToggle={onClickToggle} />
                    ))
                }
            </div>
        </div>
    );
}

export default ProductList;