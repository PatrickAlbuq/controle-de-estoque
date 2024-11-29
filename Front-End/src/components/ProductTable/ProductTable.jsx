import React, { useEffect, useState } from 'react';
import EditProductForm from '../EditProductForm/EditProductForm';
import AlertNotification from '../AlertNotification/AlertNotification';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import './ProductTable.css';

const ProductTable = ({ products, fetchProducts, onProductRemove }) => {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const [productIdToRemove, setProductIdToRemove] = useState(null);

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

    const handleUpdate = (updatedProduct) => {
        fetchProducts();
        setNotification({ message: 'Produto atualizado com sucesso!', type: 'success' });
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    const openConfirmModal = (productId) => {
        setProductIdToRemove(productId);
        setConfirmModalIsOpen(true);
    };

    const closeConfirmModal = () => {
        setConfirmModalIsOpen(false);
        setProductIdToRemove(null);
    };

    const handleConfirmRemoval = () => {
        onProductRemove(productIdToRemove);
        closeConfirmModal();
    };

    return (
        <div>
            <AlertNotification message={notification.message} type={notification.type} onClose={closeNotification} />
            <ConfirmModal
                isOpen={confirmModalIsOpen}
                onRequestClose={closeConfirmModal}
                onConfirm={handleConfirmRemoval}
                message="Tem certeza de que deseja remover este produto?"
            />
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Data de Criação</th>
                        <th>Última Atualização</th>
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
                                <button className="edit-button" onClick={() => openEditModal(product)}>Editar</button>
                                <button className="remove-button" onClick={() => openConfirmModal(product.id)}>Remover</button>
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
        </div>
    );
};

export default ProductTable;
