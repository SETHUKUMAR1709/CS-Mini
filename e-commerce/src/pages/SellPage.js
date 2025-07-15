import React, { useState } from 'react';
import styles from './SellPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to get current user

const SellPage = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImageFile, setProductImageFile] = useState(null);
    const [productImagePreview, setProductImagePreview] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Get the current logged-in user

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProductImageFile(null);
            setProductImagePreview('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!productName || !productDescription || !productPrice || !productImageFile) {
            setError('All fields are required, including the image.');
            return;
        }

        if (!currentUser || !currentUser.username) {
            setError('You must be logged in to sell a product.');
            return;
        }

        const priceNum = parseFloat(productPrice);
        if (isNaN(priceNum) || priceNum <= 0) {
            setError('Price must be a positive number.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUrl = reader.result;

            const existingProductsString = localStorage.getItem('eCommerceProducts');
            let products = [];
            if (existingProductsString) {
                try {
                    const parsedProducts = JSON.parse(existingProductsString);
                    if (Array.isArray(parsedProducts)) {
                        products = parsedProducts.filter(item => item && typeof item === 'object' && item.id != null);
                    }
                } catch (err) {
                    console.error("Error parsing products from localStorage, starting fresh:", err);
                    products = [];
                }
            }

            const newProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

            const newProduct = {
                id: newProductId,
                name: productName,
                description: productDescription,
                price: priceNum.toFixed(2),
                image: imageDataUrl,
                likes: 0,
                sellerUsername: currentUser.username, // CRITICAL: Add seller's username
            };

            products.push(newProduct);
            localStorage.setItem('eCommerceProducts', JSON.stringify(products));

            setSuccessMessage('Product added successfully!');
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductImageFile(null);
            setProductImagePreview('');
        };
        reader.readAsDataURL(productImageFile);
    };

    return (
        <div className={styles.sellPageContainer}>
            <div className={styles.sellCard}>
                <h2 className={styles.title}>Sell Your Product</h2>
                <p className={styles.subtitle}>Upload an image and enter product details.</p>

                <form onSubmit={handleSubmit} className={styles.sellForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="productName" className={styles.label}>Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            className={styles.input}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="e.g., Gaming Keyboard"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="productDescription" className={styles.label}>Description</label>
                        <textarea
                            id="productDescription"
                            className={`${styles.input} ${styles.textarea}`}
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            placeholder="Describe your product in detail..."
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="productPrice" className={styles.label}>Price ($)</label>
                        <input
                            type="number"
                            id="productPrice"
                            className={styles.input}
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="e.g., 75.50"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="productImage" className={styles.label}>Product Image</label>
                        <input
                            type="file"
                            id="productImage"
                            className={styles.fileInput}
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        {productImagePreview && (
                            <img src={productImagePreview} alt="Product Preview" className={styles.imagePreview} />
                        )}
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

                    <button type="submit" className={styles.submitButton}>
                        List Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellPage;