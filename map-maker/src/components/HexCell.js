import {SIZE_OPTION, TYPE_OPTION} from "../data/options";

const HexCell = ({row, column, handleMouseEnter, movable}) => {

    return (
        <div key={`${row}${column}-cell`}
             data-row={row}
             data-cell={column}
             data-cell-type={TYPE_OPTION.BLANK}
             data-cell-creature={TYPE_OPTION.BLANK}
             data-cell-environment={TYPE_OPTION.BLANK}
             data-cell-soil={TYPE_OPTION.BLANK}
             data-cell-size={SIZE_OPTION.NO_SIZE}
             data-speed={0}
             id={`${row}${column}-cell`}
             className={`map-cell hex ${row}${column}-cell${movable.cells.has(`${row}${column}`) ? " movable" : ""}`}
             onMouseEnter={handleMouseEnter}
        >
            <div className={`middle ${row}${column}-cell-group`}
                 id={`middle-${row}${column}`}
            ></div>
            <div
                className={`cell-image  ${TYPE_OPTION.BLANK} ${row}${column}-cell-image-terrain`}
                id={`${row}${column}-cell-image-terrain`}></div>
            <div
                className={`cell-image  ${TYPE_OPTION.BLANK} ${row}${column}-cell-image`}
                id={`${row}${column}-cell-image`}></div>
        </div>
    )
}

export default HexCell;
