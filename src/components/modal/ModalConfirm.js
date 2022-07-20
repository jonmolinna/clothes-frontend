import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';


const ModalConfirm = ({ open, closeModal, isDelete }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(isDelete(true));
        closeModal();
    };

    return (
        <Dialog
            open={open}
            onClose={closeModal}
        >
            <DialogTitle>
                ¿Estas seguro de eliminar?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClick}>
                    Eliminar
                </Button>
                <Button onClick={closeModal} autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalConfirm