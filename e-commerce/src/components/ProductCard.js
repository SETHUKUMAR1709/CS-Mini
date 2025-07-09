import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific Font Awesome heart icons needed
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

// Import CSS Module
import styles from './ProductCard.module.css';


const ProductCard = ({ product, onLikeToggle }) => {
  console.log("ProductCard component rendered with product:", product);
  const [liked, setLiked] = React.useState(false);

  const handleLikeClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    if (onLikeToggle) {
      onLikeToggle(product.id, newLikedState);
    }
  };

  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} className={styles.productImage} />

      <div className={styles.productImageContainer}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description || 'No description available.'}</p>
        <span className={styles.productPrice}>${product.price}</span>

        <div className={styles.actions}>
          <button className={styles.addToCart}>Add to Cart</button>
          <button
            className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
            onClick={handleLikeClick}
            aria-label={liked ? 'Unlike product' : 'Like product'}>
            <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
          </button>
          <div className={styles.likeCount}>
            {product.likes}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;