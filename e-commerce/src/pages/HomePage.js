import React from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import { useMemo, useState } from 'react';
import './HomePage.css'; // Import your CSS file for styling

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', price: '$10', image: require('../assets/boat1.jpeg'), description: 'A great product', likes: 0 },
        { id: 2, name: 'Product 2', price: '$20', image: require('../assets/boat0.jpeg'), description: 'Another great product', likes: 0 },
        { id: 3, name: 'Product 3', price: '$30', image: require('../assets/airpods.jpeg'), description: 'Yet another great product', likes: 0 },
    ]);

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
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <ProductList products={filteredProducts} setProducts={setProducts} />
        </div>
    );
}

export default HomePage;