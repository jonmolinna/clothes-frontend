import React from 'react';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { red, cyan, grey } from '@mui/material/colors';
import { Capitalize } from '../../utils/capitalize';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { editGender } from '../../features/gender/genderReducer';

const GenderTableBody = ({ genders, handleDelete }) => {
    const dispatch = useDispatch();

    return (
        <TableBody>
            {
                genders && genders.map(gender => (
                    <TableRow key={gender.id}>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: grey[400] }}>
                            {Capitalize(gender.name)}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            {moment(gender.createdAt).format('L')}
                        </TableCell>
                        <TableCell align="right" sx={{ backgroundColor: grey[400] }}>
                            <IconButton
                                onClick={() => handleDelete(gender.id)}
                                sx={{ color: red[700] }}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => dispatch(editGender(gender))}
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

export default GenderTableBody;