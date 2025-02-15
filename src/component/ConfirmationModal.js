
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, onHide, onConfirm, actionType, status }) => {
    return (
        <Modal show={show} onHide={onHide}>
            {/* Modal header with close button */}
            <Modal.Header closeButton>
                <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>

            {/* Dynamic confirmation message based on action type */}
            <Modal.Body>
                {actionType === 'delete' 
                    ? 'Are you sure you want to delete this item?' 
                    : `Are you sure you want to change the status to ${status}?`}
            </Modal.Body>

            {/* Action buttons */}
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
