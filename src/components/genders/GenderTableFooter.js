import React from 'react';
import PropTypes from 'prop-types';
import { TableFooter, TablePagination, TableRow } from '@mui/material';

const GenderTableFooter = ({ genders, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
    return (
        <TableFooter>
            <TableRow>
                {
                    genders && (
                        <TablePagination
                            rowsPerPageOptions={[]}
                            count={genders.length}
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

GenderTableFooter.prototype = {
    genders: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default GenderTableFooter;