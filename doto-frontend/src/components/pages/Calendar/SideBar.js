import React from "react";
import "./Calendar.css";
import "./SideBar.css";
import Draggable from "../../DnD/Draggable/Draggable";
import { Grid, Typography } from "@material-ui/core";
import TaskTemplate from "./TaskTemplate";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 25,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    header: {
        color: "white",
    },
}));

export default function SideBar() {
    const classes = useStyles();

    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={4} className={classes.root}>
            <Grid item xs={12}>
                <Typography className={classes.header}>Template Tasks</Typography>
            </Grid>
            <Grid item xs={12}>
                <Draggable id="task1">
                    <TaskTemplate />
                </Draggable>
            </Grid>
            <Grid item xs={12}>
                <Draggable id="task2">
                    <TaskTemplate />
                </Draggable>
            </Grid>
            <Grid item xs={12}>
                <Draggable id="task2">
                    <TaskTemplate />
                </Draggable>
            </Grid>
        </Grid>
    );
}
