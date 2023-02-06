import {COLOR_OPTIONS} from "../data/colorOptions";
import {useState} from "react";

const ColorStyle = () => {
    const [color, setColor] = useState("Light");

    function handleColorOptionClick(event) {
        const name = event.target.dataset.name;
        if (name === color) {
            return;
        }
        const colorTable = COLOR_OPTIONS.find(option => option.name === name).colorTable;
        for (const [propertyName, propertyValue] of Object.entries(colorTable)) {
            document.documentElement.style.setProperty(propertyName, `${propertyValue}`)
        }
        setColor(name);

    }

    const colorOptionBuilder = () => {
        return COLOR_OPTIONS.map((option, index) =>
            <div key={index}
                className={"color-changer-icon"}
                 style={{backgroundColor: `${option.representation}`}}
                 data-name={option.name}
                 onClick={handleColorOptionClick}
            ></div>
        )
    }

    return (
        <div className={"color-changer-container"}>
            {colorOptionBuilder()}
        </div>
    )
}

export default ColorStyle;