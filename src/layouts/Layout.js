import React from 'react';
import { Grid } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Grid item xs={10} sm={11} md={10}>
            {children}
        </Grid>
    )
}

export default Layout;