import {useState} from "react";
import {ENVIRONMENT_OPTIONS} from "../data/environmentOptions";

const EditorSidebar = props => {
    const [isDelete, setIsDelete] = useState(false);


    const handleEditorOpenClose = () => {
        props.onIsEditorSidebarChange(!props.isEditorSidebar);
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
    }

    const handleSidebarOptionClick = (event) => {
        setIsDelete(event.target.dataset.optionType === "delete")
        props.onIsEditChange(true);
        props.onSidebarOptionChange(event.target)
        document.getElementById("selected-option").style.backgroundImage = `url(${event.target.dataset.image})`
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
                                                                 data-cell-name={option.cellName}
                                                                 data-option-type={"environment"}
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