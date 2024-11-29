import React from 'react';
import Modal from 'react-modal';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Confirmar Ação">
            <div className="modal">
                <h2 className="modal-title">Confirmar Ação</h2>
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={onConfirm}>Confirmar</button>
                    <button className="modal-button cancel" onClick={onRequestClose}>Cancelar</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
