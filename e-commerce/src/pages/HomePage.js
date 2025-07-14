import React, { useMemo, useState, useEffect, useCallback } from 'react'; 
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import './HomePage.css'; 

const HomePage = () => {
    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            try {
                return JSON.parse(storedProducts);
            } catch (error) {
                console.error("Error parsing products from localStorage:", error);
                return [];
            }
        }
        return [
            { id: 1, name: 'Product 1 - Elegant Boat', description: 'A sleek boat for your next adventure.', price: '10.00', image: require('../assets/boat1.jpeg'), likes: 0 },
            { id: 2, name: 'Product 2 - Adventure Boat', description: 'Perfect for fishing and exploration.', price: '20.00', image: require('../assets/boat0.jpeg'), likes: 0 },
            { id: 3, name: 'Product 3 - Wireless Earbuds', description: 'High-quality sound with active noise cancellation.', price: '30.00', image: require('../assets/airpods.jpeg'), likes: 0 },
        ];
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products)); // Use consistent key
    }, [products]);

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
            <ProductList products={filteredProducts} onLikeToggle={handleProductLikeToggle} />
        </div>
    );
}

export default HomePage;