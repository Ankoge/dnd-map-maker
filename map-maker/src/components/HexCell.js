

const HexCell = (rowNumber, cellNumber) =>{

    return (<div key={`${rowNumber}${cellNumber}-cell`}
                 data-cell={1000 + cellNumber}
                 data-row={1000 + rowNumber}
                 data-cell-type={"blank"}
                 id={`${1000 + rowNumber}${1000 + cellNumber}-cell`}
                 className={"map-cell hex"}
                 onContextMenu={handleRightClick}
                 onClick={handleLeftClick}
                 onMouseEnter={handleHoverOn}
                 onMouseLeave={handleHoverOff}
    ><div className={"top"}></div>
        <div className={"middle"}></div>
        <div className={"bottom"}></div>
    </div>)
}

export default HexCell;