import React, { useEffect, useState } from 'react';
import { Table, TableContainer } from '@mui/material';
import ModalConfirm from '../modal/ModalConfirm';
import useModal from '../../hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import { isDeleteColor, deleteColor } from '../../features/color/colorReducer';
import ColorTableFooter from './ColorTableFooter';
import ColorTableBody from './ColorTableBody';
import ColorTableHeader from './ColorTableHeader';

const ColorTable = () => {
    const [idDeleting, setIdDeleting] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { colors, isDeleting } = useSelector(state => state.color);
    const [isOpen, openModal, closeModal] = useModal();
    const token = localStorage.getItem('mvidia_jwt');
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        openModal();
        setIdDeleting(id)
    };

    useEffect(() => {
        if (isDeleting && idDeleting) {
            dispatch(deleteColor({ id: idDeleting, token }));
            setIdDeleting(null);
        }
    }, [isDeleting, idDeleting, token, dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const newData = colors?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer sx={{ mt: "1rem" }}>
            <Table size="small" sx={{ minWidth: 450 }}>
                <ColorTableHeader />
                <ColorTableBody
                    colors={newData}
                    handleDelete={handleDelete}
                />
                <ColorTableFooter
                    colors={colors}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Table>
            <ModalConfirm
                open={isOpen}
                closeModal={closeModal}
                isDelete={isDeleteColor}
            />
        </TableContainer>
    )
}

export default ColorTable;