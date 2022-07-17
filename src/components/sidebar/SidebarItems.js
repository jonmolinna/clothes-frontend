import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SidebarItems = ({ Icon, item, to }) => {
    return (
        <Link to={to}>
            <ListItemButton>
                < ListItemIcon>
                    <Icon sx={{ color: "#bdbdbd" }} />
                </ListItemIcon >
                <ListItemText
                    primary={item}
                    sx={{ color: "#bdbdbd", display: { xs: "none", md: "block" } }}
                />
            </ListItemButton >
        </Link>
    )
}

export default SidebarItems