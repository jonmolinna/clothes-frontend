import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllColor, addColor, updateColor } from '../features/color/colorReducer';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ColorTable from '../components/colors/ColorTable';
import Loading from '../components/loader/Loading';

const Color = () => {
    const [color, setColor] = useState("");
    const token = localStorage.getItem('mvidia_jwt');
    const dispatch = useDispatch();
    const { isLoading, isEditing, colorEditing } = useSelector(state => state.color);

    useEffect(() => {
        dispatch(getAllColor(token));
    }, [token, dispatch]);

    useEffect(() => {
        if (isEditing) {
            setColor(colorEditing?.name)
        } else {
            setColor("");
        }
    }, [isEditing, colorEditing?.name]);

    const handleAddColor = (e) => {
        e.preventDefault();

        if (isEditing) {
            dispatch(updateColor({
                id: colorEditing?.id,
                color,
                token,
            }));
        } else {
            dispatch(addColor({ color, token }));
        }
        setColor("");
    };

    return (
        <Layout>
            <Loading open={isLoading} />
            <Box sx={{ p: "1rem" }}>
                <Typography variant="h5" component="h2">
                    Colores
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleAddColor}
                    sx={{ display: "flex", alignItems: "center", mt: "1rem" }}
                >
                    <TextField
                        label="Color"
                        variant="outlined"
                        size="small"
                        name='color'
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        sx={{ flex: "1", mr: "1rem" }}
                    />
                    <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        disabled={!(color)}
                    >
                        {
                            isEditing ? 'Editar' : 'Guardar'
                        }
                    </Button>
                </Box>
                <ColorTable />
            </Box>
        </Layout>
    )
}

export default Color;