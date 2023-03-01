const MapNameEditor = ({setCurrentMapName, currentMapName}) => {

    const handleSelect = (event) => {
        setCurrentMapName(event.target.dataset.value);
    }

    const buildMapButtons = () => {
        return ([...Array(6).keys()].map(i => <div key={`${i + 1}`}
                                                   className={`map-name-button`.concat(currentMapName === `map${i + 1}` ? " selected" : "")}
                                                   onClick={handleSelect}
                                                   data-value={`map${i + 1}`}><div className={`map-name-second-icon map-${i+1}`}></div></div>))
    }

    return (
        <div className={"map-name-editor"}>
            {buildMapButtons()}
        </div>)
}

export default MapNameEditor;
