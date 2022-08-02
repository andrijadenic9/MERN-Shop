import React from 'react'
import Modal from 'react-modal';
import customStyles from './custom-modal-style';

function DeleteModal() {
    return (
        <>
            <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>
                <p>Cao delete</p>
            </Modal>
        </>
    )
}

export default DeleteModal;
