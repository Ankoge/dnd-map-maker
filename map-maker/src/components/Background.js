import {BACKGROUND_OPTIONS} from "../data/backgroundOptions";
import {useState} from "react";

const Background = () => {
    const [backgroundUrl, setBackgroundUrl] = useState(BACKGROUND_OPTIONS.find(option => option.name === "Default").url);
    const [isEdit, setEdit] = useState(false);

    function handleOptionClick(event) {
        const url = event.target.dataset.url;
        document.body.style.backgroundImage = `url("${url}")`;
        setBackgroundUrl(url);
        setEdit(!isEdit);

    }

    const backgroundOptionBuilder = () => {
        return (BACKGROUND_OPTIONS.map((option, index) =>
            <div key={index}
                 className={"background-option-icon-".concat(isEdit ? "active" : "inactive").concat(option.url === backgroundUrl ? " selected-background" : "")}
                 style={{backgroundImage: `url("${option.url}")`}}
                 data-url={option.url}
                 onClick={handleOptionClick}
            ></div>
        ))
    }

    function handleChangerOnClick() {
        setEdit(!isEdit);
    }

    return (
        <div className={"background-changer-container"}>
            <div className={"background-icon-".concat(!isEdit ? "active" : "inactive")}
                 style={{backgroundImage: `url("${backgroundUrl}")`}}
                 onClick={handleChangerOnClick}
            ></div>
            {backgroundOptionBuilder()}

        </div>
    )
}

export default Background;