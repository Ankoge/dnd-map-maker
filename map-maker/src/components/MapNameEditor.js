const MapNameEditor = ({setCurrentMapName, currentMapName}) => {

    const handleSelect = (event) => {
        console.log(event)
        setCurrentMapName(event.target.dataset.mapNumber);
        console.log(currentMapName)
    }

    const buildMapButtons = () => {
        return ([...Array(6).keys()].map(i =>
            <div key={`${i + 1}`}
                 className={`map-name-button`.concat(currentMapName === `map${i + 1}` ? " selected" : "")}
                 onClick={handleSelect}>
                <div data-map-number={`map${i + 1}`}
                     className={`map-name-second-icon map-${i + 1}`}></div>
            </div>))
    }

    return (
        <div className={"map-name-editor"}>
            {buildMapButtons()}
        </div>)
}

export default MapNameEditor;
