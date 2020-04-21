import React from "react";
import { BlockPicker } from "react-color";
import { Button, Card, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ColorLensRoundedIcon from "@material-ui/icons/ColorLensRounded";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 80,
        width: 100,
        backgroundColor: "blue",
        cursor: "grab",
    },
    control: {
        padding: theme.spacing(2),
    },
    button: {
        float: "right",
    },
}));

const TaskTemplate = () => {
    const [background, setBackground] = React.useState("#2CCCE4");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = color => {
        setBackground(color.hex);
        console.log(background);
    };

    return (
        <Card className={classes.paper} style={{ backgroundColor: `${background}` }}>
            <Button aris-describedby={id} onClick={handleClick} className={classes.button}>
                <ColorLensRoundedIcon color="primary" fontSize="small" />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <BlockPicker color={background} onChange={handleChange} />
            </Popover>
        </Card>
    );
};

export default TaskTemplate;
