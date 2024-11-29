import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AlertNotification from '../AlertNotification/AlertNotification';
import './RemoveProductQuantityForm.css';

const RemoveProductQuantityForm = ({ products, isOpen, onClose, onQuantityRemoved }) => {
    const [selectedProduct, setSelectedProduct] = useState(products.length > 0 ? products[0].id : '');
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
        const product = products.find(p => p.id.toString() === selectedProduct.toString());
        if (!product) {
            setNotification({ message: 'Produto não encontrado', type: 'error' });
            return;
        }
        if (quantity < 0) {
            setNotification({ message: 'Quantidade não pode ser negativa', type: 'error' });
            return;
        }
        if (quantity > product.quantity) {
            setNotification({ message: 'Quantidade a remover excede a quantidade existente', type: 'error' });
            return;
        }

        console.log(product)

        axios.post('http://localhost:3001/remove-product-quantity', {
            productId: selectedProduct,
            quantity
        })
            .then(response => {
                setNotification({ message: 'Quantidade removida com sucesso!', type: 'success' });
                onQuantityRemoved();
                onClose();
            })
            .catch(error => {
                setNotification({ message: 'Erro ao remover quantidade', type: 'error' });
                console.error('Erro ao remover quantidade:', error);
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Remover Quantidade de Produto">
            <h2>Remover Quantidade de Produto</h2>
            <form onSubmit={handleSubmit} className='remove-quantity-form'>
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
                    <button type="submit">Remover Quantidade</button>
                    <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
            <AlertNotification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
        </Modal>
    );
};

export default RemoveProductQuantityForm;
