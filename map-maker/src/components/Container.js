import {ContextMenu} from "./ContextMenu";
import {useRef, useState} from "react";
import EditorSidebar from "./EditorSidebar";
import {SHAPE_OPTION, SIZE_OPTION, OPTION_TYPE, ENTER_IN} from "../data/options";
import SaveMap from "./SaveMap";
import LoadMap from "./LoadMap";
import {CreatureUtil} from "../util/CreatureUtil";
import {SoilUtil} from "../util/SoilUtil";
import {EnvironmentUtil} from "../util/EnvironmentUtil";
import Map from "./Map";
import RefreshButton from "./RefreshButton";
import MapNameEditor from "./MapNameEditor";


const Container = ({mapSize, isMouseDown}) => {
    const [currentMapName, setCurrentMapName] = useState("map1")
    const [isDelete, setIsDelete] = useState(false);
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const sidebarOptionTarget = useRef(null);
    const [isEditorSidebar, setIsEditorSidebar] = useState(false);
    const deleteOption = useRef(OPTION_TYPE.ENVIRONMENT);
    const mapState = useRef({
        map: {
            creature: [],//{row: , column: , name: , size: , shape: , speed: , optionType: , imageUrl: , cellIndex: }
            soil: [],//{row: , column: , terrain: , optionType: , imageUrl: }
            environment: [],//{row: , column: , size: , shape: , terrain: , optionType: , imageUrl: }
        }
    });
    const [movable, setMovable] = useState({
        cells: new Set(),
    })
    const contextTarget = useRef({
        row: "",
        column: "",

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
        const row = parseInt(contextTarget.current.row, 10);
        const column = parseInt(contextTarget.current.column, 10);
        if (!row || !column) {
            return;
        }
        const type = option.dataset.optionType;
        const size = option.dataset.cellSize;
        const shape = option.dataset.cellShape ? option.dataset.cellShape : SHAPE_OPTION.TALL;

        switch (type) {
            case OPTION_TYPE.ENVIRONMENT:
                saveEnvironmentStatusOnMap(row, column, size, shape, option.dataset.terrain, option.dataset.image)
                EnvironmentUtil.setEnvironment(row, column, size, shape, option.dataset.terrain, option.dataset.image);
                break;
            case OPTION_TYPE.SOIL:
                saveSoilStatusOnMap(row, column, option.dataset.terrain, option.dataset.image)
                SoilUtil.setSoil(row, column, option.dataset.terrain, option.dataset.image);
                break;
            case OPTION_TYPE.PLAYER:
            case OPTION_TYPE.MONSTER:
                deleteCreatureFromMap(option.dataset.image, option.dataset.cellName);
                const cellIndex = option.dataset.cellIndex;
                const creatureId = `${option.dataset.image}${option.dataset.cellName}`;
                const imageSource = `${row}${column}-cell-image-${OPTION_TYPE.CREATURE}`;
                const groupId = `${row}${column}-image-group-${OPTION_TYPE.CREATURE}`;
                const speed = option.dataset.speed ? option.dataset.speed : 0;
                saveCreatureStatusOnMap(row, column, size, shape, option.dataset.image, option.dataset.cellName, type, speed, cellIndex)
                CreatureUtil.setCreature(row, column, size, shape, option.dataset.image, creatureId)

                switch (size) {
                    case SIZE_OPTION.TINY:
                    case SIZE_OPTION.SMALL:
                    case SIZE_OPTION.MEDIUM:
                        CreatureUtil.setCreatureCellGroup(row, column, groupId, imageSource, type, speed, size);
                        break;
                    case SIZE_OPTION.LARGE:
                        CreatureUtil.setCreatureCellGroup(row, column, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row, column - 1, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2 - 1, groupId, imageSource, type, speed, size);
                        break;
                    case SIZE_OPTION.HUGE:
                        CreatureUtil.setCreatureCellGroup(row, column, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row, column - 1, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2 - 2, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2 - 1, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 2, column - 1, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 2, column, groupId, imageSource, type, speed, size);
                        break;
                    case SIZE_OPTION.GARGANTUA:
                        CreatureUtil.setCreatureCellGroup(row, column, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row, column - 1, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row, column - 2, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2 - 3, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2 - 2, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2 - 1, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 1, column + row % 2, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 2, column - 2, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 2, column - 1, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 2, column, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 3, column + row % 2 - 2, groupId, imageSource, type, speed, size);
                        CreatureUtil.setCreatureCellGroup(row - 3, column + row % 2 - 1, groupId, imageSource, type, speed, size);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    const deleteCreatureFromMap = (imageUrl, creatureName) => {
        const playerDuplicates = document.querySelectorAll(
            '[data-creature-id="'
                .concat(`${imageUrl}${creatureName}`)
                .concat('"]'))
        if (playerDuplicates.length > 0) {
            playerDuplicates.forEach(duplicate => {
                removeCellFromMapStatus(mapState.current.map.creature, duplicate.dataset.row, duplicate.dataset.column);
                CreatureUtil.deleteCreature(duplicate);
            });
        }
    }

    const saveCreatureStatusOnMap = (row, column, size, shape, imageUrl, name, optionType, speed, cellIndex) => {
        if (!mapState.current.map.creature.find(el => el.row === parseInt(row, 10) && el.column === parseInt(column, 10))) {
            mapState.current.map.creature.push({
                row: row,
                column: column,
                size: size,
                shape: shape,
                imageUrl: imageUrl,
                optionType: optionType,
                name: name,
                speed: speed,
                cellIndex: cellIndex
            })
        }
    }

    const saveSoilStatusOnMap = (row, column, terrain, imageUrl) => {
        if (!mapState.current.map.soil.find(el => el.row === parseInt(row, 10) && el.column === parseInt(column, 10))) {
            mapState.current.map.soil.push({
                row: row,
                column: column,
                terrain: terrain,
                imageUrl: imageUrl,
                optionType: OPTION_TYPE.SOIL
            })
        }
    }
    const saveEnvironmentStatusOnMap = (row, column, size, shape, terrain, imageUrl) => {
        if (!mapState.current.map.environment.find(el => parseInt(el.row, 10) === parseInt(row, 10) && parseInt(el.column, 10) === parseInt(column, 10))) {
            mapState.current.map.environment.push({
                row: row,
                column: column,
                size: size,
                shape: shape,
                terrain: terrain,
                imageUrl: imageUrl,
                optionType: OPTION_TYPE.ENVIRONMENT
            })
        }
    }

    const handleRightClick = (event) => {
        event.preventDefault();
        const parentElement = event.target.parentElement;

        if (parentElement.dataset.row && parentElement.dataset.column) {
            setIsContextMenu(true);
            const contextMenu = document.getElementById("context-menu");
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.left = `${event.pageX}px`;
            contextTarget.current.row = parentElement.dataset.row;
            contextTarget.current.column = parentElement.dataset.column;
        }
    }

    const handleLeftClick = (event) => {
        setIsContextMenu(false);
        clearMovable();
        const targetCellContainer = event.target.parentElement
        //If sidebar edit is active change hex image to selected environment image.
        if (isEdit) {
            contextTarget.current.row = targetCellContainer.dataset.row;
            contextTarget.current.column = targetCellContainer.dataset.column;
            setCellProperties(sidebarOptionTarget.current);
        } else if (isDelete && targetCellContainer.className.includes("map-cell hex")) {
            choseDeleteType(targetCellContainer);
        }
    }

    function handleMouseEnter(event) {
        const targetCellContainer = event.target.parentElement;
        if (isMouseDown && isDelete) {
            choseDeleteType(targetCellContainer);
        }
        //Continuous hex image (environment image) placement when mouse down and enter a cell.
        if (isMouseDown && isEdit) {
            contextTarget.current.row = targetCellContainer.dataset.row;
            contextTarget.current.column = targetCellContainer.dataset.column;
            setCellProperties(sidebarOptionTarget.current);
            return;
        }


        //Look after the possible hexes for the player move.
        if (targetCellContainer.dataset.cellType === OPTION_TYPE.PLAYER
            || targetCellContainer.dataset.cellType === OPTION_TYPE.MONSTER) {
            let movableBuild = new Set();
            movableBuild = collectMovableHexes(
                targetCellContainer.dataset.row,
                targetCellContainer.dataset.column,
                parseInt(targetCellContainer.dataset.speed, 10),
                0,
                targetCellContainer.dataset.cellSize,
                movableBuild,
                ENTER_IN.START
            )
            //Trigger a render for the selected hexes with a state change.
            setMovable({cells: movableBuild});
        }
    }

    const removeCellFromMapStatus = (mapStatusPart, row, column) => {
        let deletedElement = NaN;
        mapStatusPart.forEach((el, i) => {
            if (parseInt(el.row) === parseInt(row) && parseInt(el.column) === parseInt(column)) {
                deletedElement = i;
            }
        });
        if (deletedElement || deletedElement === 0) {
            mapStatusPart.splice(deletedElement, 1);
        }
    }

    const choseDeleteType = (targetCellContainer) => {
        switch (deleteOption.current) {
            case OPTION_TYPE.SOIL:
                removeCellFromMapStatus(mapState.current.map.soil, targetCellContainer.dataset.row, targetCellContainer.dataset.column);
                SoilUtil.deleteSoil(targetCellContainer);
                break;
            case OPTION_TYPE.ENVIRONMENT:
                removeCellFromMapStatus(mapState.current.map.environment, targetCellContainer.dataset.row, targetCellContainer.dataset.column);
                EnvironmentUtil.deleteEnvironment(targetCellContainer);
                break;
            case OPTION_TYPE.CREATURE:
                if (targetCellContainer.dataset.imageSourceCell) {
                    targetCellContainer = document.getElementById(targetCellContainer.dataset.imageSourceCell).parentElement;
                    removeCellFromMapStatus(mapState.current.map.creature, targetCellContainer.dataset.row, targetCellContainer.dataset.column);
                    CreatureUtil.deleteCreature(targetCellContainer);
                }
                break;
            default:
                break;
        }

    }

    //Recursive function.
    const collectMovableHexes = (row, column, speed, step, size, movableBuild, enterDirection) => {

        const parentCell = document.getElementById(`${row}${column}-cell`);


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
        if ((parentCell.dataset.cellType === OPTION_TYPE.MONSTER || parentCell.dataset.cellType === OPTION_TYPE.PLAYER)
            && !(size === SIZE_OPTION.SMALL || size === SIZE_OPTION.TINY)
            && step !== 0) {
            return movableBuild;
        }

        //Set hex movable.
        if (!movableBuild.has(`${row}${column}`)) {
            movableBuild.add(`${row}${column}`)
        }

        //If terrain "catch" player here is an early return.
        if (parentCell.dataset.terrain === "catch") {
            return movableBuild;
        }

        //Update parameters.
        step = step + 1;
        row = parseInt(row, 10);
        column = parseInt(column, 10);
        //Recursively call all neighbour hexes.
        if (enterDirection !== ENTER_IN.BOTTOM_LEFT) {
            movableBuild = collectMovableHexes(row - 1, column + (row % 2), speed, step, size, movableBuild, ENTER_IN.TOP_RIGHT);
        }
        if (enterDirection !== ENTER_IN.LEFT) {
            movableBuild = collectMovableHexes(row, column + 1, speed, step, size, movableBuild, ENTER_IN.RIGHT);
        }
        if (enterDirection !== ENTER_IN.TOP_LEFT) {
            movableBuild = collectMovableHexes(row + 1, column + (-1 + row % 2), speed, step, size, movableBuild, ENTER_IN.BOTTOM_RIGHT);
        }
        if (enterDirection !== ENTER_IN.TOP_RIGHT) {
            movableBuild = collectMovableHexes(row + 1, column + (row % 2), speed, step, size, movableBuild, ENTER_IN.BOTTOM_LEFT);
        }
        if (enterDirection !== ENTER_IN.RIGHT) {
            movableBuild = collectMovableHexes(row, column - 1, speed, step, size, movableBuild, ENTER_IN.LEFT);
        }
        if (enterDirection !== ENTER_IN.BOTTOM_RIGHT) {
            movableBuild = collectMovableHexes(row - 1, column + (-1 + row % 2), speed, step, size, movableBuild, ENTER_IN.TOP_LEFT);
        }

        return movableBuild;
    }

    return (<div className="map-div"
                 id={"map-container"}>
        <ContextMenu
            isContextMenu={isContextMenu}
            onContextMenuChange={setIsContextMenu}
            contextTarget={contextTarget}
            setCellProperties={setCellProperties}
            deleteCreatureFromMap={deleteCreatureFromMap}
        />
        <SaveMap mapState={mapState}
                 currentMapName={currentMapName}/>
        <LoadMap setCell={setCellProperties}
                 contextTarget={contextTarget}
                 currentMapName={currentMapName}/>
        <RefreshButton/>
        <MapNameEditor setCurrentMapName={setCurrentMapName}
                       currentMapName={currentMapName}/>
        <Map handleLeftClick={handleLeftClick}
             handleRightClick={handleRightClick}
             handleMouseEnter={handleMouseEnter}
             mapSize={mapSize}
             movable={movable}
             isEditorSidebar={isEditorSidebar}>
        </Map>
        <EditorSidebar
            isEditorSidebar={isEditorSidebar}
            onIsEditorSidebarChange={setIsEditorSidebar}
            onEditChange={setIsEdit}
            onSidebarOptionChange={sidebarOptionTarget}
            deleteOption={deleteOption}
            isDelete={isDelete}
            onDeleteChange={setIsDelete}
        />
    </div>)
}

export default Container;