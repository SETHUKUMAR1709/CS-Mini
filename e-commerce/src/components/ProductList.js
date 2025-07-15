import React from "react";
import ProductCard from "./ProductCard";
import styles from './ProductList.module.css';

const ProductList = ({ products, onLikeToggle, onAddToCart, onRemoveFromCart, cartItems }) => {
    console.log("Rendering ProductList with products:", products);

    return(
        <div className={styles.productList}>
            <h2 className={styles.listTitle}>Explore</h2>
            <div className={styles.productGrid}>
                {
                    Array.isArray(products) && products.map((product) => {
                        if (!product || typeof product.id === 'undefined' || product.id === null) {
                            console.warn("Skipping invalid product entry:", product);
                            return null;
                        }

                        // Get quantity from cartItems map
                        const quantityInCart = (cartItems && typeof cartItems === 'object') ? cartItems[product.id] || 0 : 0;

                        return (
                            <ProductCard
                                product={product}
                                key={product.id}
                                onLikeToggle={onLikeToggle}
                                onAddToCart={onAddToCart}
                                onRemoveFromCart={onRemoveFromCart}
                                quantityInCart={quantityInCart} // Pass quantity to ProductCard
                            />
                        );
                    })
                }
                {Array.isArray(products) && products.length === 0 && (
                    <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-color-secondary)', marginTop: '20px' }}>No products to display.</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;