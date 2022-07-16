import React from 'react'
import { Box, Grid } from '@mui/material'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import Layout from '../layouts/Layout'

const Home = () => {
    return (
        <Box sx={{ height: '100vh' }}>
            <Header />
            <Grid container>
                <Sidebar />
                <Layout>
                    <p>Rutas</p>
                </Layout>
            </Grid>
        </Box>
    )
}

export default Home