import React from "react";
import PropTypes from "prop-types";

const Droppable = props => {
    const drop = e => {
        e.preventDefault();
        this.props.handleOpen();
    };

    const allowDrop = e => {
        e.preventDefault();
    };

    return (
        <div id={this.props.id} onDrop={drop} onDragOver={allowDrop} className={this.props.className}>
            {this.props.children}
        </div>
    );
};

Droppable.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Droppable;
