import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';

const CategoryTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ backgroundColor: grey[700], color: "#fff" }}>
                    Categorias
                </TableCell>
                <TableCell sx={{ backgroundColor: grey[700], color: "#fff" }} align="right">
                    Fecha
                </TableCell>
                <TableCell sx={{ backgroundColor: grey[700], color: "#fff" }} align="right">
                    Acciones
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default CategoryTableHeader