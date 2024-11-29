import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AlertNotification from '../AlertNotification/AlertNotification';
import './AddProductQuantityForm.css';

const AddProductQuantityForm = ({ products, isOpen, onClose, onQuantityAdded }) => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (products.length > 0 && !selectedProduct) {
            setSelectedProduct(products[0].id);
        }
    }, [products, selectedProduct]);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (quantity < 0) {
            setNotification({ message: 'Quantidade não pode ser negativa', type: 'error' });
            return;
        }
        axios.post('http://localhost:3001/add-product-quantity', {
            productId: selectedProduct,
            quantity
        })
            .then(response => {
                setNotification({ message: 'Quantidade adicionada com sucesso!', type: 'success' });
                onQuantityAdded();
                onClose();
            })
            .catch(error => {
                setNotification({ message: 'Erro ao adicionar quantidade', type: 'error' });
                console.error('Erro ao adicionar quantidade:', error);
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Adicionar Quantidade de Produto">
            <h2>Adicionar Quantidade de Produto</h2>
            <form onSubmit={handleSubmit} className="add-quantity-form">
                <div>
                    <label>Produto:</label>
                    <select value={selectedProduct} onChange={handleProductChange}>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <div className="button-container">
                    <button type="submit">Adicionar Quantidade</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
            <AlertNotification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
        </Modal>
    );
};

export default AddProductQuantityForm;
