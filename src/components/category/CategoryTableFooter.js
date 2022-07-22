import React from 'react';
import { TableFooter, TablePagination, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

const CategoryTableFooter = ({ categories, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
    return (
        <TableFooter>
            <TableRow>
                {
                    categories && (
                        <TablePagination
                            rowsPerPageOptions={[]}
                            count={categories.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )
                }
            </TableRow>
        </TableFooter>
    )
};

CategoryTableFooter.prototype = {
    colors: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
}

export default CategoryTableFooter;