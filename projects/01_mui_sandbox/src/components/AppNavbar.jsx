import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";

const AppNavbar = ({ labs, setLabIndex }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (idx) => {
        setLabIndex(idx);
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    React MUI Lab
                </Typography>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {labs.map((lab, idx) => (
                        <MenuItem key={idx} onClick={() => handleSelect(idx)}>
                            {lab}
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavbar;
