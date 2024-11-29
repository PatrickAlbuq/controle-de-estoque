import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProductForm from '../EditProductForm/EditProductForm';
import AlertNotification from '../AlertNotification/AlertNotification';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import './ProductTable.css';

const ProductTable = ({ products, fetchProducts }) => {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const openConfirmModal = (product) => {
        setCurrentProduct(product);
        setConfirmModalIsOpen(true);
    };

    const closeConfirmModal = () => {
        setConfirmModalIsOpen(false);
    };

    const handleUpdate = (updatedProduct) => {
        fetchProducts();
        setNotification({ message: 'Produto atualizado com sucesso!', type: 'success' });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/delete-product`, { data: { id: currentProduct.id } })
            .then(response => {
                fetchProducts();
                setNotification({ message: 'Produto deletado com sucesso!', type: 'success' });
                closeConfirmModal();
            })
            .catch(error => {
                setNotification({ message: 'Erro ao deletar o produto', type: 'error' });
                console.error('Erro ao deletar o produto:', error);
            });
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div>
            <AlertNotification message={notification.message} type={notification.type} onClose={closeNotification} />
            <h2>Controle de Estoque</h2>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Primeira Entrada</th>
                        <th>Última Entrada</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>{new Date(product.createdAt).toLocaleString()}</td>
                            <td>{new Date(product.updatedAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => openEditModal(product)}>Editar</button>
                                <button onClick={() => openConfirmModal(product)} className="delete-button">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {currentProduct && (
                <EditProductForm
                    product={currentProduct}
                    isOpen={editModalIsOpen}
                    onClose={closeEditModal}
                    onUpdate={handleUpdate}
                />
            )}
            {currentProduct && (
                <ConfirmModal
                    isOpen={confirmModalIsOpen}
                    onRequestClose={closeConfirmModal}
                    onConfirm={handleDelete}
                    message={`Você tem certeza que deseja deletar o produto ${currentProduct.name}?`}
                />
            )}
        </div>
    );
};

export default ProductTable;
