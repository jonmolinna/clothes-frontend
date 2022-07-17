import React, { useEffect } from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { red, cyan, grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { Capitalize } from '../../utils/capitalize';
import ModalConfirm from '../modal/ModalConfirm';
import useModal from '../../hooks/useModal';

const ColorTable = () => {
    const { colors } = useSelector(state => state.color);
    const [isOpen, openModal, closeModal, isDeleting, deleteItem] = useModal();


    useEffect(() => {
        console.log('Eliminado')
        console.log(isDeleting)
        deleteItem(false);
    }, [isDeleting, deleteItem]);

    return (
        <TableContainer sx={{ mt: "1rem" }}>
            <Table size="small">
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ backgroundColor: grey[700], color: "#fff" }}>
                            Colores
                        </TableCell>
                        <TableCell sx={{ backgroundColor: grey[700], color: "#fff" }} align="right">
                            Fecha
                        </TableCell>
                        <TableCell sx={{ backgroundColor: grey[700], color: "#fff" }} align="right">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        colors && colors.map(color => (
                            <TableRow key={color.id}>
                                <TableCell component="th" scope="row" sx={{ backgroundColor: grey[400] }}>
                                    {Capitalize(color.name)}
                                </TableCell>
                                <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                                    {moment(color.createdAt).format('L')}
                                </TableCell>
                                <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                                    <IconButton
                                        onClick={openModal}
                                        sx={{ color: red[700] }}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: cyan[700] }}
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <ModalConfirm
                open={isOpen}
                closeModal={closeModal}
                deleteItem={deleteItem}
            />
        </TableContainer>
    )
}

export default ColorTable;