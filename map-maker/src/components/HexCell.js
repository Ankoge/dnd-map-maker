import {SIZE_OPTION, TERRAIN, TYPE_OPTION} from "../data/options";

const HexCell = ({row, column, handleMouseEnter, movable}) => {

    return (
        <div key={`${row}${column}-cell`}
             data-row={row}
             data-cell={column}
             data-cell-type={TYPE_OPTION.BLANK}
             data-soil-terrain={TERRAIN.OPTION.MOVABLE}
             data-environment-terrain={TERRAIN.OPTION.MOVABLE}
             data-terrain = {TERRAIN.OPTION.MOVABLE}
             data-cell-size={SIZE_OPTION.NO_SIZE}
             data-speed={0}
             id={`${row}${column}-cell`}
             className={`map-cell hex${movable.cells.has(`${row}${column}`) ? " movable" : ""}`}
             onMouseEnter={handleMouseEnter}
        >
            <div className={`soil-container`}
                 id={`${row}${column}-cell-image-${TYPE_OPTION.SOIL}`}></div>
            <div className={`middle ${row}${column}-cell-group`}
                 id={`middle-${row}${column}`}></div>
            <div
                className={`cell-image`}
                id={`${row}${column}-cell-image-${TYPE_OPTION.ENVIRONMENT}`}></div>
            <div
                className={`cell-image`}
                id={`${row}${column}-cell-image-${TYPE_OPTION.CREATURE}`}></div>
        </div>
    )
}

export default HexCell;
