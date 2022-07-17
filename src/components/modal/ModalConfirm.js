import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'

const ModalConfirm = ({ open, closeModal, deleteItem }) => {

    return (
        <Dialog
            open={open}
            onClose={closeModal}
        >
            <DialogTitle>
                ¿Estas seguro de eliminar?
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => deleteItem(true)}>
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