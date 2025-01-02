import "./App.css";
import { Suspense, useState, lazy } from "react";
import BaseErrorBoundary from "./BaseErrorBoundary";

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
        <div className="App">
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

            <div className="Lab">
                <DynamicLoader labId={labId} />
            </div>
        </div>
    );
};

export default App;
