import {ContextMenu} from "./ContextMenu";
import {useRef, useState} from "react";
import EditorSidebar from "./EditorSidebar";
import {SHAPE_OPTION, SIZE_OPTION, TERRAIN, TYPE_OPTION} from "../data/options";
import HexCell from "./HexCell";
import SaveMap from "./SaveMap";


const Map = ({mapSize, isMouseDown}) => {
    const [isDelete, setIsDelete] = useState(false);
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [sidebarOptionTarget, setSidebarOptionTarget] = useState(null);
    const [isEditorSidebar, setIsEditorSidebar] = useState(false);
    const deleteOption = useRef(TYPE_OPTION.ENVIRONMENT);
    const [movable, setMovable] = useState({
        cells: new Set(),
    })
    const contextTarget = useRef({
        row: "",
        cell: "",
    });

    const clearMovable = () => {
        const cells = movable.cells;
        cells.clear();
        setMovable({cells: cells});
    }

    const setCellProperties = (option) => {
        clearMovable();

        // If you click on the image instead of the option, this will correct it.
        if (option.className.includes("cell-option")) {
            option = option.parentElement;
        }

        setIsContextMenu(false);
        const rowNumber = parseInt(contextTarget.current.row, 10);
        const cellNumber = parseInt(contextTarget.current.cell, 10);
        if (!rowNumber || !cellNumber) {
            return;
        }
        const type = option.dataset.optionType;
        const size = option.dataset.cellSize;
        const shape = option.dataset.cellShape ? option.dataset.cellShape : SHAPE_OPTION.TALL;

        switch (type) {
            case TYPE_OPTION.ENVIRONMENT:
                setEnvironment(rowNumber, cellNumber, size, shape, option.dataset.terrain, option.dataset.image);
                break;
            case TYPE_OPTION.SOIL:
                setSoil(rowNumber, cellNumber, option.dataset.terrain, option.dataset.image);
                break;
            case TYPE_OPTION.PLAYER:
            case TYPE_OPTION.MONSTER:
                const playerDuplicates = document.querySelectorAll(
                    '[data-creature-id="'
                        .concat(`${option.dataset.image}${option.dataset.cellName}`)
                        .concat('"]'))
                if (playerDuplicates.length > 0) {
                    playerDuplicates.forEach(duplicate => deleteCreature(duplicate));
                }
                const creatureId = `${option.dataset.image}${option.dataset.cellName}`;
                const imageSource = `${rowNumber}${cellNumber}-cell-image-${TYPE_OPTION.CREATURE}`;
                const groupId = `${rowNumber}${cellNumber}-image-group-${TYPE_OPTION.CREATURE}`;
                const speed = option.dataset.speed ? option.dataset.speed : 0;
                setCreature(rowNumber, cellNumber, size, shape, option.dataset.image, creatureId)

                switch (size) {
                    case SIZE_OPTION.TINY:
                    case SIZE_OPTION.SMALL:
                    case SIZE_OPTION.MEDIUM:
                        setCreatureCellGroup(rowNumber, cellNumber, groupId, imageSource, type, speed, size);
                        break;
                    case SIZE_OPTION.LARGE:
                        setCreatureCellGroup(rowNumber, cellNumber, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber, cellNumber - 1, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2 - 1, groupId, imageSource, type, speed, size);
                        break;
                    case SIZE_OPTION.HUGE:
                        setCreatureCellGroup(rowNumber, cellNumber, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber, cellNumber - 1, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2 - 2, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2 - 1, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 2, cellNumber - 1, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 2, cellNumber, groupId, imageSource, type, speed, size);
                        break;
                    case SIZE_OPTION.GARGANTUA:
                        setCreatureCellGroup(rowNumber, cellNumber, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber, cellNumber - 1, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber, cellNumber - 2, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2 - 3, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2 - 2, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2 - 1, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 1, cellNumber + rowNumber % 2, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 2, cellNumber - 2, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 2, cellNumber - 1, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 2, cellNumber, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 3, cellNumber + rowNumber % 2 - 2, groupId, imageSource, type, speed, size);
                        setCreatureCellGroup(rowNumber - 3, cellNumber + rowNumber % 2 - 1, groupId, imageSource, type, speed, size);
                        break;
                    default:
                        break;
                }
        }
    }

    const setCreature = (row, column, size, shape, imageUrl, creatureId) => {
        const imageCell = document.getElementById(`${row}${column}-cell-image-${TYPE_OPTION.CREATURE}`);
        imageCell.className = `cell-image ${size} ${shape} ${row}${column}-cell-image-${TYPE_OPTION.CREATURE}`;
        imageCell.style.backgroundImage = `url("${imageUrl}")`;
        const cellContainer = imageCell.parentElement;
        cellContainer.dataset.creatureId = creatureId;
    }

    const setCreatureCellGroup = (row, column, groupId, imageSource, type, speed, size) => {
        const cellContainer = document.getElementById(`${row}${column}-cell`);
        if (cellContainer === null) {
            return;
        }
        cellContainer.dataset.cellType = type;
        cellContainer.dataset.imageSourceCell = imageSource;
        cellContainer.dataset.groupId = groupId;
        cellContainer.dataset.cellSize = size;
        cellContainer.dataset.speed = speed;
        cellContainer.style.backgroundColor = "var(--reserved)";
    }

    const deleteCreature = (cellContainer) => {
        const imageSource = cellContainer.dataset.imageSourceCell;
        const groupId = cellContainer.dataset.groupId;
        const imageCell = document.getElementById(imageSource);
        imageCell.className = `image-cell`;
        imageCell.style.backgroundImage = "none";
        const cellGroup = document.querySelectorAll(
            '[data-group-id="'
                .concat(`${groupId}`)
                .concat('"]'));
        cellGroup.forEach(element => {
            element.removeAttribute("data-creature-id");
            element.dataset.cellType = TYPE_OPTION.BLANK;
            element.removeAttribute("data-image-source-cell");
            element.removeAttribute("data-group-id");
            element.dataset.cellSize = SIZE_OPTION.NO_SIZE;
            element.dataset.speed = "0";
            element.style.backgroundColor = "var(--hex-background)";
        })
    }

    const setSoil = (row, column, terrain, imageUrl) => {
        const imageCell = document.getElementById(`${row}${column}-cell-image-${TYPE_OPTION.SOIL}`);
        const cellContainer = imageCell.parentElement;
        imageCell.style.backgroundImage = `url("${imageUrl}")`;
        const currentTerrain = cellContainer.dataset.terrain;
        cellContainer.dataset.terrain = TERRAIN.LEVEL[terrain] > TERRAIN.LEVEL[currentTerrain] ? terrain : currentTerrain;
        cellContainer.dataset.soilTerrain = terrain;
    }

    const deleteSoil = (cellContainer) => {
        const imageCell = document.getElementById(`${cellContainer.dataset.row}${cellContainer.dataset.cell}-cell-image-${TYPE_OPTION.SOIL}`);
        imageCell.style.backgroundImage = "none";
        cellContainer.dataset.terrain = cellContainer.dataset.environmentTerrain;
        cellContainer.dataset.soilTerrain = TERRAIN.OPTION.MOVABLE;
    }

    const setEnvironment = (row, column, size, shape, terrain, imageUrl) => {
        const imageCell = document.getElementById(`${row}${column}-cell-image-${TYPE_OPTION.ENVIRONMENT}`);
        const cellContainer = imageCell.parentElement;
        imageCell.style.backgroundImage = `url("${imageUrl}")`;
        imageCell.className = `cell-image ${size} ${shape} ${row}${column}-cell-image-${TYPE_OPTION.ENVIRONMENT}`;
        const currentTerrain = cellContainer.dataset.terrain;
        cellContainer.dataset.terrain = TERRAIN.LEVEL[terrain] > TERRAIN.LEVEL[currentTerrain] ? terrain : currentTerrain;
        cellContainer.dataset.environmentTerrain = terrain;
    }

    const deleteEnvironment = (cellContainer) => {
        const imageCell = document.getElementById(`${cellContainer.dataset.row}${cellContainer.dataset.cell}-cell-image-${TYPE_OPTION.ENVIRONMENT}`);
        imageCell.style.backgroundImage = "none";
        imageCell.className = "cell-image";
        cellContainer.dataset.terrain = cellContainer.dataset.soilTerrain;
        cellContainer.dataset.environmentTerrain = TERRAIN.OPTION.MOVABLE;
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
        setIsContextMenu(false);
        clearMovable();
        const targetCellContainer = event.target.parentElement

        //If sidebar edit is active change hex image to selected environment image.
        if (isEdit) {
            contextTarget.current.row = targetCellContainer.dataset.row;
            contextTarget.current.cell = targetCellContainer.dataset.cell;
            setCellProperties(sidebarOptionTarget);
        } else if (isDelete && targetCellContainer.className.includes("map-cell hex")) {
            switch (deleteOption.current) {
                case TYPE_OPTION.SOIL:
                    deleteSoil(targetCellContainer);
                    break;
                case TYPE_OPTION.ENVIRONMENT:
                    deleteEnvironment(targetCellContainer);
                    break;
                case TYPE_OPTION.CREATURE:
                    deleteCreature(targetCellContainer);
                    break;
            }
        }
    }

    //Recursive function.
    const collectMovableHexes = (row, cell, speed, step, size, movableBuild) => {

        if (!movableBuild.has(`${row}${cell}` && step !== 0)) {
            const parentCell = document.getElementById(`${row}${cell}-cell`);


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
        const targetCellContainer = event.target.parentElement;
        if ( isMouseDown && isDelete) {
            switch (deleteOption.current) {
                case TYPE_OPTION.SOIL:
                    deleteSoil(targetCellContainer);
                    break;
                case TYPE_OPTION.ENVIRONMENT:
                    deleteEnvironment(targetCellContainer);
                    break;
                case TYPE_OPTION.CREATURE:
                    deleteCreature(targetCellContainer);
                    break;
            }
        }
        //Continuous hex image (environment image) placement when mouse down and enter a cell.
        if (isMouseDown && isEdit) {
            contextTarget.current.row = targetCellContainer.dataset.row;
            contextTarget.current.cell = targetCellContainer.dataset.cell;
            setCellProperties(sidebarOptionTarget);
            return;
        }


        //Look after the possible hexes for the player move.
        if (targetCellContainer.dataset.cellType === TYPE_OPTION.PLAYER) {
            let movableBuild = new Set();
            if (targetCellContainer.dataset.cellSize === SIZE_OPTION.LARGE) {
                const groupParentCells = document.querySelectorAll(`[data-image-group-id = "${targetCellContainer.dataset.imageGroupId}"]`)
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
                    targetCellContainer.dataset.row,
                    targetCellContainer.dataset.cell,
                    parseInt(targetCellContainer.dataset.speed, 10),
                    0,
                    targetCellContainer.dataset.cellSize,
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
                row.push(
                    <HexCell key={`${calculatedRowNumber}${calculatedCellNumber}`}
                             row={calculatedRowNumber}
                             column={calculatedCellNumber}
                             handleMouseEnter={handleMouseEnter}
                             movable={movable}
                    />
                )
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
            <div className={"map-container"}>{map}</div>
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
            onEditChange={setIsEdit}
            onSidebarOptionChange={setSidebarOptionTarget}
            deleteOption={deleteOption}
            isDelete={isDelete}
            onDeleteChange={setIsDelete}
        />
    </div>)
}

export default Map;