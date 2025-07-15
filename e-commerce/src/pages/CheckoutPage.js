import React, { useState, useEffect } from 'react';
import styles from './CheckoutPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage = ({ onAddToCart, onRemoveFromCart }) => { // Receive cart functions as props
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [cartItemsMap, setCartItemsMap] = useState({});
    const [cartProductsDisplay, setCartProductsDisplay] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Function to update local state and calculate total
    const updateCartDisplayAndTotal = (loadedCartMap, allProducts) => {
        const productsToDisplay = [];
        let calculatedTotal = 0;

        for (const productId in loadedCartMap) {
            const quantity = loadedCartMap[productId];
            if (quantity > 0) {
                const product = allProducts.find(p => p.id === Number(productId));
                if (product) {
                    productsToDisplay.push({ ...product, quantity: quantity });
                    calculatedTotal += parseFloat(product.price || 0) * quantity;
                }
            }
        }
        setCartProductsDisplay(productsToDisplay);
        setTotalPrice(calculatedTotal);
    };

    useEffect(() => {
        if (!currentUser?.username) {
            navigate('/login');
            return;
        }

        const userCartKey = `${currentUser.username}_cart`;
        const storedCartMapString = localStorage.getItem(userCartKey);
        let loadedCartMap = {};

        if (storedCartMapString) {
            try {
                const parsedMap = JSON.parse(storedCartMapString);
                if (parsedMap && typeof parsedMap === 'object' && !Array.isArray(parsedMap)) {
                    loadedCartMap = parsedMap;
                } else {
                    console.warn(`Cart data for ${currentUser.username} in localStorage was not a valid object. Resetting.`);
                }
            } catch (error) {
                console.error(`Error parsing cart for ${currentUser.username} from localStorage:`, error);
            }
        }
        setCartItemsMap(loadedCartMap);

        const allProductsString = localStorage.getItem('eCommerceProducts');
        let allProducts = [];
        if (allProductsString) {
            try {
                const parsedAllProducts = JSON.parse(allProductsString);
                if (Array.isArray(parsedAllProducts)) {
                    allProducts = parsedAllProducts;
                } else {
                    console.warn("All products data in localStorage was not an array. Resetting.");
                }
            } catch (error) {
                console.error("Error parsing all products from localStorage:", error);
            }
        }

        updateCartDisplayAndTotal(loadedCartMap, allProducts);

    }, [currentUser, navigate]);

    // This useEffect ensures the display updates if cartItemsMap changes (e.g., from HomePage)
    // or if the cart is updated directly on this page.
    useEffect(() => {
        const allProductsString = localStorage.getItem('eCommerceProducts');
        let allProducts = [];
        if (allProductsString) {
            try {
                allProducts = JSON.parse(allProductsString);
            } catch (error) {
                console.error("Error parsing all products from localStorage:", error);
            }
        }
        updateCartDisplayAndTotal(cartItemsMap, allProducts);
    }, [cartItemsMap]); // Re-run if cartItemsMap changes

    const handleIncrementQuantity = (productId) => {
        if (onAddToCart) {
            onAddToCart(productId); // Use the passed function
        }
        // Optimistically update local state for immediate feedback
        setCartItemsMap(prevMap => {
            const newMap = { ...prevMap };
            newMap[productId] = (newMap[productId] || 0) + 1;
            return newMap;
        });
    };

    const handleDecrementQuantity = (productId) => {
        if (onRemoveFromCart) {
            onRemoveFromCart(productId); // Use the passed function
        }
        // Optimistically update local state for immediate feedback
        setCartItemsMap(prevMap => {
            const newMap = { ...prevMap };
            if (newMap[productId] && newMap[productId] > 1) {
                newMap[productId]--;
            } else {
                delete newMap[productId]; // If quantity becomes 0, remove it
            }
            return newMap;
        });
    };

    const handleRemoveItemCompletely = (productIdToRemove) => {
        setCartItemsMap(prevMap => {
            const newMap = { ...prevMap };
            delete newMap[productIdToRemove]; // Remove completely
            // Update localStorage immediately
            if (currentUser?.username) {
                const userCartKey = `${currentUser.username}_cart`;
                localStorage.setItem(userCartKey, JSON.stringify(newMap));
            }
            return newMap;
        });
        // The useEffect on cartItemsMap will handle updating display and total
    };

    const handleCheckout = () => {
        if (Object.keys(cartItemsMap).length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }
        alert(`Proceeding to checkout with total: $${totalPrice.toFixed(2)}.\n(This is a placeholder for actual payment processing)`);
        
        setCartItemsMap({});
        setCartProductsDisplay([]);
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
                {cartProductsDisplay.length === 0 ? (
                    <p className={styles.emptyCartMessage}>Your cart is empty. Start shopping!</p>
                ) : (
                    <>
                        <div className={styles.cartItems}>
                            {Array.isArray(cartProductsDisplay) && cartProductsDisplay.map(product => (
                                <div key={product.id} className={styles.cartItem}>
                                    <img src={product.image} alt={product.name} className={styles.cartItemImage} />
                                    <div className={styles.itemDetails}>
                                        <h4 className={styles.itemName}>{product.name}</h4>
                                        <p className={styles.itemPrice}>${parseFloat(product.price).toFixed(2)}</p>
                                        <p className={styles.itemSubtotal}>Subtotal: ${ (parseFloat(product.price) * product.quantity).toFixed(2) }</p>
                                        <div className={styles.itemQuantityControls}>
                                            <button className={styles.quantityButton} onClick={() => handleDecrementQuantity(product.id)}>-</button>
                                            <span className={styles.currentQuantity}>{product.quantity}</span>
                                            <button className={styles.quantityButton} onClick={() => handleIncrementQuantity(product.id)}>+</button>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeItemCompletelyButton} // New class for full remove
                                        onClick={() => handleRemoveItemCompletely(product.id)}
                                    >
                                        Remove
                                    </button>
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