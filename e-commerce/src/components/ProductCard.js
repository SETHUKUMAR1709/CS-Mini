import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onLikeToggle, onAddToCart, onRemoveFromCart, quantityInCart }) => {
    const [liked, setLiked] = useState(false);



    const handleLikeClick = () => {
        const newLikedState = !liked;
        setLiked(newLikedState);
        if (onLikeToggle) {
            onLikeToggle(product.id, newLikedState);
        }
    };

    const handleAddToCartClick = () => {
        if (onAddToCart) {
            onAddToCart(product.id);
        }
    };

    const handleDecrementClick = () => {
        if (onRemoveFromCart) {
            onRemoveFromCart(product.id);
        }
    };

    return (
        <div className={styles.productCard}>
            <div className={styles.header}>
                <div className={styles.imageContainer}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                </div>
                <div className={styles.actions}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <span className={styles.productPrice}>${parseFloat(product.price).toFixed(2)}</span>
                        <button
                            className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
                            onClick={handleLikeClick}
                            aria-label={liked ? 'Unlike product' : 'Like product'}
                        >
                            <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
                        </button>
                    </div>
                    {quantityInCart > 0 ? (
                        <div className={styles.quantityControls}>
                            <button className={styles.quantityButton} onClick={handleDecrementClick}>-</button>
                            <span className={styles.currentQuantity}>{quantityInCart}</span>
                            <button className={styles.quantityButton} onClick={handleAddToCartClick}>+</button>
                        </div>
                    ) : (
                        <button className={styles.addToCart} onClick={handleAddToCartClick}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>


            <div className={styles.productDetails}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description || 'No description available.'}</p>
            </div>

        </div>

    );
};

export default ProductCard;