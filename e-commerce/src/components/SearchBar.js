import React from "react";
import styles from './SearchBar.module.css'; // Import the CSS Module

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.searchBar}> {/* Apply the module class */}
            <input
                type="text"
                className={styles.searchInput} 
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;