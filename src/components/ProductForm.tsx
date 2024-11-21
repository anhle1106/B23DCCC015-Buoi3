import React, { useState, useEffect } from 'react';
import { Product, ProductToEdit } from '../redux/productSlice';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: ProductToEdit) => void;
  productToEdit: Product | null;
  closeModal: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct, onEditProduct, productToEdit, closeModal }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');  // Price starts as an empty string
  const [category, setCategory] = useState('');  // Category only used when adding new product

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(String(productToEdit.price));  // Set price from the product to edit (converted to string)
      // Do not reset category if editing (it remains the old value)
    }
  }, [productToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (productToEdit) {
      const updatedProduct: ProductToEdit = { id: productToEdit.id, name, price: Number(price) };
      onEditProduct(updatedProduct);  // Call edit function
    } else {
      const newProduct: Product = { id: Date.now(), name, price: Number(price), category };
      onAddProduct(newProduct);  // Call add function
    }

    // Close modal after submission
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{productToEdit ? 'Update Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              className='form-input'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              className='form-input'
              value={price}
              onChange={(e) => setPrice(e.target.value)}  // Allow the price to be empty
              required
            />
          </div>
          {/* Only show category input when adding a new product */}
          {!productToEdit && (
            <div>
              <label>Category</label>
              <select className="form-input"value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="office">Văn phòng phẩm</option> {/* Default value */}
                <option value="food">Thực phẩm</option>
                <option value="other">Khác</option>
              </select>
            </div>
          )}
          <div className="modal-buttons">
            <button type="submit" className="add-button">
              {productToEdit ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
