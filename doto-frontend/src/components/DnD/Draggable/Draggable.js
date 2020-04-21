import React from "react";
import PropTypes from "prop-types";

function Draggable(props) {
    const noAllowDrop = e => {
        e.stopPropagation();
    };

    return (
        <div id={props.id} draggable="true" onDragOver={noAllowDrop} className={props.className}>
            {props.children}
        </div>
    );
}

Draggable.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Draggable;
