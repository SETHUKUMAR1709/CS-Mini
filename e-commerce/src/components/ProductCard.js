import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onLikeToggle, onAddToCart, onRemoveFromCart, cartItems, isAddedToCart }) => {
    const [liked, setLiked] = useState(false);
    const [inCart, setInCart] = useState(isAddedToCart);

    useEffect(() => {
        setInCart(isAddedToCart);
    }, [isAddedToCart]);

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
            setInCart(true);
        }
    };

    const handleRemoveFromCartClick = () => {
        if (onRemoveFromCart) {
            onRemoveFromCart(product.id);
            setInCart(false);
        }
    };

    return (
        <div className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <div>
            <div className={styles.productDetails}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDescription}>{product.description || 'No description available.'}</p>
            <span className={styles.productPrice}>${parseFloat(product.price).toFixed(2)}</span>
            </div>
            <div className={styles.actions}>
                {inCart ? (
                    <button className={`${styles.addToCart} ${styles.removeButton}`} onClick={handleRemoveFromCartClick}>
                        Remove from Cart
                    </button>
                ) : (
                    <button className={styles.addToCart} onClick={handleAddToCartClick}>
                        Add to Cart
                    </button>
                )}
                <button
                    className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
                    onClick={handleLikeClick}
                    aria-label={liked ? 'Unlike product' : 'Like product'}
                >
                    <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
                </button>
            </div>
            </div>
        </div>
    );
};

export default ProductCard;