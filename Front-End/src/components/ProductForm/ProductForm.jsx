import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AlertNotification from '../AlertNotification/AlertNotification';
import './ProductForm.css';

const ProductForm = ({ onProductAdded }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [product, setProduct] = useState({
        code: '',
        name: '',
        description: '',
        quantity: ''
    });
    const [notification, setNotification] = useState({ message: '', type: '' });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product.quantity < 0) {
            setNotification({ message: 'A quantidade não pode ser negativa', type: 'error' });
            return;
        }

        axios.post('http://localhost:3001/create-product', product)
            .then(response => {
                setNotification({ message: 'Produto registrado com sucesso!', type: 'success' });
                setProduct({
                    code: '',
                    name: '',
                    description: '',
                    quantity: ''
                });
                onProductAdded();  // Notifique o componente pai para atualizar a lista
                closeModal();
            })
            .catch(error => {
                setNotification({ message: 'Erro ao registrar o produto', type: 'error' });
                console.error('Erro ao registrar o produto:', error);
            });
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div>
            <AlertNotification message={notification.message} type={notification.type} onClose={closeNotification} />
            <button onClick={openModal}>Registrar Novo Produto</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Registrar Novo Produto">
                <h2>Registrar Novo Produto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Código:</label>
                        <input type="text" name="code" value={product.code} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Nome:</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input type="text" name="description" value={product.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Quantidade:</label>
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                    </div>
                    <button type="submit">Registrar Produto</button>
                    <button type="button" onClick={closeModal}>Cancelar</button>
                </form>
            </Modal>
        </div>
    );
};

export default ProductForm;
