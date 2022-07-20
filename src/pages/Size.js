import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import { Button, TextField, Typography, Box } from '@mui/material';
import SizeTabla from '../components/sizes/SizeTabla';
import Loading from '../components/loader/Loading';
import { getAllSizes, addSize, updateSize } from '../features/size/sizeReducer';
import { useDispatch, useSelector } from 'react-redux';

const Size = () => {
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem('mvidia_jwt');
    const { isLoading, isEditing, sizeEditing } = useSelector(state => state.size);

    useEffect(() => {
        dispatch(getAllSizes(token));
    }, [token, dispatch]);

    useEffect(() => {
        if (isEditing) {
            setSize(sizeEditing?.name)
        } else {
            setSize("");
        }
    }, [isEditing, sizeEditing?.name]);

    const handleAddSize = (e) => {
        e.preventDefault();

        if (isEditing) {
            dispatch(updateSize({
                id: sizeEditing?.id,
                size,
                token
            }))
        } else {
            dispatch(addSize({ size, token }))
        }
        setSize("");
    };

    return (
        <Layout>
            <Loading open={isLoading} />
            <Box sx={{ p: "1rem" }}>
                <Typography variant="h5" component="h2">
                    Tallas
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleAddSize}
                    sx={{ display: "flex", alignItems: "center", mt: "1rem" }}
                >
                    <TextField
                        label="Talla"
                        variant="outlined"
                        size="small"
                        name='size'
                        value={size}
                        onChange={e => setSize(e.target.value)}
                        sx={{ flex: "1", mr: "1rem" }}
                    />
                    <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        disabled={!(size)}
                    >
                        {
                            isEditing ? 'Editar' : 'Guardar'
                        }
                    </Button>
                </Box>
                <SizeTabla />
            </Box>
        </Layout>
    )
};

export default Size;