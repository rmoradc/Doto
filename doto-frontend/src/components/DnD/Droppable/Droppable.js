import React from "react";
import PropTypes from "prop-types";

function Droppable(props) {
    const drop = e => {
        e.preventDefault();
        props.handleOpen();
    };

    const allowDrop = e => {
        e.preventDefault();
    };

    return (
        <div id={props.id} onDrop={drop} onDragOver={allowDrop} className={props.className}>
            {props.children}
        </div>
    );
}

Droppable.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};
export default Droppable;
