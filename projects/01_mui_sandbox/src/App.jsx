import "./App.css";
import * as React from "react";
import { Suspense, useState, lazy } from "react";
import BaseErrorBoundary from "./BaseErrorBoundary";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";

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
    const [labIndex, setLabIndex] = useState(0);
    const labId = labs[labIndex];

    const handleChange = (event) => setLabIndex(event.target.value);

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={1} margin={1}>
                <Grid size={4}>
                    <select
                        className="Lab-select"
                        value={labIndex}
                        onChange={handleChange}
                    >
                        {labs.map((id, index) => (
                            <option key={id} value={index}>
                                {id}
                            </option>
                        ))}
                    </select>
                </Grid>
                <Grid size={8} style={{ border: "dashed 1px lightblue" }}>
                    <DynamicLoader labId={labId} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default App;
