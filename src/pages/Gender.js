import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import Loading from '../components/loader/Loading';
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import GenderTable from '../components/genders/GenderTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenders, addGender, updateGender } from '../features/gender/genderReducer';

const Gender = () => {
    const [gender, setGender] = useState("");
    const token = localStorage.getItem('mvidia_jwt');
    const dispatch = useDispatch();
    const { isLoading, isEditing, genderEditing } = useSelector(state => state.gender);

    useEffect(() => {
        dispatch(getAllGenders(token));
    }, [token, dispatch]);

    useEffect(() => {
        if (isEditing) {
            setGender(genderEditing?.name)
        } else {
            setGender("");
        }
    }, [isEditing, genderEditing?.name]);

    const handleAddGender = (e) => {
        e.preventDefault();

        if (isEditing) {
            dispatch(updateGender({
                id: genderEditing?.id,
                gender,
                token
            }))
        } else {
            dispatch(addGender({ gender, token }))
        }
        setGender("");
    };

    return (
        <Layout>
            <Loading open={isLoading} />
            <Box sx={{ p: "1rem" }}>
                <Typography variant="h5" component="h2">
                    Género
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleAddGender}
                    sx={{ display: "flex", alignItems: "center", mt: "1rem" }}
                >
                    <TextField
                        label="Género"
                        variant="outlined"
                        size="small"
                        name='size'
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        sx={{ flex: "1", mr: "1rem" }}
                    />
                    <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        disabled={!(gender)}
                    >
                        {
                            isEditing ? 'Editar' : 'Guardar'
                        }
                    </Button>
                </Box>
                <GenderTable />
            </Box>
        </Layout>
    )
};

export default Gender;