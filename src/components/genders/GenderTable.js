import React, { useEffect, useState } from 'react';
import { Table, TableContainer } from '@mui/material';
import GenderTableHeader from './GenderTableHeader';
import GenderTableBody from './GenderTableBody';
import ModalConfirm from '../modal/ModalConfirm';
import useModal from '../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { isDeleteGender, deleteGender } from '../../features/gender/genderReducer';
import GenderTableFooter from './GenderTableFooter';

const GenderTable = () => {
    const [idDeleting, setIdDeleting] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const token = localStorage.getItem('mvidia_jwt');
    const [isOpen, openModal, closeModal] = useModal();
    const { genders, isDeleting } = useSelector(state => state.gender);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        openModal();
        setIdDeleting(id)
    };

    useEffect(() => {
        if (isDeleting && idDeleting) {
            dispatch(deleteGender({ id: idDeleting, token }));
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

    const newData = genders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer sx={{ mt: "1rem" }}>
            <Table size="small" sx={{ minWidth: 450 }}>
                <GenderTableHeader />
                <GenderTableBody
                    genders={newData}
                    handleDelete={handleDelete}
                />
                <GenderTableFooter
                    genders={genders}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Table>
            <ModalConfirm
                open={isOpen}
                closeModal={closeModal}
                isDelete={isDeleteGender}
            />
        </TableContainer>
    )
}

export default GenderTable;