import {useRef, useState} from "react";
import {ENVIRONMENT_OPTIONS} from "../data/environmentOptions";
import {SHAPE_OPTION, OPTION_TYPE} from "../data/options";
import {SOIL_OPTIONS} from "../data/soilOptions";

const EditorSidebar = props => {
    const [isDeleteOption, setIsDeleteOption] = useState(false);
    const timeOut = useRef(NaN);

    const handleEditorOpenClose = () => {
        props.onIsEditorSidebarChange(!props.isEditorSidebar);
        handleEditOffClick();
    }

    const handleSidebarDeleteClick = () => {
        clearTimeout(timeOut.current)
        if (props.isDelete) {
            setIsDeleteOption(false)
        } else {
            handleEditOffClick()
            setIsDeleteOption(true);
            timeOut.current = setTimeout(() => setIsDeleteOption(false), 5000)
        }
        props.onDeleteChange(!props.isDelete);
    }

    const handleSidebarOptionClick = (event) => {
        let eventTarget = event.target;

        if (eventTarget.className.includes("option-icon")) {
            eventTarget = eventTarget.parentElement;
        }
        props.onDeleteChange(eventTarget.className.includes("delete"));
        props.onEditChange(true);
        props.onSidebarOptionChange.current = eventTarget;
        document.getElementById("selected-option").style.backgroundImage = `url(${eventTarget.dataset.image})`;
    }

    const handleEditOffClick = () => {
        props.onEditChange(false);
        document.getElementById("selected-option").style.backgroundImage = "none";
        props.onSidebarOptionChange.current = null;
    }

    function handleDeleteOptionClick(event) {
        props.deleteOption.current = event.target.dataset.deleteType;
        setIsDeleteOption(false);
    }

    function handleDeleteMouseEnter() {
        if (props.isDelete) {
            setIsDeleteOption(true);
            setDeleteOptionTimeout();
        }

    }

    function killDeleteOptionTimeout() {
        clearTimeout(timeOut.current);
    }

    function setDeleteOptionTimeout() {
        clearTimeout(timeOut.current);
        timeOut.current = setTimeout(() => setIsDeleteOption(false), 2500);
    }

    return (
        <div className={"sidebar-container"}>
            <div className={"editor-icon-container"}>
                <div className={"sidebar-icon"}
                     style={{backgroundImage: `url("https://cdn.discordapp.com/attachments/894595052427431936/1039958318002741298/edit-icon.png")`}}
                     onClick={handleEditorOpenClose}
                ></div>
                <div className={"selected-option-".concat(props.isEditorSidebar ? "active" : "inactive")}
                     id={"selected-option"}>
                </div>
                <div className={"sidebar-icon delete-".concat(props.isDelete ? "active" : "inactive")}
                     data-option-type={"delete"}
                     onClick={handleSidebarDeleteClick}
                     onMouseEnter={handleDeleteMouseEnter}
                ></div>
                <div className={"delete-option-container"}
                     onMouseEnter={killDeleteOptionTimeout}
                     onMouseLeave={setDeleteOptionTimeout}>
                    <div
                        className={"sidebar-icon delete-option-one delete-option-"
                            .concat(isDeleteOption ? "active" : "inactive")
                            .concat(OPTION_TYPE.SOIL === props.deleteOption.current ? " chosen" : "")}
                        data-delete-type={OPTION_TYPE.SOIL}
                        onClick={handleDeleteOptionClick}

                    ></div>
                    <div
                        className={"sidebar-icon delete-option-two delete-option-"
                            .concat(isDeleteOption ? "active" : "inactive")
                            .concat(OPTION_TYPE.ENVIRONMENT === props.deleteOption.current ? " chosen" : "")}
                        data-delete-type={OPTION_TYPE.ENVIRONMENT}
                        onClick={handleDeleteOptionClick}
                    ></div>
                    <div
                        className={"sidebar-icon delete-option-three delete-option-"
                            .concat(isDeleteOption ? "active" : "inactive")
                            .concat(OPTION_TYPE.CREATURE === props.deleteOption.current ? " chosen" : "")}
                        data-delete-type={OPTION_TYPE.CREATURE}
                        onClick={handleDeleteOptionClick}
                    ></div>
                </div>
            </div>
            <div className={`sidebar`.concat(props.isEditorSidebar ? "-active" : "-inactive")}>
                {SOIL_OPTIONS.map((option, index) => <div key={`${index}-${option.cellName}`}
                                                          className={"sidebar-option soil"}
                                                          data-image={option.cellUrl}
                                                          data-option-type={OPTION_TYPE.SOIL}
                                                          data-terrain={option.cellTerrain}
                                                          onClick={event => {
                                                              event.stopPropagation();
                                                              handleSidebarOptionClick(event)
                                                          }}
                >{option.cellName} <img className={"sidebar-option-icon"}
                                        src={option.cellUrl}
                                        alt={option.cellName}/>
                </div>)}
                {ENVIRONMENT_OPTIONS.map((option, index) => <div key={`${index}-${option.cellName}`}
                                                                 className={"sidebar-option environment"}
                                                                 data-image={option.cellUrl}
                                                                 data-cell-size={option.cellSize}
                                                                 data-cell-shape={option.cellShape ? option.cellShape : SHAPE_OPTION.TALL.name}
                                                                 data-option-type={OPTION_TYPE.ENVIRONMENT}
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