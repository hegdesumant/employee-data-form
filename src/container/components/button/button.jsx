import React from 'react'
import './button.style.scss'
const ButtonComponent = ({ text, active, clickFunction }) => {

    return (
        <button onClick={clickFunction} disabled={!active} className={`${active && "button-class"} ${!active && "button-class-disabled"}`}>{text}</button>
    );
}

export default ButtonComponent;