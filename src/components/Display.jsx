import React from "react";

export default function Display(props) {
    
    let text = props.currenttext

    return (
        <div {...props}>{text}</div>
    )
}