import React from 'react'
import { Box, Grid } from '@mui/material'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

const Home = () => {
    return (
        <Box sx={{ height: '100vh' }}>
            <Header />
            <Grid container>
                <Sidebar />
                <Grid item xs={10} sm={11} md={10}>Body</Grid>
            </Grid>
        </Box>
    )
}

export default Home