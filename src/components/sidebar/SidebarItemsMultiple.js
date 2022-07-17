import React from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarItems from './SidebarItems';
import CategoryIcon from '@mui/icons-material/Category';
import FemaleIcon from '@mui/icons-material/Female';
import HeightIcon from '@mui/icons-material/Height';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import useCollapse from '../../hooks/useCollapse';

const SidebarItemsMultiple = ({ Icon, item }) => {
    const [isOpen, handleClick] = useCollapse();

    return (
        <Box>
            <ListItemButton onClick={() => handleClick()}>
                <ListItemIcon >
                    <Icon sx={{ color: "#bdbdbd" }} />
                </ListItemIcon>
                <ListItemText
                    primary={item}
                    sx={{ color: "#bdbdbd", display: { xs: "none", md: "block" } }}
                />
                {isOpen ? <ExpandLessIcon sx={{ color: "#bdbdbd" }} /> : <ExpandMoreIcon sx={{ color: "#bdbdbd" }} />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Box>
                        <SidebarItems to="/category" Icon={CategoryIcon} item="Categoria" />
                        <SidebarItems to="/gender" Icon={FemaleIcon} item="Género" />
                        <SidebarItems to="/size" Icon={HeightIcon} item="Talla" />
                        <SidebarItems to="/color" Icon={ColorLensIcon} item="Color" />
                    </Box>
                </List>
            </Collapse>
        </Box>
    )
}

export default SidebarItemsMultiple