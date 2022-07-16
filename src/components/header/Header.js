import React from 'react';
import { blueGrey } from '@mui/material/colors';
import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../features/auth/authReducer';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <Box sx={{ bgcolor: blueGrey[800], height: "2.5rem" }} >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: "1rem", flex: "1" }}>
                    <Typography variant="h5" component="h2" color="white">
                        Mvidia
                    </Typography>
                    <Button
                        onClick={() => dispatch(logout())}
                        endIcon={<LogoutIcon />}
                        color="info"
                    >
                        Salir
                    </Button>
                </Box>
            </Box>
        </Box>
    )
};

export default Header;