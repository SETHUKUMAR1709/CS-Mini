import React, { useState, useEffect } from 'react';
import styles from './CheckoutPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cartProductIds, setCartProductIds] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (!currentUser?.username) {
            navigate('/login');
            return;
        }

        const userCartKey = `${currentUser.username}_cart`;
        const storedCartIdsString = localStorage.getItem(userCartKey);
        let loadedCart = {};
        let loadedCartIds = [];
        if (storedCartIdsString) {
            try {
                loadedCart = JSON.parse(storedCartIdsString);
                loadedCartIds = Object.keys(loadedCart);
            } catch (error) {
                console.error("Error parsing cart IDs from localStorage:", error);
                loadedCartIds = [];
            }
        }
       loadedCartIds = loadedCartIds.map((id) => {
    return Number(id);
});
        console.log("Loaded Cart IDs:", loadedCartIds);
        setCartItems(loadedCart);
        setCartProductIds(loadedCartIds);

        const allProductsString = localStorage.getItem('eCommerceProducts');
        let allProducts = [];
        if (allProductsString) {
            try {
                allProducts = JSON.parse(allProductsString);
            } catch (error) {
                console.error("Error parsing all products from localStorage:", error);
                allProducts = [];
            }
        }

        const productsInCart = allProducts.filter(product => loadedCartIds.includes(product.id));
        setCartProducts(productsInCart);

        const total = productsInCart.reduce((sum, product) => sum + parseFloat(product.price || 0), 0);
        setTotalPrice(total);

    }, [currentUser, navigate]);

    const handleRemoveFromCart = (productIdToRemove) => {
        setCartProductIds(prevIds => {
            const updatedIds = prevIds.filter(id => id !== productIdToRemove);
            if (currentUser?.username) {
                const userCartKey = `${currentUser.username}_cart`;
                localStorage.setItem(userCartKey, JSON.stringify(updatedIds));
            }
            return updatedIds;
        });

        setCartProducts(prevProducts => {
            const updatedProducts = prevProducts.filter(product => product.id !== productIdToRemove);
            const newTotal = updatedProducts.reduce((sum, product) => sum + parseFloat(product.price || 0), 0);
            setTotalPrice(newTotal);
            return updatedProducts;
        });
    };

    const handleCheckout = () => {
        if (cartProducts.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }
        alert(`Proceeding to checkout with total: $${totalPrice.toFixed(2)}. (This is a placeholder for actual payment processing)`);
        
        setCartProductIds([]);
        setCartProducts([]);
        setTotalPrice(0);
        
        if (currentUser?.username) {
            const userCartKey = `${currentUser.username}_cart`;
            localStorage.removeItem(userCartKey);
        }
        
        navigate('/home');
    };

    return (
        <div className={styles.checkoutPageContainer}>
            <div className={styles.checkoutCard}>
                <h2 className={styles.title}>Your Shopping Cart</h2>
                {cartProducts.length === 0 ? (
                    <p className={styles.emptyCartMessage}>Your cart is empty. Start shopping!</p>
                ) : (
                    <>
                        <div className={styles.cartItems}>
                            {cartProducts.map(product => (
                                <div key={product.id} className={styles.cartItem}>
                                    <img src={product.image} alt={product.name} className={styles.cartItemImage} />
                                    <div className={styles.itemDetails}>
                                        <h4 className={styles.itemName}>{product.name}</h4>
                                        <p className={styles.itemPrice}>${parseFloat(product.price).toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <span className={styles.itemQuantity}>Quantity: {cartItems[product.id]}</span>
                                    <button
                                        className={styles.removeItemButton}
                                        onClick={() => handleRemoveFromCart(product.id)}
                                    >
                                        Remove
                                    </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartSummary}>
                            <h3>Total: <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span></h3>
                            <button className={styles.checkoutButton} onClick={handleCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;