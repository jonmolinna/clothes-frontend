import React, { useEffect, useState } from 'react';
import { Table, TableContainer } from '@mui/material'
import SizeTableHeader from './SizeTableHeader';
import SizeTableBody from './SizeTableBody';
import ModalConfirm from '../modal/ModalConfirm';
import useModal from '../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { isDeleteSize, deleteSize } from '../../features/size/sizeReducer';
import SizeTableFooter from './SizeTableFooter';

const SizeTabla = () => {
    const [idDeleting, setIdDeleting] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, openModal, closeModal] = useModal();
    const { sizes, isDeleting } = useSelector(state => state.size);
    const dispatch = useDispatch();
    const token = localStorage.getItem('mvidia_jwt');

    const handleDelete = (id) => {
        openModal();
        setIdDeleting(id)
    };

    useEffect(() => {
        if (isDeleting && idDeleting) {
            dispatch(deleteSize({ id: idDeleting, token }));
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

    return (
        <TableContainer sx={{ mt: "1rem" }}>
            <Table size="small" sx={{ minWidth: 450 }}>
                <SizeTableHeader />
                <SizeTableBody
                    sizes={sizes}
                    handleDelete={handleDelete}
                />
                <SizeTableFooter
                    sizes={sizes}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Table>
            <ModalConfirm
                open={isOpen}
                closeModal={closeModal}
                isDelete={isDeleteSize}
            />
        </TableContainer>
    )
}

export default SizeTabla