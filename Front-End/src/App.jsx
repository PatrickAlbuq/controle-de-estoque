import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importação do axios
import ProductTable from './components/ProductTable/ProductTable';
import ProductForm from './components/ProductForm/ProductForm';
import './App.css';
import Modal from 'react-modal';
import AlertNotification from './components/AlertNotification/AlertNotification';

Modal.setAppElement('#root');

const App = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchProducts = () => {
    axios.get('http://localhost:3001/products-info')
      .then(response => {
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os produtos:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
    setNotification({ message: 'Produto registrado com sucesso!', type: 'success' });
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="container">
      <header>
        <h1>Controle de Estoque</h1>
      </header>
      <AlertNotification message={notification.message} type={notification.type} onClose={closeNotification} />
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductTable products={products} fetchProducts={fetchProducts} />
      <footer className="footer">
        <p>&copy; 2024 Sistema de Controle de Estoque</p>
      </footer>
    </div>
  );
};

export default App;
