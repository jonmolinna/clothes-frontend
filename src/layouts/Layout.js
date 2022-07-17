import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const Layout = ({ children }) => {
    return (
        <Box sx={{ height: '100vh' }}>
            <Header />
            <Grid container>
                <Sidebar />
                <Grid item xs={10} sm={11} md={10}>
                    <Box sx={{ overflowY: "scroll", overflowX: "hidden", height: "calc(100vh - 2.5rem)" }}>
                        {children}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default Layout;