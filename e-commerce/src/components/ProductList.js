import React from "react";
import ProductCard from "./ProductCard";
import styles from './ProductList.module.css';

const ProductList = ({ products, onLikeToggle, onAddToCart, onRemoveFromCart, cartItems }) => {
    return(
        <div className={styles.productList}>
            {console.log("Rendering ProductList with products:", products)}
            <h2 className={styles.listTitle}>Explore</h2>
            <div className={styles.productGrid}>
                {
                    products.map((product) => (
                        <ProductCard
                            product={product}
                            key={product.id}
                            onLikeToggle={onLikeToggle}
                            onAddToCart={onAddToCart}
                            onRemoveFromCart={onRemoveFromCart}
                            cartItems={cartItems}
                            isAddedToCart={cartItems[product.id] > 0}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ProductList;