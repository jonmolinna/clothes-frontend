import React from 'react';
import PropTypes from 'prop-types';
import { TableFooter, TablePagination, TableRow } from '@mui/material'

const ColorTableFooter = ({ colors, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {

    return (
        <TableFooter>
            <TableRow>
                {
                    colors && (
                        <TablePagination
                            rowsPerPageOptions={[]}
                            count={colors.length}
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
}

ColorTableFooter.prototype = {
    colors: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
}

export default ColorTableFooter;