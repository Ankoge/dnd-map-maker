import {PLAYER_OPTIONS} from "../data/playerOptions";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {ENVIRONMENT_OPTIONS} from "../data/environmentOptions";
import {useState} from "react";

export const ContextMenu = ({isContextMenu, contextTarget, onContextMenuChange}) => {
    const [contextButton, setContextButton] = useState("player")

    const handleContextOptionTypeChoose = (event) => {
        setContextButton(event.target.dataset.contexttype)
    }

    const handleContextOptionClick = (event) => {

        let eventTarget = event.target;

        if(eventTarget.className.includes("image")){
            eventTarget = eventTarget.parentElement;
        }

        const getCellByCellNumber = (row, cell) => {
            return document.getElementById(`${row}${cell}-cell`);
        }

        const setImage = (target) => {
            target.style.backgroundImage = `url("${eventTarget.dataset.image}")`;
            target.dataset.cellType = eventTarget.dataset.optionType;
        }

        const setImageToCells = () => {
            Object.entries(cells).forEach((cell) => {
                setImage(cell[1]);
                cell[1].className = `map-cell ${rowNumber}${cellNumber}-${size}-cell ${cell[0]}-cell ${size}-cell`;
            })
        }

        onContextMenuChange(false);

        if (eventTarget.dataset.optionType === "delete") {
            handleDelete();
            return;
        }

        const size = eventTarget.dataset.cellSize
        const rowNumber = parseInt(contextTarget.dataset.row, 10);
        const cellNumber = parseInt(contextTarget.dataset.cell, 10);
        const cells = {}

        switch (size) {
            case "medium":
                cells["full"] = contextTarget
                if (eventTarget.dataset.optionType === "player") {
                    contextTarget.dataset.speed = eventTarget.dataset.speed
                }
                setImageToCells()
                break;
            case "large":
                cells["top-left"] = contextTarget;
                cells["top-right"] = getCellByCellNumber(rowNumber, cellNumber + 1);
                cells["bottom-left"] = getCellByCellNumber(rowNumber + 1, cellNumber);
                cells["bottom-right"] = getCellByCellNumber(rowNumber + 1, cellNumber + 1);
                setImageToCells()
                break;
            case "huge":
                cells["top-left"] = contextTarget;
                cells["top-middle"] = getCellByCellNumber(rowNumber, cellNumber + 1);
                cells["top-right"] = getCellByCellNumber(rowNumber, cellNumber + 2);
                cells["middle-left"] = getCellByCellNumber(rowNumber + 1, cellNumber);
                cells["middle-middle"] = getCellByCellNumber(rowNumber + 1, cellNumber + 1);
                cells["middle-right"] = getCellByCellNumber(rowNumber + 1, cellNumber + 2);
                cells["bottom-left"] = getCellByCellNumber(rowNumber + 2, cellNumber);
                cells["bottom-middle"] = getCellByCellNumber(rowNumber + 2, cellNumber + 1);
                cells["bottom-right"] = getCellByCellNumber(rowNumber + 2, cellNumber + 2);
                setImageToCells()
                break;
            default:
                break;

        }
    }

    const handleDelete = () => {
        if (contextTarget.className.includes("medium")) {
            if (contextTarget.dataset.cellType === "player"){

            }
            contextTarget.dataset.speed = "0";
            contextTarget.className = "map-cell";
            contextTarget.style.backgroundImage = "none";
            contextTarget.dataset.cellType = "blank";
        } else if (contextTarget.className.includes("large")) {
            removeCellGroup("large");
        } else if (contextTarget.className.includes("huge")) {
            removeCellGroup("huge");
        }
    }

    const removeCellGroup = (groupSize) => {
        const cellGroupIdentifierClassname = contextTarget.className.split(" ")
            .find(className => className.includes(groupSize));

        const cellGroup = document.getElementsByClassName(cellGroupIdentifierClassname);

        Array.from(cellGroup).forEach(cell => {
            cell.className = "map-cell"
            cell.style.backgroundImage = "none"
            cell.dataset.cellType = "blank"
        })
    }


    const contextMenuOptionBuilder = (options, optionType) => {
        return options.map((option, index) => <span key={index}
                                                   className={"context-menu-option context-menu-option".concat(contextButton === optionType ? "-active" : "-inactive")}
                                                   data-image={option.cellUrl}
                                                   data-cell-size={option.cellSize}
                                                   data-speed={optionType === "player" ? option.speed : 0}
                                                   data-cell-name={option.cellName}
                                                   data-option-type={optionType}
                                                   onClick={handleContextOptionClick}
        >{option.cellName} <img className={"context-option-image"}
                                src={option.cellUrl}
                                alt={option.cellName}/>
        </span>)
    }

    const contextMenuButtonBuilder = (optionType, iconUrl) => {
        return (<button className={"context-menu-button".concat(contextButton === optionType ? "-active" : "")}
                        data-contexttype={optionType}
                        onClick={handleContextOptionTypeChoose}><img className={"context-menu-button-icon"}
                                                                     data-contexttype={optionType}
                                                                     src={iconUrl}
                                                                     alt={`${optionType}-icon`}/>
        </button>)
    }


    return (<div id="context-menu"
                 className={"context-menu context-menu-".concat(isContextMenu ? "active" : "inactive")}>
        <div className="context-menu-button-container">
            {contextMenuButtonBuilder("player", "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/45528/old-man-emoji-clipart-md.png")}
            {contextMenuButtonBuilder("monster", "https://cdn-icons-png.flaticon.com/512/606/606971.png?w=826&t=st=1667696345~exp=1667696945~hmac=1f56ef0adf25915f0f3c1e120dc9660126c7fe79e29f9c806eccb1008fcccaa2")}
            {contextMenuButtonBuilder("environment", "http://www.clker.com/cliparts/d/S/t/O/x/K/black-tree-md.png")}
        </div>
        <div key={"delete"}
             className={"context-menu-option"}
             data-image={""}
             data-cell-size={"medium"}
             data-option-type={"delete"}
             onClick={handleContextOptionClick}
        >Delete
        </div>
        {contextMenuOptionBuilder(PLAYER_OPTIONS, "player")}
        {contextMenuOptionBuilder(MONSTER_OPTIONS, "monster")}
        {contextMenuOptionBuilder(ENVIRONMENT_OPTIONS, "environment")}
    </div>)

}
