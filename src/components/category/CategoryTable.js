import React, { useEffect, useState } from 'react';
import { Table, TableContainer } from '@mui/material';
import CategoryTableHeader from './CategoryTableHeader';
import CategoryTableBody from './CategoryTableBody';
import ModalConfirm from '../modal/ModalConfirm';
import useModal from '../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { isDeleteCategory, deleteCategory } from '../../features/category/categoryReducer';
import CategoryTableFooter from './CategoryTableFooter';

const CategoryTable = () => {
    const [idDeleting, setIdDeleting] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, openModal, closeModal] = useModal();
    const { categories, isDeleting } = useSelector(state => state.category);
    const token = localStorage.getItem('mvidia_jwt');
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        openModal();
        setIdDeleting(id)
    };

    useEffect(() => {
        if (isDeleting && idDeleting) {
            dispatch(deleteCategory({ id: idDeleting, token }));
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

    const newData = categories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer sx={{ mt: "1rem" }}>
            <Table size="small" sx={{ minWidth: 450 }}>
                <CategoryTableHeader />
                <CategoryTableBody
                    categories={newData}
                    handleDelete={handleDelete}
                />
                <CategoryTableFooter
                    categories={categories}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Table>
            <ModalConfirm
                open={isOpen}
                closeModal={closeModal}
                isDelete={isDeleteCategory}
            />
        </TableContainer>
    )
};

export default CategoryTable;