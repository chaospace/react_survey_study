import React from "react";

const BottomControl = ({handler, label}) => (
    <div className="bottom-control">
        <button className="btn btn-primary"
        onClick={handler.bind(this)}>{label}</button>
    </div>
)

export default BottomControl;
