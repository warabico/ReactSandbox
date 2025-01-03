import React, { Suspense, useState, useEffect, lazy } from "react";
import BaseErrorBoundary from "./BaseErrorBoundary";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Container,
} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const STORAGE_KEY = "rcg-current-lab-index";

const DynamicLoader = ({ labId }) => {
    const LazyComponent = lazy(() => import(`./${labId}/Lab`));
    return (
        <BaseErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </Suspense>
        </BaseErrorBoundary>
    );
};

const App = ({ labs }) => {
    /**x
     * ローカルストレージより画面復帰時のラボインデックスを取得
     */
    let restoredLabIndx = localStorage.getItem(STORAGE_KEY) ?? 0;
    restoredLabIndx = restoredLabIndx < labs.length ? restoredLabIndx : 0;
    const [labIndex, setLabIndex] = useState(restoredLabIndx);

    /**
     * ラボID（フォルダ名）を取得
     */
    const labId = labs[labIndex];

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelectLab = (labIdx) => {
        setLabIndex(labIdx);
        setAnchorEl(null);
    };
    useEffect(() => localStorage.setItem(STORAGE_KEY, labIndex), [labIndex]);

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>
                    {/* ハンバーガーメニューのアイコン */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuClick}
                        sx={{ mr: 2 }} // メニューアイコンの右にマージンを追加
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        React MUI Lab
                    </Typography>

                    {/* メニュー */}
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
                            <MenuItem
                                key={idx}
                                onClick={() => handleSelectLab(idx)}
                            >
                                {lab}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <DynamicLoader labId={labId} />
            </Container>
        </ThemeProvider>
    );
};

export default App;
