import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {PLAYER_OPTIONS} from "../data/playerOptions";
import {TYPE_OPTION} from "../data/options";

const ShapeButton = ({name, shape, optionType}) => {

    function onClick(event) {
        event.stopPropagation();
        switch (optionType) {
            case TYPE_OPTION.PLAYER:
                PLAYER_OPTIONS.changeShape(name, shape.name);
                break;
            case TYPE_OPTION.MONSTER:
                MONSTER_OPTIONS.changeShape(name, shape.name);
                break;
        }
    }

    return (
        <div
            className={"shape-button"}
            onClick={onClick}
        ><img
            className={"shape-image"}
            src={shape.imageUrl}
            alt={shape.name}/>
        </div>
    )
}

export default ShapeButton;
