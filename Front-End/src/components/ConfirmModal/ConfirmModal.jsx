import React from 'react';
import Modal from 'react-modal';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmação"
            className="confirm-modal"
            overlayClassName="confirm-modal-overlay"
        >
            <div className="confirm-modal-content">
                <p>{message}</p>
                <div className="confirm-modal-buttons">
                    <button onClick={onConfirm} className="confirm-button">Confirmar</button>
                    <button onClick={onRequestClose} className="cancel-button">Cancelar</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
