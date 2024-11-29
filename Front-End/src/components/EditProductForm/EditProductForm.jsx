import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Notification from '../AlertNotification/AlertNotification';
import './EditProductForm.css';

const EditProductForm = ({ product, isOpen, onClose, onUpdate }) => {
    const [editedProduct, setEditedProduct] = useState({
        id: product.id,
        code: product.code,
        name: product.name,
        description: product.description,
    });
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleChange = (e) => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/update-product`, editedProduct)
            .then(response => {
                setNotification({ message: 'Produto atualizado com sucesso!', type: 'success' });
                onUpdate(editedProduct);
                onClose();
            })
            .catch(error => {
                setNotification({ message: 'Erro ao atualizar o produto', type: 'error' });
                console.error('Erro ao atualizar o produto:', error);
            });
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div>
            <Notification message={notification.message} type={notification.type} onClose={closeNotification} />
            <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Editar Produto">
                <h2>Editar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Código:</label>
                        <input type="text" name="code" value={editedProduct.code} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Nome:</label>
                        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input type="text" name="description" value={editedProduct.description} onChange={handleChange} required />
                    </div>
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </Modal>
        </div>
    );
};

export default EditProductForm;
