import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {PLAYER_OPTIONS} from "../data/playerOptions";
import {OPTION_TYPE} from "../data/options";

const ShapeButton = ({name, shape, optionType, isActive}) => {

    function onClick(event) {
        event.stopPropagation();
        switch (optionType) {
            case OPTION_TYPE.PLAYER:
                PLAYER_OPTIONS.changeShape(name, shape.name);
                break;
            case OPTION_TYPE.MONSTER:
                MONSTER_OPTIONS.changeShape(name, shape.name);
                break;
            default:
                break;
        }
    }

    return (
        <div
            className={"shape-button".concat(isActive?" active":" inactive")}
            onClick={onClick}
        ><img
            className={"shape-image"}
            src={shape.imageUrl}
            alt={shape.name}/>
        </div>
    )
}

export default ShapeButton;
