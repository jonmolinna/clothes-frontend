import React from 'react';
import { TableFooter, TablePagination, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

const SizeTableFooter = ({ sizes, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
    return (
        <TableFooter>
            <TableRow>
                {
                    sizes && (
                        <TablePagination
                            rowsPerPageOptions={[]}
                            count={sizes.length}
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

SizeTableFooter.prototype = {
    colors: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default SizeTableFooter;