import React from 'react';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { red, cyan, grey } from '@mui/material/colors';
import { Capitalize } from '../../utils/capitalize';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { editSize } from '../../features/size/sizeReducer';

const SizeTableBody = ({ sizes, handleDelete }) => {
    const dispatch = useDispatch();

    return (
        <TableBody>
            {
                sizes && sizes.map(size => (
                    <TableRow key={size.id}>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: grey[400] }}>
                            {Capitalize(size.name)}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            {moment(size.createdAt).format('L')}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            <IconButton
                                onClick={() => handleDelete(size.id)}
                                sx={{ color: red[700] }}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => dispatch(editSize(size))}
                                sx={{ color: cyan[700] }}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

export default SizeTableBody;