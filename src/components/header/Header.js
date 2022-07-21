import React from 'react';
import { blueGrey } from '@mui/material/colors';
import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../features/auth/authReducer';
import { resetColor } from '../../features/color/colorReducer';
import { resetSize } from '../../features/size/sizeReducer';
import { resetGender } from '../../features/gender/genderReducer';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetColor());
        dispatch(resetSize());
        dispatch(resetGender());
        dispatch(logout());
    };

    return (
        <Box sx={{ bgcolor: blueGrey[800], height: "2.5rem" }} >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: "1rem", flex: "1" }}>
                    <Typography variant="h5" component="h2" color="white">
                        Mvidia
                    </Typography>
                    <Button
                        onClick={handleLogout}
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