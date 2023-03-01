import {Util} from "../util/Util";

const SaveMap = ({mapState}) => {

    const handleSave = () => {
        Util.save("mapName", mapState.current)
    }

    return (
        <div className={"save-icon"}
             onClick={handleSave}>
            <div className={"save-icon-arrow"}></div>
        </div>
    )
}

export default SaveMap;
