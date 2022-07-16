import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const SidebarItems = ({ Icon, item }) => {
    return (
        <ListItemButton>
            < ListItemIcon>
                <Icon sx={{ color: "#bdbdbd" }} />
            </ListItemIcon >
            <ListItemText
                primary={item}
                sx={{ color: "#bdbdbd", display: { xs: "none", md: "block" } }}
            />
        </ListItemButton >
    )
}

export default SidebarItems