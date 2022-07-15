import React, { useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { grey, pink } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import useLogin from '../hooks/useLogin';
import AlertBasic from '../components/messages/AlertBasic';

const Login = () => {
    const [form, handleChange, handleLogin] = useLogin();
    const { isLoading, error } = useSelector(state => state.auth)
    const isMountedRef = useRef(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Box sx={{ paddingTop: '10vh' }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ width: "90%", maxWidth: "390px" }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ textAlign: "center", color: pink[400] }}
                        >
                            Mvidia
                        </Typography>
                        <Box sx={{ bgcolor: grey[50], my: '1.1rem' }}>
                            <Box
                                component="form"
                                autoComplete='off'
                                onSubmit={handleSubmit}
                                sx={{ display: "flex", flexDirection: 'column', p: '0.98rem', boxShadow: 1 }}
                            >
                                <TextField
                                    label="Usuario"
                                    variant="standard"
                                    size="small"
                                    type="text"
                                    name='username'
                                    value={form.username}
                                    onChange={handleChange}
                                    sx={{ mb: '1rem' }}
                                />
                                <TextField
                                    label="Contraseña"
                                    variant="standard"
                                    size="small"
                                    type="password"
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                    sx={{ mb: '1rem' }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={(!(form.username && form.password) ? true : false) || isLoading}
                                    sx={{ bgcolor: pink[500], '&:hover': { backgroundColor: pink[300] } }}
                                >
                                    {
                                        isLoading ? 'Cargando...' : 'Iniciar Sesión'
                                    }
                                </Button>
                            </Box>
                        </Box>
                        {
                            error && (
                                <AlertBasic
                                    severity="error"
                                    message={error}
                                />
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;