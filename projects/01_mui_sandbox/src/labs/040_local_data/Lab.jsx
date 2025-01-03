import * as React from "react";

const STORAGE_KEY = "local-storage-lab-data";

const Lab = () => {
    let restoredLabData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [
        {
            username: "John",
            rating: 1582,
            history: ["win", "lose", "win"],
        },
    ];

    const [labData, setLabData] = React.useState(restoredLabData);

    const addLabData = () => {
        let newLabData = [...labData];
        newLabData.push({
            username: "Tom",
            rating: Math.floor(Math.random() * 3e3),
            history: ["win", "lose"],
        });
        setLabData(newLabData);
    };

    const delLabData = () => {
        let newLabData = [...labData];
        newLabData.pop();
        setLabData(newLabData);
    };

    const resetData = () => {
        localStorage.removeItem(STORAGE_KEY);
        setLabData([]);
    };

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(labData));
    });

    return (
        <>
            <div>
                {labData.map((data) => {
                    return (
                        <div key={data.rating}>
                            <p>{data.username}</p>
                            <p>{data.rating}</p>
                            <p>{data.history}</p>
                            <hr />
                        </div>
                    );
                })}
            </div>
            <button onClick={addLabData}>add</button>
            <button onClick={delLabData}>del</button>
            <button onClick={resetData}>reset</button>
        </>
    );
};

export default Lab;
