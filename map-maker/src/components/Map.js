import {ContextMenu} from "./ContextMenu";
import {useState} from "react";
import EditorSidebar from "./EditorSidebar";

const Map = ({mapSize, isMouseDown}) => {
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [contextTarget, setContextTarget] = useState({
        row: undefined,
        cell: undefined,
    });
    const [isEdit, setIsEdit] = useState(false)
    const [sidebarOptionTarget, setSidebarOptionTarget] = useState(null);
    const [isEditorSidebar, setIsEditorSidebar] = useState(false);
    let cellsInRange = [];
    let timeoutForRange;

    const handleRightClick = (event) => {
        event.preventDefault();
        const parentElement = event.target.parentElement;
        if (parentElement.dataset.row && parentElement.dataset.cell) {
            setIsContextMenu(true);
            const contextMenu = document.getElementById("context-menu");
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.left = `${event.pageX}px`;

            setContextTarget({
                row: parentElement.dataset.row,
                cell: parentElement.dataset.cell
            })
        }
    }

    const handleLeftClick = (event) => {
        setIsContextMenu(false)

        if (isEdit) {
            changeCell(event);
        }
    }

    const handleHoverOn = (event) => {
        if (isMouseDown) {
            changeCell(event)
        } else if (event.target.dataset.cellType === "player" && isContextMenu === false) {
            const findAndSaveCells = (rowModifier, columnModifier) => {
                cellsInRange.push(document.getElementById(`${row + rowModifier}${column + columnModifier}-cell`))
            }
            const speed = parseInt(event.target.dataset.speed, 10);
            const row = parseInt(event.target.dataset.row, 10);
            const column = parseInt(event.target.dataset.cell, 10);
            for (let rowModifier = 0; rowModifier <= speed; rowModifier++) {
                for (let columnModifier = speed - rowModifier; columnModifier >= 0; columnModifier--) {
                    findAndSaveCells(rowModifier, columnModifier);
                    findAndSaveCells(rowModifier, 0 - columnModifier);
                    if (rowModifier !== 0) {
                        findAndSaveCells(0 - rowModifier, columnModifier);
                        findAndSaveCells(0 - rowModifier, 0 - columnModifier)
                    }
                }
            }
            cellsInRange.forEach(cell => cell != null ? cell.classList.add("cell-in-range") : true)
            timeoutForRange = setTimeout(removeCellsInRange, 2500)
        }

    }

    const changeCell = (event) => {
        const target = event.target;
        if (sidebarOptionTarget.dataset.optionType === "delete") {
            target.className = "map-cell"
            target.style.backgroundImage = "none"
            target.dataset.cellType = "blank"
        } else {
            const size = sidebarOptionTarget.dataset.cellSize
            const rowNumber = parseInt(target.dataset.row, 10);
            const cellNumber = parseInt(target.dataset.cell, 10);
            target.style.backgroundImage = `url("${sidebarOptionTarget.dataset.image}")`;
            target.dataset.cellType = sidebarOptionTarget.dataset.optionType;
            target.className = `map-cell ${rowNumber}${cellNumber}-${size}-cell full-cell ${size}-cell`;
        }
    }


    const handleHoverOff = (event) => {
        if (event.target.dataset.cellType === "player") {
            removeCellsInRange()
            clearTimeout(timeoutForRange)
        }
    }

    const removeCellsInRange = () => {
        cellsInRange.forEach(cell => cell != null ? cell.classList.remove("cell-in-range") : true)
        cellsInRange = [];
    }

    const mapBuilder = () => {
        let map = [];

        for (let rowNumber = 0; rowNumber <= mapSize; rowNumber++) {
            let row = [];
            for (let cellNumber = 0; cellNumber <= mapSize; cellNumber++) {
                const calculatedRowNumber = 1000 + rowNumber;
                const calculatedCellNumber = 1000 + cellNumber;
                row.push(<div key={`${calculatedRowNumber}${calculatedCellNumber}-cell`}
                              data-cell={calculatedCellNumber}
                              data-row={calculatedRowNumber}
                              data-cell-type={"blank"}
                              id={`${calculatedRowNumber}${calculatedCellNumber}-cell`}
                              className={`map-cell hex ${calculatedRowNumber}${calculatedCellNumber}-cell`}
                >
                    <div className={`top ${calculatedRowNumber}${calculatedCellNumber}-cell-group`}></div>
                    <div className={`middle ${calculatedRowNumber}${calculatedCellNumber}-cell-group`}></div>
                    <div className={`bottom ${calculatedRowNumber}${calculatedCellNumber}-cell-group`}></div>
                    <div className={`cell-image medium ${calculatedRowNumber}${calculatedCellNumber}-cell-image`}
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
            {map}
        </div>)
    }

    return (<div className="map-div">
        <ContextMenu
            isContextMenu={isContextMenu}
            onContextMenuChange={setIsContextMenu}
            contextTarget={contextTarget}
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