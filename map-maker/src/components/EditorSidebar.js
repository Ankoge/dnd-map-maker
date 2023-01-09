import {useState} from "react";
import {ENVIRONMENT_OPTIONS} from "../data/environmentOptions";

const EditorSidebar = props => {
    const [isDelete, setIsDelete] = useState(false);


    const handleEditorOpenClose = () => {
        props.onIsEditorSidebarChange(!props.isEditorSidebar);
        setIsDelete(false)
        props.onIsEditChange(false);
        document.getElementById("selected-option").style.backgroundImage = "none";
        props.onSidebarOptionChange(null);
    }

    const handleSidebarDeleteClick = (event) => {
        if (isDelete){
            handleEditOffClick();
        }else {
            handleSidebarOptionClick(event);
        }
        setIsDelete(!isDelete);
    }

    const handleSidebarOptionClick = (event) => {
        let eventTarget = event.target;

        if(eventTarget.className.includes("option-icon")){
            eventTarget = eventTarget.parentElement;
        }
        setIsDelete(eventTarget.className.includes("delete"))
        props.onIsEditChange(true);
        props.onSidebarOptionChange(eventTarget);
        document.getElementById("selected-option").style.backgroundImage = `url(${eventTarget.dataset.image})`;
    }

    const handleEditOffClick = () => {
        setIsDelete(false);
        props.onIsEditChange(false);
        document.getElementById("selected-option").style.backgroundImage = "none";
        props.onSidebarOptionChange(null);
    }

    return (
        <div className={"sidebar-container"}>
            <div className={"editor-icon-container"}>
                <div className={"sidebar-icon"}
                     style={{backgroundImage: `url("https://cdn.discordapp.com/attachments/894595052427431936/1039958318002741298/edit-icon.png")`}}
                     onClick={handleEditorOpenClose}
                ></div>
                <div className={"sidebar-icon delete-".concat(isDelete ? "active" : "inactive")}
                     data-option-type={"delete"}
                     onClick={handleSidebarDeleteClick}
                ></div>
                <div className={"selected-option-".concat(props.isEditorSidebar ? "active" : "inactive")}
                     id={"selected-option"}>
                </div>
            </div>
            <div className={`sidebar`.concat(props.isEditorSidebar ? "-active" : "-inactive")}>
                <div className={"sidebar-option"}
                     data-option-type={"editOff"}
                     onClick={handleEditOffClick}
                >
                    Edit off
                </div>

                {ENVIRONMENT_OPTIONS.map((option, index) => <div key={index}
                                                                 className={"sidebar-option"}
                                                                 data-image={option.cellUrl}
                                                                 data-cell-size={option.cellSize}
                                                                 data-speed={0}
                                                                 data-cell-shape = {option.cellShape ? option.cellShape : "tall"}
                                                                 data-cell-name={option.cellName}
                                                                 data-option-type={"environment"}
                                                                 data-terrain={option.cellTerrain}
                                                                 onClick={event => {
                                                                     event.stopPropagation();
                                                                     handleSidebarOptionClick(event)
                                                                 }}
                >{option.cellName} <img className={"sidebar-option-icon"}
                                        src={option.cellUrl}
                                        alt={option.cellName}/>
                </div>)}
            </div>
        </div>
    )
}

export default EditorSidebar;