import {Util} from "../util/Util";

const SaveMap = ({mapState, currentMapName}) => {

    const handleSave = () => {
        Util.save(currentMapName, mapState.current)
    }

    return (
        <div className={"save-icon"}
             onClick={handleSave}>
            <div className={"save-icon-arrow"}></div>
        </div>
    )
}

export default SaveMap;
