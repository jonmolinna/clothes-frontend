import React from 'react';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { red, cyan, grey } from '@mui/material/colors';
import moment from 'moment';
import 'moment/locale/es';
import { Capitalize } from '../../utils/capitalize';
import { editColor } from '../../features/color/colorReducer';
import { useDispatch } from 'react-redux';

const ColorTableBody = ({ colors, handleDelete }) => {
    const dispatch = useDispatch();

    return (
        <TableBody>
            {
                colors && colors.map(color => (
                    <TableRow key={color.id}>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: grey[400] }}>
                            {Capitalize(color.name)}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            {moment(color.createdAt).format('L')}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            <IconButton
                                onClick={() => handleDelete(color.id)}
                                sx={{ color: red[700] }}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => dispatch(editColor(color))}
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

export default ColorTableBody