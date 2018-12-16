import React from 'react';




export const Button = (props) => {

    return(
        <button onClick={props.onClick}>
            {props.buttonName}
        </button>
    )
}