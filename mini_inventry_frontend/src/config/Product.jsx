import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [inStockFilter, setInStockFilter] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, inStockFilter, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const applyFilters = () => {
    let filtered = products;
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }
    if (inStockFilter) {
      filtered = filtered.filter((product) => product.inStock);
    }
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleInStockChange = (e) => {
    setInStockFilter(e.target.checked);
  };

  const clearFilters = () => {
    setCategoryFilter('');
    setInStockFilter(false);
  };

  // Function to randomly check data in the backend
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            {Array.from(new Set(products.map((p) => p.category))).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={inStockFilter}
            onChange={handleInStockChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Show In Stock Only</label>
        </div>
        <button
          onClick={clearFilters}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Clear All
        </button>
      </div>
      
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Product List</h2>
        <p className="text-sm text-gray-600 mb-4">Total Products: {filteredProducts.length}</p>
        <ul className="space-y-2">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-4 bg-white shadow-sm rounded-md border border-gray-200"
            >
              <strong className="text-gray-800">{product.name}</strong> -{' '}
              <span className="text-gray-600">{product.category}</span> -{' '}
              <span className="text-gray-800">₹{product.price}</span> -{' '}
              <span
                className={`${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                } font-medium`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductList;