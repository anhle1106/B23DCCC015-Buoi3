// /src/components/ProductTable.tsx
import React from 'react';
import "../css/ProductTable.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void; // Thêm prop onEdit
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete, onEdit }) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Tên</th>
          <th>Giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <button className="edit" onClick={() => onEdit(product)}>Sửa</button> {/* Nút sửa */}
              <button className="delete" onClick={() => onDelete(product.id)}>Xóa</button>
            </td>
          </tr>
        ))}
        <tr>
          <td style={{ textAlign: 'left', fontWeight: 'bold' }}>Tổng</td>
          <td>{products.reduce((total, product) => total + product.price, 0)} đ</td> {/* Tổng giá trị */}
          <td></td> {/* Cột này để trống */}
        </tr>
      </tbody>
    </table>
  );
};

export default ProductTable;
