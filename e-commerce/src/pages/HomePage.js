import React, { useMemo, useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import './HomePage.css';
import { useAuth } from '../contexts/AuthContext'; // Ensure AuthContext is imported

const HomePage = () => {
    const { currentUser } = useAuth();

    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('eCommerceProducts');
        if (storedProducts) {
            try {
                return JSON.parse(storedProducts);
            } catch (error) {
                console.error("Error parsing products from localStorage, loading default:", error);
                return [];
            }
        }
        return [
            { id: 1, name: 'Product 1 - Elegant Boat', description: 'A sleek boat for your next adventure.', price: '10.00', image: require('../assets/boat1.jpeg'), likes: 0 },
            { id: 2, name: 'Product 2 - Adventure Boat', description: 'Perfect for fishing and exploration.', price: '20.00', image: require('../assets/boat0.jpeg'), likes: 0 },
            { id: 3, name: 'Product 3 - Wireless Earbuds', description: 'High-quality sound with active noise cancellation.', price: '30.00', image: require('../assets/airpods.jpeg'), likes: 0 },
        ];
    });

    const [cartItems, setCartItems] = useState(() => {
        const userCartKey = currentUser ? `${currentUser.username}_cart` : 'guest_cart';
        const storedCart = localStorage.getItem(userCartKey);
        if (storedCart) {
            try {
                return JSON.parse(storedCart);
            } catch (error) {
                console.error("Error parsing cart from localStorage:", error);
                return {};
            }
        }
        return {};
    });

    // Effect to update local storage when products state changes
    useEffect(() => {
        localStorage.setItem('eCommerceProducts', JSON.stringify(products));
    }, [products]);

    // Effect to update local storage when cartItems or currentUser changes
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
            if (!prevCartItems[productId]) {
                return {...prevCartItems, [productId]: 1};
            }
            else{
                return {...prevCartItems, [productId]: prevCartItems[productId] + 1}
            }    
        });
    }, [currentUser]);

    const handleRemoveFromCart = useCallback((productId) => {
        setCartItems(prevCartItems => {
            const updatedCart = {...prevCartItems};
            if (updatedCart[productId]) {
                if (updatedCart[productId] > 1) {
                    updatedCart[productId] -= 1;
                } else {
                    delete updatedCart[productId];
                }
            }
    });
    }, []);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) {
            return products;
        }
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(lowercasedSearchTerm) ||
            product.description.toLowerCase().includes(lowercasedSearchTerm)
        );
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