import {ContextMenu} from "./ContextMenu";
import {useRef, useState} from "react";
import EditorSidebar from "./EditorSidebar";


const Map = ({mapSize, isMouseDown}) => {

    const [isContextMenu, setIsContextMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [sidebarOptionTarget, setSidebarOptionTarget] = useState(null);
    const [isEditorSidebar, setIsEditorSidebar] = useState(false);
    const [movable, setMovable] = useState({
        cells: new Set()
    })
    const contextTarget = useRef({
        row: "",
        cell: "",
    });

    const clearMovable = () => {
        const cells = movable.cells;
        cells.clear()
        setMovable({cells: cells});
    }

    const getCellByCellNumber = (row, cell) => {
        return document.getElementById(`${row}${cell}-cell`);
    }

    const setCellProperties = (option, isTerrainRemove) => {
        clearMovable();

        // If you click on the image instead of the option, this will correct it.
        if (option.className.includes("image")) {
            option = option.parentElement;
        }


        const setImage = () => {
            let imageCellPart = document.getElementById(`${rowNumber}${cellNumber}-cell-image${option.dataset.optionType === "environment" ? "-terrain" : ""}`)
            imageCellPart.style.backgroundImage = `url("${option.dataset.image}")`;
            imageCellPart.className = `cell-image ${size} ${shape} ${rowNumber}${cellNumber}-cell-image ${option.dataset.optionType === "monster" || option.dataset.optionType === "player" ? " living" : ""}`
            setParentCell(imageCellPart.parentElement)
            if (type === "player" || type === "monster") {
                setShadow()
            }
        }

        const setShadow = () => {
            const middleCellPart = document.getElementById(`middle-${rowNumber}${cellNumber}`);
            switch (size) {
                case "small":
                case "medium":
                    middleCellPart.classList.add("shadow");
                    break;
                case "large":
                    middleCellPart.classList.add("shadow-left");
                    document.getElementById(`middle-${rowNumber}${cellNumber + 1}`).classList.add("shadow-right");
                    break;
                case "huge":
                    document.getElementById(`middle-${rowNumber + 1}${cellNumber + rowNumber % 2 - 1}`).classList.add("shadow-left");
                    document.getElementById(`middle-${rowNumber + 1}${cellNumber + rowNumber % 2}`).classList.add("shadow-right");
                    break;
                default:
                    break;
            }
        }

        const setParentCell = (parentCell) => {
            parentCell.dataset.terrain = option.dataset.terrain;
            parentCell.dataset.cellType = type;
            parentCell.dataset.imageSourceCell = `${rowNumber}${cellNumber}-cell-image`;
            parentCell.dataset.imageGroupId = `${rowNumber}${cellNumber}-image-group`;
            parentCell.dataset.cellSize = type === "environment" ? parentCell.dataset.cellSize : size;
            if (type === "player") {
                parentCell.dataset.speed = option.dataset.speed;
                parentCell.dataset.playerId = `${option.dataset.image}${option.dataset.cellName}`
            }
        }

        setIsContextMenu(false);
        const rowNumber = parseInt(contextTarget.current.row, 10);
        const cellNumber = parseInt(contextTarget.current.cell, 10);
        if(!rowNumber||!cellNumber){return;}

        if (option.dataset.optionType === "delete") {
            handleDelete(rowNumber, cellNumber, isTerrainRemove);
            return;
        }

        const size = option.dataset.cellSize;
        const shape = option.dataset.cellShape ? option.dataset.cellShape : "tall";
        const type = option.dataset.optionType;

        if (type === "player") {
            const playerDuplicate = document.querySelector('[data-player-id="'.concat(`${option.dataset.image}${option.dataset.cellName}`).concat('"]'))
            if (playerDuplicate) {
                handleDelete(playerDuplicate.dataset.row, playerDuplicate.dataset.cell,false)
            }
        }

        switch (size) {
            case "tiny":
            case "small":
            case "medium":
                setImage();
                break;
            case "large":
                setImage();
                setParentCell(getCellByCellNumber(rowNumber, cellNumber + 1));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2));
                break;
            case "huge":
                setImage();
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2));
                setParentCell(getCellByCellNumber(rowNumber, cellNumber + 1));
                setParentCell(getCellByCellNumber(rowNumber + 1, cellNumber + rowNumber % 2));
                setParentCell(getCellByCellNumber(rowNumber + 1, cellNumber + rowNumber % 2 - 1));
                setParentCell(getCellByCellNumber(rowNumber, cellNumber - 1));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2 - 1));
                break;
            default:
                break;

        }
    }

    const handleDelete = (row, cell, isTerrainRemove) => {
        let classNameModifier = ""
        if (isTerrainRemove) {
            classNameModifier = "-terrain"
        }
        const parentCell = document.getElementById(`${row}${cell}-cell`);
        const imageSourceCell = `${row}${cell}-cell-image${classNameModifier}`;
        const imageCellPart = document.getElementById(imageSourceCell);
        removeShadow(row, cell, parentCell.dataset.cellSize);

        if(parentCell.dataset.cellType === "player") {
            parentCell.removeAttribute("data-player-id");
        }
        if (parentCell.dataset.cellSize === "large" || parentCell.dataset.cellSize === "huge") {
            resetGroup(parentCell);
        } else {
            parentCell.dataset.terrain = "movable";
        }
        parentCell.dataset.cellSize = "medium";
        parentCell.dataset.cellType = "blank";
        imageCellPart.style.backgroundImage = "none";
        imageCellPart.className = `cell-image medium blank ${imageSourceCell}`;

    }

    const resetGroup = (targetParentCell) => {
        const groupParentCells = document.querySelectorAll(`[data-image-group-id = "${targetParentCell.dataset.imageGroupId}"]`)
        groupParentCells.forEach(parentCell => {
            parentCell.dataset.terrain = "movable";
            parentCell.dataset.imageGroupId = "";
            parentCell.dataset.imageSourceCell = "";
        })
    }

    const removeShadow = (row, cell, size) => {
        const middleCellPart = document.getElementById(`middle-${row}${cell}`)
        switch (size) {
            case "small":
            case "medium":
                middleCellPart.classList.remove("shadow");
                break;
            case "large":
                middleCellPart.classList.remove("shadow-left");
                document.getElementById(`middle-${row}${cell + 1}`).classList.remove("shadow-right");
                break;
            case "huge":
                document.getElementById(`middle-${row + 1}${cell + row % 2 - 1}`).classList.remove("shadow-left");
                document.getElementById(`middle-${row + 1}${cell + row % 2}`).classList.remove("shadow-right");
                break;
            default:
                break;
        }
    }

    const handleRightClick = (event) => {
        event.preventDefault();
        const parentElement = event.target.parentElement;

        if (parentElement.dataset.row && parentElement.dataset.cell) {
            setIsContextMenu(true);
            const contextMenu = document.getElementById("context-menu");
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.left = `${event.pageX}px`;
            contextTarget.current.row = parentElement.dataset.row;
            contextTarget.current.cell = parentElement.dataset.cell;
        }
    }

    const handleLeftClick = (event) => {
        setIsContextMenu(false)
        clearMovable()
        if (isEdit) {
            changeCellToSideBarOption(event.target.parentElement)
        }
    }


    const changeCellToSideBarOption = (parentCell) => {
        const removeTerrain = true
        //Bypass the useState slow update with concrete parameters.
        contextTarget.current.row = parentCell.dataset.row;
        contextTarget.current.cell = parentCell.dataset.cell;
        setCellProperties(sidebarOptionTarget, removeTerrain);

    }

    //Recursive function.
    const setMovableHexes = (row, cell, speed, step, size, movableBuild) => {
        const parentCell = getCellByCellNumber(row, cell)

        //Early return if out of map.
        if (parentCell === null) {
            return movableBuild;
        }

        //Extract a plus movement on hard terrain.
        if (parentCell.dataset.terrain === "hard") {
            step = step + 1
        }

        //Return if hex is not movable or out of step.
        if (speed < step || (parentCell.dataset.terrain === "unmovable" && step !== 0)) {
            return movableBuild;
        }

        //Return is hex is a creature, except you are small or tiny.
        if (parentCell.dataset.terrain === "creature" && !(size === "small" || size === "tiny") && step !== 0) {
            return movableBuild;
        }

        //Set hex movable.
        if (!movableBuild.has(`${row}${cell}`)) {
            movableBuild.add(`${row}${cell}`)
        }

        //If terrain "catch" player here is an early return.
        if (parentCell.dataset.terrain === "catch") {
            return movableBuild;
        }

        //Avoiding regression to an area already under investigation.
        if(movableBuild.has(`${row}${cell}`&& step !== 0)){
            return movableBuild
        }

        //Update parameters.
        step = step + 1;
        row = parseInt(row, 10);
        cell = parseInt(cell, 10);

        //Recursively call all neighbour hexes.
        movableBuild = setMovableHexes(row - 1, cell + (row % 2), speed, step, size, movableBuild);
        movableBuild = setMovableHexes(row, cell + 1, speed, step, size, movableBuild);
        movableBuild = setMovableHexes(row + 1, cell + (row % 2), speed, step, size, movableBuild);
        movableBuild = setMovableHexes(row + 1, cell + (-1 + row % 2), speed, step, size, movableBuild);
        movableBuild = setMovableHexes(row, cell - 1, speed, step, size, movableBuild);
        movableBuild = setMovableHexes(row - 1, cell + (-1 + row % 2), speed, step, size, movableBuild);

        return movableBuild;
    }


    function handleMouseEnter(event) {
        const parentCell = event.target.parentElement;
        if (isMouseDown && isEdit) {
            //
            changeCellToSideBarOption(parentCell)
            return;
        }
        if (parentCell.dataset.cellType === "player") {
            const movableBuild = setMovableHexes(
                parentCell.dataset.row,
                parentCell.dataset.cell,
                parseInt(parentCell.dataset.speed, 10),
                0,
                parentCell.dataset.cellSize,
                new Set()
            )
            setMovable({cells: movableBuild});
        }
    }

    const mapBuilder = () => {
        let map = [];

        for (let rowNumber = 0; rowNumber <= mapSize; rowNumber++) {
            let row = [];
            for (let cellNumber = 0; cellNumber <= mapSize; cellNumber++) {
                const calculatedRowNumber = 1000 + rowNumber;
                const calculatedCellNumber = 1000 + cellNumber;
                row.push(<div key={`${calculatedRowNumber}${calculatedCellNumber}-cell`}
                              data-row={calculatedRowNumber}
                              data-cell={calculatedCellNumber}
                              data-cell-type={"blank"}
                              data-cell-size={"middle"}
                              data-speed={0}
                              id={`${calculatedRowNumber}${calculatedCellNumber}-cell`}
                              className={`map-cell hex ${calculatedRowNumber}${calculatedCellNumber}-cell${movable.cells.has(`${calculatedRowNumber}${calculatedCellNumber}`) ? " movable" : ""}`}
                              onMouseEnter={handleMouseEnter}
                >
                    <div className={`top ${calculatedRowNumber}${calculatedCellNumber}-cell-group`}></div>
                    <div className={`middle ${calculatedRowNumber}${calculatedCellNumber}-cell-group`}
                         id={`middle-${calculatedRowNumber}${calculatedCellNumber}`}></div>

                    <div className={`bottom ${calculatedRowNumber}${calculatedCellNumber}-cell-group`}></div>
                    <div
                        className={`cell-image medium blank ${calculatedRowNumber}${calculatedCellNumber}-cell-image-terrain`}
                        data-z-index={rowNumber * 2}
                        id={`${calculatedRowNumber}${calculatedCellNumber}-cell-image-terrain`}></div>
                    <div className={`cell-image medium blank ${calculatedRowNumber}${calculatedCellNumber}-cell-image`}
                         data-z-index={rowNumber * 2 - 1}
                         id={`${calculatedRowNumber}${calculatedCellNumber}-cell-image`}></div>

                </div>)
            }

            map.push(<div key={rowNumber}
                          className={`map-row hex-row${rowNumber % 2 === 0 ? "" : " even"}`}
            >{row}</div>)
        }

        return (<div className={"map map-editor-sidebar-".concat(isEditorSidebar ? "active" : "inactive")}
                     onContextMenu={handleRightClick}
                     onClick={handleLeftClick}>
            <div>{map}</div>
        </div>)
    }

    return (<div className="map-div">
        <ContextMenu
            isContextMenu={isContextMenu}
            onContextMenuChange={setIsContextMenu}
            contextTarget={contextTarget}
            setCellProperties={setCellProperties}
        />
        {mapBuilder()}
        <EditorSidebar
            isEditorSidebar={isEditorSidebar}
            onIsEditorSidebarChange={setIsEditorSidebar}
            onIsEditChange={setIsEdit}
            onSidebarOptionChange={setSidebarOptionTarget}
        />
    </div>)
}

export default Map;