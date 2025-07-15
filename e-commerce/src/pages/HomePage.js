import React, { useMemo, useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import './HomePage.css';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
    const { currentUser } = useAuth();

    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('eCommerceProducts');
        if (storedProducts) {
            try {
                const parsedProducts = JSON.parse(storedProducts);
                if (Array.isArray(parsedProducts)) {
                    return parsedProducts.filter(item => item && typeof item === 'object' && item.id != null);
                }
                console.warn("Parsed products from localStorage was not an array. Resetting products to default.");
                return [];
            } catch (error) {
                console.error("Error parsing products from localStorage, loading default:", error);
                return [];
            }
        }
        return [
            { id: 1, name: 'Product 1 - Elegant Boat', description: 'A sleek boat for your next adventure.', price: '10.00', image: require('../assets/boat1.jpeg'), likes: 0 },
            { id: 2, name: 'Product 2 - Adventure Boat', description: 'Perfect for fishing and exploration.', price: '20.00', image: require('../assets/boat0.jpeg'), likes: 0 },
            { id: 3, name: 'Product 3 - Wireless Earbuds', description: 'High-quality sound with active noise cancellation.', price: '30.00', image: require('../assets/airpods.jpeg'), likes: 0 },
            { id: 4, name: 'Smart Watch', description: 'Track your fitness and stay connected.', price: '50.00', image: 'https://via.placeholder.com/200x200/FF0000/FFFFFF?text=Smart+Watch', likes: 0 },
            { id: 5, name: 'Gaming Mouse', description: 'Precision gaming mouse for competitive play.', price: '25.00', image: 'https://via.placeholder.com/200x200/0000FF/FFFFFF?text=Gaming+Mouse', likes: 0 },
            { id: 6, name: 'Bluetooth Speaker', description: 'Portable speaker with rich bass.', price: '40.00', image: 'https://via.placeholder.com/200x200/008000/FFFFFF?text=Bluetooth+Speaker', likes: 0 },
        ];
    });

    const [cartItems, setCartItems] = useState(() => {
        const userCartKey = currentUser ? `${currentUser.username}_cart` : 'guest_cart';
        const storedCart = localStorage.getItem(userCartKey);
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                if (parsedCart && typeof parsedCart === 'object' && !Array.isArray(parsedCart)) {
                    return parsedCart;
                }
                console.warn(`Cart data for ${currentUser?.username || 'guest'} in localStorage was not a valid object. Resetting cart.`);
                return {};
            } catch (error) {
                console.error(`Error parsing cart for ${currentUser?.username || 'guest'} from localStorage:`, error);
                return {};
            }
        }
        return {};
    });

    useEffect(() => {
        localStorage.setItem('eCommerceProducts', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        const userCartKey = currentUser ? `${currentUser.username}_cart` : 'guest_cart';
        localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    }, [cartItems, currentUser]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleProductLikeToggle = useCallback((productId, newLikedState) => {
        setProducts(prevProducts =>
            prevProducts.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        likes: newLikedState ? product.likes + 1 : product.likes - 1
                    };
                }
                return product;
            })
        );
    }, []);

    const handleAddToCart = useCallback((productId) => {
        if (!currentUser) {
            alert('Please log in to add items to your cart.');
            return;
        }
        setCartItems(prevCartItems => {
            const currentQuantity = prevCartItems[productId] || 0;
            return {
                ...prevCartItems,
                [productId]: currentQuantity + 1
            };
        });
    }, [currentUser]);

    const handleRemoveFromCart = useCallback((productId) => {
        setCartItems(prevCartItems => {
            const newCartItems = { ...prevCartItems };
            if (newCartItems[productId] && newCartItems[productId] > 1) {
                newCartItems[productId]--;
            } else {
                delete newCartItems[productId];
            }
            return newCartItems;
        });
    }, []);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) {
            return products;
        }
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return Array.isArray(products)
            ? products.filter(product => {
                // Ensure product and its properties exist before accessing
                if (!product || typeof product.name === 'undefined' || typeof product.description === 'undefined') {
                    return false;
                }
                return product.name.toLowerCase().includes(lowercasedSearchTerm) ||
                       product.description.toLowerCase().includes(lowercasedSearchTerm);
            })
            : []; // Return empty array if products is not an array
    }, [products, searchTerm]);

    return (
        <div className="home-page">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {filteredProducts.length === 0 && searchTerm !== '' && (
                <p className="no-products-message">
                    No products found matching "{searchTerm}".
                </p>
            )}
            <ProductList
                products={filteredProducts}
                onLikeToggle={handleProductLikeToggle}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                cartItems={cartItems}
            />
        </div>
    );
};

export default HomePage;