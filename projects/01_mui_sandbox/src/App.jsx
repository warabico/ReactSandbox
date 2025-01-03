import React, { Suspense, useState, useEffect, lazy } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";

import BaseErrorBoundary from "./BaseErrorBoundary";
import AppNavbar from "./components/AppNavbar";

const STORAGE_KEY = "rcg-current-lab-index";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const DynamicLoader = ({ labId }) => {
    const LazyComponent = lazy(() => import(`./labs/${labId}/Lab`));
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

    useEffect(() => localStorage.setItem(STORAGE_KEY, labIndex), [labIndex]);

    return (
        <ThemeProvider theme={theme}>
            <AppNavbar labs={labs} setLabIndex={setLabIndex} />
            <Container maxWidth="lg" sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <DynamicLoader labId={labId} />
            </Container>
        </ThemeProvider>
    );
};

export default App;
