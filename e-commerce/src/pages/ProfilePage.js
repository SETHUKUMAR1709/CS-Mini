import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './ProfilePage.module.css';
import ProductCard from '../components/ProductCard';

const ProfilePage = () => {
    const { currentUser, } = useAuth(); // Assuming logout is available if needed, though not used directly for display
    const [myListedProducts, setMyListedProducts] = useState([]);

    useEffect(() => {
        if (currentUser && currentUser.username) {
            const allProductsString = localStorage.getItem('eCommerceProducts');
            let allProducts = [];
            if (allProductsString) {
                try {
                    const parsedProducts = JSON.parse(allProductsString);
                    if (Array.isArray(parsedProducts)) {
                        allProducts = parsedProducts.filter(item => item && typeof item === 'object' && item.id != null);
                    }
                } catch (error) {
                    console.error("Error parsing all products from localStorage:", error);
                }
            }

            const userProducts = allProducts.filter(product =>
                product.sellerUsername === currentUser.username
            );
            setMyListedProducts(userProducts);
        } else {
            setMyListedProducts([]);
        }
    }, [currentUser]);

    if (!currentUser) {
        return (
            <div className={styles.profilePageContainer}>
                <div className={styles.profileCard}>
                    <h2 className={styles.title}>Access Denied</h2>
                    <p className={styles.subtitle}>Please log in to view your profile.</p>
                </div>
            </div>
        );
    }

    // Get the first letter of the username for the profile image
    const firstLetterOfUsername = currentUser.username ? currentUser.username.charAt(0).toUpperCase() : '';

    return (
        <div className={styles.profilePageContainer}>
            <div className={styles.profileCard}>
                {/* Profile Image with First Letter */}
                <div className={styles.profilePictureContainer}>
                    <span className={styles.profileLetter}>{firstLetterOfUsername}</span>
                </div>

                <h2 className={styles.title}>{(currentUser.username).toUpperCase()}</h2> {/* Update title to personalize */}
                
                <div className={styles.profileInfo}>
                    <p><strong>Username:</strong> {currentUser.username[0].toUpperCase()}{(currentUser.username).substring(1)}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                </div>

                <h3 className={styles.sectionTitle}>My Listed Products</h3>
                {myListedProducts.length === 0 ? (
                    <p className={styles.noProductsMessage}>You haven't listed any products yet.</p>
                ) : (
                    <div className={styles.listedProductsGrid}>
                        {myListedProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onLikeToggle={() => console.log('Like toggle not active on profile')}
                                onAddToCart={() => console.log('Add to cart not active on profile')}
                                onRemoveFromCart={() => console.log('Remove from cart not active on profile')}
                                quantityInCart={0}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;