import React from 'react'
import { Grid, List, Box } from '@mui/material'
import { blueGrey } from '@mui/material/colors';
import SidebarItems from './SidebarItems';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import GroupIcon from '@mui/icons-material/Group';
import SidebarItemsMultiple from './SidebarItemsMultiple';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
    return (
        <Grid item xs={2} sm={1} md={2}>
            <Box sx={{ bgcolor: blueGrey[900] }}>
                <List component="div" sx={{ p: "0" }}>
                    <Box sx={{ overflowY: "scroll", overflowX: "hidden", height: "calc(100vh - 2.5rem)" }}>
                        <SidebarItems to="/" Icon={HomeIcon} item="Home" />
                        <SidebarItems to="/customer" Icon={PersonIcon} item="Cliente" />
                        <SidebarItems to="/product" Icon={ProductionQuantityLimitsIcon} item="Producto" />
                        <SidebarItems to="/sales" Icon={LoyaltyIcon} item="Venta" />
                        <SidebarItems to="/users" Icon={GroupIcon} item="Usuario" />
                        <SidebarItemsMultiple Icon={SettingsIcon} item="Ajuste" />
                    </Box>
                </List>
            </Box>
        </Grid>
    )
}

export default Sidebar