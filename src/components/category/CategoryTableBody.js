import React from 'react';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { red, cyan, grey } from '@mui/material/colors';
import { Capitalize } from '../../utils/capitalize';
import moment from 'moment';
import 'moment/locale/es';
import { editCategory } from '../../features/category/categoryReducer';
import { useDispatch } from 'react-redux';

const CategoryTableBody = ({ categories, handleDelete }) => {
    const dispatch = useDispatch();

    return (
        <TableBody>
            {
                categories && categories.map(category => (
                    <TableRow key={category.id}>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: grey[400] }}>
                            {Capitalize(category.name)}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            {moment(category.createdAt).format('L')}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            <IconButton
                                onClick={() => handleDelete(category.id)}
                                sx={{ color: red[700] }}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => dispatch(editCategory(category))}
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
};

export default CategoryTableBody;