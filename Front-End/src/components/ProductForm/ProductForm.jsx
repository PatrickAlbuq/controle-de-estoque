import React, { useState } from 'react';
import axios from 'axios';
import AlertNotification from '../AlertNotification/AlertNotification';
import './ProductForm.css';

const ProductForm = ({ onProductAdded, onClose }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (quantity < 0) {
            setNotification({ message: 'Quantidade não pode ser negativa', type: 'error' });
            return;
        }
        axios.post('http://localhost:3001/create-product', {
            code,
            name,
            description,
            quantity,
        })
            .then(response => {
                onProductAdded();
                setNotification({ message: 'Produto adicionado com sucesso!', type: 'success' });
                setCode('');
                setName('');
                setDescription('');
                setQuantity(0);
            })
            .catch(error => {
                setNotification({ message: 'Erro ao adicionar produto', type: 'error' });
                console.error('Erro ao adicionar produto:', error);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Adicionar Produto</h2>
                <div>
                    <label>Código:</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <div className="button-container">
                    <button type="submit">Adicionar Produto</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
            <AlertNotification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
        </>
    );
};

export default ProductForm;
