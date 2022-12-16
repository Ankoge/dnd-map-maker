import {PLAYER_OPTIONS} from "../data/playerOptions";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {ENVIRONMENT_OPTIONS} from "../data/environmentOptions";
import {useState} from "react";

export const ContextMenu = ({isContextMenu, contextTarget, onContextMenuChange}) => {
    const [contextButton, setContextButton] = useState("player")

    const handleContextOptionTypeChoose = (chosenType) => {
        setContextButton(chosenType.target.dataset.contexttype)
    }

    const handleContextOptionClick = (chosenOption) => {

        let option = chosenOption.target;

        // If you click on the image instead of the option, this will correct it.
        if (option.className.includes("image")) {
            option = option.parentElement;
        }


        const getCellByCellNumber = (row, cell) => {
            return document.getElementById(`${row}${cell}-cell`);
        }

        const setImage = () => {
            let target = document.getElementById(`${rowNumber}${cellNumber}-cell-image`)
            target.style.backgroundImage = `url("${option.dataset.image}")`;
            target.className = `cell-image ${size} ${shape} ${rowNumber}${cellNumber}-cell-image`
            target.parentElement.dataset.cellType = option.dataset.optionType;
            target.parentElement.dataset.imageSourceCell = `${rowNumber}${cellNumber}-cell-image`

        }

        const setCellGroupToReserved = (element) => {
            element.dataset.imageSourceCell = `${rowNumber}${cellNumber}-cell-image`
            element.dataset.imageGroupId = `${rowNumber}${cellNumber}-image-group`
            element.dataset.cellType = option.dataset.optionType;
            const className = `${element.dataset.row}${element.dataset.cell}-cell-group`
            const cellGroup = element.getElementsByClassName(className)
            Array.from(cellGroup).forEach(groupElement => {
                groupElement.classList.add(`${rowNumber}${cellNumber}-image-group`, "reserved")
            })

        }

        onContextMenuChange(false);

        if (option.dataset.optionType === "delete") {
            handleDelete();
            return;
        }

        const size = option.dataset.cellSize
        const shape = option.dataset.cellShape
        const rowNumber = parseInt(contextTarget.row, 10);
        const cellNumber = parseInt(contextTarget.cell, 10);
        const cells = []

        switch (size) {
            case "medium":
                setImage()
                break;
            case "large":
                setCellGroupToReserved(getCellByCellNumber(rowNumber, cellNumber))
                setCellGroupToReserved(getCellByCellNumber(rowNumber, cellNumber + 1))
                setCellGroupToReserved(getCellByCellNumber(rowNumber + 1, cellNumber))
                setImage()
                break;
            case "huge":
                cells.push(contextTarget)
                cells.push( getCellByCellNumber(rowNumber, cellNumber + 1))
                cells.push(getCellByCellNumber(rowNumber, cellNumber + 2))
                cells.push(getCellByCellNumber(rowNumber + 1, cellNumber))
                cells.push( getCellByCellNumber(rowNumber + 1, cellNumber + 1))
                cells.push(getCellByCellNumber(rowNumber + 1, cellNumber + 2))
                cells.push(getCellByCellNumber(rowNumber + 2, cellNumber))
                cells.push(getCellByCellNumber(rowNumber + 2, cellNumber + 1))
                cells.push(getCellByCellNumber(rowNumber + 2, cellNumber + 2))

                break;
            default:
                break;

        }
    }

    const handleDelete = () => {
        const targetCell = document.getElementById(`${contextTarget.row}${contextTarget.cell}-cell`);
        const imageSourceCell = targetCell.dataset.imageSourceCell;
        const targetImage = document.getElementById(imageSourceCell);
        targetImage.style.backgroundImage = "none";
        targetImage.className = `cell-image medium ${imageSourceCell}`;
        const imageGroupId = targetCell.dataset.imageGroupId;
        const imageGroup = document.getElementsByClassName(imageGroupId)
        Array.from(imageGroup).forEach(element => {
            element.classList.remove(imageGroupId ,"reserved")
        })
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
                                                    data-cell-shape={option.cellShape ? option.cellShape : "tall"}
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
