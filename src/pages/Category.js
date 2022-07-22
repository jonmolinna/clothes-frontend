import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import Loading from '../components/loader/Loading';
import { Typography, Box, TextField, Button } from '@mui/material';
import CategoryTable from '../components/category/CategoryTable';
import { getAllCategories, addCategory, updateCategory } from '../features/category/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';

const Category = () => {
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem('mvidia_jwt');
    const { isLoading, isEditing, categoryEditing } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getAllCategories(token));
    }, [token, dispatch]);

    useEffect(() => {
        if (isEditing) {
            setCategory(categoryEditing?.name)
        } else {
            setCategory("");
        }
    }, [isEditing, categoryEditing?.name]);

    const handleAddCategory = (e) => {
        e.preventDefault();

        if (isEditing) {
            dispatch(updateCategory({
                id: categoryEditing?.id,
                category,
                token,
            }));
        } else {
            dispatch(addCategory({ category, token }));
        }
        setCategory("");
    };

    return (
        <Layout>
            <Loading open={isLoading} />
            <Box sx={{ p: "1rem" }}>
                <Typography variant="h5" component="h2">
                    Categorias
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleAddCategory}
                    sx={{ display: "flex", alignItems: "center", mt: "1rem" }}
                >
                    <TextField
                        label="Categoria"
                        variant="outlined"
                        size="small"
                        name='size'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        sx={{ flex: "1", mr: "1rem" }}
                    />
                    <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        disabled={!(category)}
                    >
                        {
                            isEditing ? 'Editar' : 'Guardar'
                        }
                    </Button>
                </Box>
                <CategoryTable />
            </Box>
        </Layout>
    )
};

export default Category;