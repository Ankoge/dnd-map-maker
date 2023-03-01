import HexCell from "./HexCell";

const Map = ({handleLeftClick, handleRightClick, handleMouseEnter, mapSize, movable, isEditorSidebar}) => {


    //Creates a 2-dimensional matrix of hexes.
    const mapBuilder = () => {
        let rows = [];

        for (let row = 0; row <= mapSize; row++) {
            let columns = [];
            for (let column = 0; column <= mapSize; column++) {

                //The id will come from the row- and column- stringify form. This modification will avoid id duplication.
                const rowNumber = 10000 + row;
                const columnNumber = 10000 + column;
                columns.push(<HexCell key={`${rowNumber}${columnNumber}`}
                                      row={rowNumber}
                                      column={columnNumber}
                                      handleMouseEnter={handleMouseEnter}
                                      movable={movable}
                />)
            }

            rows.push(<div key={row}
                           className={`map-row hex-row${row % 2 === 0 ? "" : " even"}`}
            >{columns}</div>)
        }
        return (<div className={"map"}
                     id={"map"}>
            {rows}
        </div>);
    }

    //This ternary expression need to move the whole map a bit right to make place for the
    //sidebar when the map fully scrolled to the left.
    return (
        <div className={"map map-editor-sidebar-".concat(isEditorSidebar ? "active" : "inactive")}
             onContextMenu={handleRightClick}
             onClick={handleLeftClick}
             id={"map-container"}>
            {mapBuilder()}
        </div>)

}

export default Map;
