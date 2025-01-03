import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#EEE",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

const Lab = () => {
    return (
        <>
            <Container fixed>
                <Box sx={{ bgcolor: "#cfe8fc", height: "50vh", width: "100%" }}>
                    Container
                </Box>
            </Container>
            <hr />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 8 }}>
                        <Item>xs=6 md=8</Item>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Item>xs=6 md=4</Item>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Item>xs=6 md=4</Item>
                    </Grid>
                    <Grid size={{ xs: 6, md: 8 }}>
                        <Item>xs=6 md=8</Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Lab;
