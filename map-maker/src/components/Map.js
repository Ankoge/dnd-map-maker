import {ContextMenu} from "./ContextMenu";
import {useRef, useState} from "react";
import EditorSidebar from "./EditorSidebar";
import {SHAPE_OPTION, SIZE_OPTION, TYPE_OPTION} from "../data/options";


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
        if (option.className.includes("cell-option")) {
            option = option.parentElement;
        }


        const setImage = () => {
            let imageCellPart = document.getElementById(`${rowNumber}${cellNumber}-cell-image${option.dataset.optionType === TYPE_OPTION.ENVIRONMENT ? "-terrain" : ""}`)
            imageCellPart.style.backgroundImage = `url("${option.dataset.image}")`;
            imageCellPart.className = `cell-image ${size} ${shape} ${rowNumber}${cellNumber}-cell-image`
            setParentCell(imageCellPart.parentElement)
            if (type === TYPE_OPTION.PLAYER || type === TYPE_OPTION.MONSTER) {
                setShadow()
                imageCellPart.parentElement.dataset.playerId = `${option.dataset.image}${option.dataset.cellName}`
            }
            if (type === TYPE_OPTION.PLAYER) {
                imageCellPart.parentElement.dataset.speed = option.dataset.speed;
            }

        }

        const setShadow = () => {
            const middleCellPart = document.getElementById(`middle-${rowNumber}${cellNumber}`);
            switch (size) {
                case SIZE_OPTION.SMALL:
                case SIZE_OPTION.MEDIUM:
                    middleCellPart.classList.add("shadow");
                    break;
                default:
                    break;
            }
        }
        const setParentCell = (parentCell) => {
            if (parentCell === null) {
                return;
            }
            parentCell.dataset.terrain = option.dataset.terrain;
            parentCell.dataset.cellType = type;
            parentCell.dataset.imageSourceCell = `${rowNumber}${cellNumber}-cell-image`;
            parentCell.dataset.imageGroupId = `${rowNumber}${cellNumber}-image-group`;
            parentCell.dataset.cellSize = type === TYPE_OPTION.ENVIRONMENT ? parentCell.dataset.cellSize : size;
            parentCell.dataset.speed = type === TYPE_OPTION.PLAYER ? option.dataset.speed : "";
            if (type !== TYPE_OPTION.ENVIRONMENT) {
                parentCell.style.backgroundColor = "var(--reserved)";
                parentCell.style.borderColor = "var(--reserved)";
            }

        }

        setIsContextMenu(false);
        const rowNumber = parseInt(contextTarget.current.row, 10);
        const cellNumber = parseInt(contextTarget.current.cell, 10);
        if (!rowNumber || !cellNumber) {
            return;
        }
        const type = option.dataset.optionType;
        if (type === TYPE_OPTION.DELETE) {
            if (isTerrainRemove){
                deleteEnvironment(rowNumber, cellNumber);
            } else {
                handleDelete(rowNumber, cellNumber);
            }
            return;
        }

        const size = option.dataset.cellSize;
        const shape = option.dataset.cellShape ? option.dataset.cellShape : SHAPE_OPTION.TALL;

        if (type === TYPE_OPTION.PLAYER || type === TYPE_OPTION.MONSTER) {
            const playerDuplicates = document.querySelectorAll('[data-player-id="'.concat(`${option.dataset.image}${option.dataset.cellName}`).concat('"]'))
            if (playerDuplicates.length > 0) {
                playerDuplicates.forEach(duplicate => handleDelete(duplicate.dataset.row, duplicate.dataset.cell))

            }
        }

        switch (size) {
            case SIZE_OPTION.TINY:
            case SIZE_OPTION.SMALL:
            case SIZE_OPTION.MEDIUM:
                setImage();
                break;
            case SIZE_OPTION.LARGE:
                setImage();
                setParentCell(getCellByCellNumber(rowNumber, cellNumber - 1));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2 - 1));
                break;
            case SIZE_OPTION.HUGE:
                setImage();
                setParentCell(getCellByCellNumber(rowNumber, cellNumber - 1));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2 - 2));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2 - 1));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2));
                setParentCell(getCellByCellNumber(rowNumber - 2, cellNumber - 1));
                setParentCell(getCellByCellNumber(rowNumber - 2, cellNumber));
                break;
            case SIZE_OPTION.GARGANTUA:
                setImage();
                setParentCell(getCellByCellNumber(rowNumber, cellNumber - 1));
                setParentCell(getCellByCellNumber(rowNumber, cellNumber - 2));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2 - 3));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2 - 2));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2 - 1));
                setParentCell(getCellByCellNumber(rowNumber - 1, cellNumber + rowNumber % 2));
                setParentCell(getCellByCellNumber(rowNumber - 2, cellNumber - 2))
                setParentCell(getCellByCellNumber(rowNumber - 2, cellNumber - 1));
                setParentCell(getCellByCellNumber(rowNumber - 2, cellNumber));
                setParentCell(getCellByCellNumber(rowNumber - 3, cellNumber + rowNumber % 2 - 2));
                setParentCell(getCellByCellNumber(rowNumber - 3, cellNumber + rowNumber % 2 - 1));
                break;
            default:
                break;

        }
    }

    const deleteEnvironment = (row, cell) => {
        const parentCell = document.getElementById(`${row}${cell}-cell`);
        const imageSourceCell = `${row}${cell}-cell-image-terrain`;
        const imageCellPart = document.getElementById(imageSourceCell);
        parentCell.dataset.terrain = "movable"
        imageCellPart.className = imageSourceCell;
        imageCellPart.style.backgroundImage = "none";


    }

    const handleDelete = (row, cell) => {
        const parentCell = document.getElementById(`${row}${cell}-cell`);
        const imageSourceCell = `${row}${cell}-cell-image`;
        const imageCellPart = document.getElementById(imageSourceCell);
        removeShadow(parseInt(row, 10), parseInt(cell, 10), parentCell.dataset.cellSize);
        parentCell.removeAttribute("data-player-id");
        parentCell.classList.remove("reserved")
        resetGroup(parentCell);
        parentCell.dataset.cellType = TYPE_OPTION.BLANK;
        parentCell.dataset.cellSize = SIZE_OPTION.MEDIUM;
        imageCellPart.style.backgroundImage = "none";
        imageCellPart.className = `cell-image ${TYPE_OPTION.BLANK} ${imageSourceCell}`;

    }

    const resetGroup = (targetParentCell) => {
        const groupParentCells = document.querySelectorAll(`[data-image-group-id = "${targetParentCell.dataset.imageGroupId}"]`)
        groupParentCells.forEach(parentCell => {
            parentCell.dataset.cellType = TYPE_OPTION.BLANK;
            parentCell.dataset.imageGroupId = "";
            parentCell.dataset.imageSourceCell = "";
            parentCell.style.backgroundColor = "var(--hex-background)";
            parentCell.style.borderColor = "var(--hex-background)";
        })
    }

    const removeShadow = (row, cell, size) => {
        const middleCellPart = document.getElementById(`middle-${row}${cell}`)
        switch (size) {
            case SIZE_OPTION.SMALL:
            case SIZE_OPTION.MEDIUM:
                middleCellPart.classList.remove("shadow");
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

        //If sidebar edit is active change hex image to selected environment image.
        if (isEdit) {
            changeCellToSideBarOption(event.target.parentElement)
        }
    }


    const changeCellToSideBarOption = (parentCell) => {
        //Bypass the useState slow update with concrete parameters.
        contextTarget.current.row = parentCell.dataset.row;
        contextTarget.current.cell = parentCell.dataset.cell;
        const removeTerrain = true
        setCellProperties(sidebarOptionTarget, removeTerrain);

    }

    //Recursive function.
    const collectMovableHexes = (row, cell, speed, step, size, movableBuild) => {

        if (!movableBuild.has(`${row}${cell}` && step !== 0)) {
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

            //Return is hex is a creature, except player is small or tiny.
            if ((parentCell.dataset.cellType === TYPE_OPTION.MONSTER || parentCell.dataset.cellType === TYPE_OPTION.PLAYER)
                && !(size === SIZE_OPTION.SMALL || size === SIZE_OPTION.TINY)
                && step !== 0) {
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
        }

        //Avoiding regression to an area already under investigation.


        //Update parameters.
        step = step + 1;
        row = parseInt(row, 10);
        cell = parseInt(cell, 10);

        //Recursively call all neighbour hexes.
        movableBuild = collectMovableHexes(row - 1, cell + (row % 2), speed, step, size, movableBuild);
        movableBuild = collectMovableHexes(row, cell + 1, speed, step, size, movableBuild);
        movableBuild = collectMovableHexes(row + 1, cell + (row % 2), speed, step, size, movableBuild);
        movableBuild = collectMovableHexes(row + 1, cell + (-1 + row % 2), speed, step, size, movableBuild);
        movableBuild = collectMovableHexes(row, cell - 1, speed, step, size, movableBuild);
        movableBuild = collectMovableHexes(row - 1, cell + (-1 + row % 2), speed, step, size, movableBuild);

        return movableBuild;
    }


    function handleMouseEnter(event) {
        const parentCell = event.target.parentElement;

        //Continuous hex image (environment image) placement when mouse down and enter a cell.
        if (isMouseDown && isEdit) {
            //Here change te cell to the chosen environment type.
            changeCellToSideBarOption(parentCell)
            return;
        }

        //Look after the possible hexes for the player move.
        if (parentCell.dataset.cellType === TYPE_OPTION.PLAYER) {
            let movableBuild = new Set();
            if (parentCell.dataset.cellSize === SIZE_OPTION.LARGE) {
                const groupParentCells = document.querySelectorAll(`[data-image-group-id = "${parentCell.dataset.imageGroupId}"]`)
                groupParentCells.forEach(pc => {
                    movableBuild = collectMovableHexes(
                        pc.dataset.row,
                        pc.dataset.cell,
                        parseInt(pc.dataset.speed, 10),
                        0,
                        pc.dataset.cellSize,
                        movableBuild
                    )
                })
            } else {
                movableBuild = collectMovableHexes(
                    parentCell.dataset.row,
                    parentCell.dataset.cell,
                    parseInt(parentCell.dataset.speed, 10),
                    0,
                    parentCell.dataset.cellSize,
                    movableBuild
                )
            }

            //Trigger a render for the selected hexes with a state change.
            setMovable({cells: movableBuild});
        }
    }

    //Creates a 2-dimensional matrix of hexes.
    const mapBuilder = () => {
        let map = [];

        for (let rowNumber = 0; rowNumber <= mapSize; rowNumber++) {
            let row = [];
            for (let cellNumber = 0; cellNumber <= mapSize; cellNumber++) {

                //The id will come from the row- and cell- stringify form. This modification will avoid id duplication.
                const calculatedRowNumber = 10000 + rowNumber;
                const calculatedCellNumber = 10000 + cellNumber;
                row.push(<div key={`${calculatedRowNumber}${calculatedCellNumber}-cell`}
                              data-row={calculatedRowNumber}
                              data-cell={calculatedCellNumber}
                              data-cell-type={TYPE_OPTION.BLANK}
                              data-cell-size={""}
                              data-speed={0}
                              id={`${calculatedRowNumber}${calculatedCellNumber}-cell`}
                              className={`map-cell hex ${calculatedRowNumber}${calculatedCellNumber}-cell${movable.cells.has(`${calculatedRowNumber}${calculatedCellNumber}`) ? " movable" : ""}`}
                              onMouseEnter={handleMouseEnter}
                >
                    <div className={`middle ${calculatedRowNumber}${calculatedCellNumber}-cell-group`}
                         id={`middle-${calculatedRowNumber}${calculatedCellNumber}`}
                    ></div>
                    <div
                        className={`cell-image  ${TYPE_OPTION.BLANK} ${calculatedRowNumber}${calculatedCellNumber}-cell-image-terrain`}
                        data-z-index={rowNumber * 2}
                        id={`${calculatedRowNumber}${calculatedCellNumber}-cell-image-terrain`}></div>
                    <div
                        className={`cell-image  ${TYPE_OPTION.BLANK} ${calculatedRowNumber}${calculatedCellNumber}-cell-image`}
                        data-z-index={rowNumber * 2 - 1}
                        id={`${calculatedRowNumber}${calculatedCellNumber}-cell-image`}></div>

                </div>)
            }

            map.push(<div key={rowNumber}
                          className={`map-row hex-row${rowNumber % 2 === 0 ? "" : " even"}`}
            >{row}</div>)
        }

        //This ternary expression need to move the whole map a bit right to make place for the
        //sidebar when the map fully scrolled to the left.
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