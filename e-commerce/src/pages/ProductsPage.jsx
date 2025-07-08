import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, appId } from '../firebaseConfig'; 
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const { userId, isAuthenticated, loadingAuth } = useAuth();

  useEffect(() => {
    if (!loadingAuth && isAuthenticated) {
      const productsCollectionRef = collection(db, `artifacts/${appId}/public/data/products`);

      // Function to check and add default products if collection is empty
      const checkAndAddDefaultProducts = async () => {
        const docRef = doc(db, `artifacts/${appId}/public/data/products`, 'initial_check');
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("Adding default products...");
          const defaultProducts = [
            { name: 'Wireless Headphones', price: 129.99, imageUrl: 'https://placehold.co/300x300/007BFF/FFFFFF?text=Headphones' },
            { name: 'Smartwatch', price: 199.99, imageUrl: 'https://placehold.co/300x300/28A745/FFFFFF?text=Smartwatch' },
            { name: 'Portable Speaker', price: 79.99, imageUrl: 'https://placehold.co/300x300/DC3545/FFFFFF?text=Speaker' },
            { name: 'Gaming Mouse', price: 49.99, imageUrl: 'https://placehold.co/300x300/FFC107/333333?text=Gaming+Mouse' },
            { name: 'Mechanical Keyboard', price: 89.99, imageUrl: 'https://placehold.co/300x300/17A2B8/FFFFFF?text=Keyboard' },
            { name: 'Webcam 1080p', price: 65.00, imageUrl: 'https://placehold.co/300x300/6C757D/FFFFFF?text=Webcam' },
            { name: 'External SSD 1TB', price: 140.00, imageUrl: 'https://placehold.co/300x300/6F42C1/FFFFFF?text=SSD' },
            { name: 'USB-C Hub', price: 35.50, imageUrl: 'https://placehold.co/300x300/FD7E14/FFFFFF?text=USB-C+Hub' },
          ];

          for (const product of defaultProducts) {
            await addDoc(productsCollectionRef, product);
          }
          // Mark that default products have been added
          await setDoc(docRef, { initialized: true });
        }
      };

      checkAndAddDefaultProducts();

      const q = query(productsCollectionRef);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [isAuthenticated, loadingAuth]); // Depend on auth state

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {filteredProducts.length === 0 && (
        <p className="text-center text-xl mt-8">No products found matching your search.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className="text-center text-sm mt-8 text-gray-500">Your User ID: {userId}</p>
    </div>
  );
};

export default ProductsPage;