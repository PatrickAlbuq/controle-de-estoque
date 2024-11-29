import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './components/ProductTable/ProductTable';
import ProductForm from './components/ProductForm/ProductForm';
import AddProductQuantityForm from './components/AddProductQuantityForm/AddProductQuantityForm';
import RemoveProductQuantityForm from './components/RemoveProductQuantityForm/RemoveProductQuantityForm';
import './App.css';
import Modal from 'react-modal';
import AlertNotification from './components/AlertNotification/AlertNotification';

Modal.setAppElement('#root');

const App = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [addQuantityModalIsOpen, setAddQuantityModalIsOpen] = useState(false);
  const [removeQuantityModalIsOpen, setRemoveQuantityModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

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

  const handleProductRemoved = (id) => {
    axios.delete('http://localhost:3001/delete-product', { data: { id } })  // Usa o método DELETE com o ID no corpo da requisição
      .then(response => {
        fetchProducts();
        setNotification({ message: 'Produto removido com sucesso!', type: 'success' });
      })
      .catch(error => {
        setNotification({ message: 'Erro ao remover produto', type: 'error' });
        console.error('Erro ao remover produto:', error);
      });
  };

  const openAddQuantityModal = () => {
    setAddQuantityModalIsOpen(true);
  };

  const closeAddQuantityModal = () => {
    setAddQuantityModalIsOpen(false);
  };

  const openRemoveQuantityModal = () => {
    setRemoveQuantityModalIsOpen(true);
  };

  const closeRemoveQuantityModal = () => {
    setRemoveQuantityModalIsOpen(false);
  };

  const openProductModal = () => {
    setProductModalIsOpen(true);
  };

  const closeProductModal = () => {
    setProductModalIsOpen(false);
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  const handleQuantityAdded = () => {
    fetchProducts();
    setNotification({ message: 'Quantidade adicionada com sucesso!', type: 'success' });
  };

  const handleQuantityRemoved = () => {
    fetchProducts();
    setNotification({ message: 'Quantidade removida com sucesso!', type: 'success' });
  };

  return (
    <div className="container">
      <header>
        <h1>Controle de Estoque</h1>
      </header>
      <AlertNotification message={notification.message} type={notification.type} onClose={closeNotification} />
      <div className="button-container">
        <button onClick={openProductModal}>Adicionar Produto</button>
        <button onClick={openAddQuantityModal}>Adicionar Quantidade</button>
        <button onClick={openRemoveQuantityModal}>Remover Quantidade</button>
      </div>
      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
        onProductRemove={handleProductRemoved}
      />
      <Modal
        isOpen={productModalIsOpen}
        onRequestClose={closeProductModal}
        contentLabel="Adicionar Produto"
      >
        <ProductForm
          onProductAdded={() => {
            handleProductAdded();
            closeProductModal();
          }}
          onClose={closeProductModal}
        />
      </Modal>
      <AddProductQuantityForm
        products={products}
        isOpen={addQuantityModalIsOpen}
        onClose={closeAddQuantityModal}
        onQuantityAdded={handleQuantityAdded}
      />
      <RemoveProductQuantityForm
        products={products}
        isOpen={removeQuantityModalIsOpen}
        onClose={closeRemoveQuantityModal}
        onQuantityRemoved={handleQuantityRemoved}
      />
      <footer className="footer">
        <p>&copy; 2024 Sistema de Controle de Estoque por Patrick Albuquerque</p>
      </footer>
    </div>
  );
};

export default App;
