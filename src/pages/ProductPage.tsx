import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, editProduct } from '../redux/productSlice';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { RootState } from '../redux/store';
import "../css/ProductPage.css";
import { Product, ProductToEdit } from '../redux/productSlice';

const ProductPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null); // Product to edit
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 5; // Limit of 5 products per page
  
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  // Show the modal to add a new product
  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
    setShowModal(false); // Close modal after adding
  };

  // Show modal for editing an existing product
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowModal(true); // Open modal for editing
  };

  // Close modal without saving
  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null); // Reset current product
  };

  // Delete product
  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  // Filtered products based on search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Pagination logic: Slice products array based on current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Handle page change (Next/Previous)
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Total pages (round up the number of products divided by items per page)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="product-page">
      <h1>Product Management</h1>
      <div className="product-page-header">
        <button className="add" onClick={() => setShowModal(true)}>Add Product</button>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {showModal && (
        <ProductForm
          onAddProduct={handleAddProduct}
          onEditProduct={(product) => {
            const updatedProduct: ProductToEdit = { id: product.id, name: product.name, price: product.price };
            dispatch(editProduct(updatedProduct));
            closeModal();
          }}
          productToEdit={currentProduct}
          closeModal={closeModal}
        />
      )}

      <ProductTable
        products={paginatedProducts} // Pass paginated products to the table
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
