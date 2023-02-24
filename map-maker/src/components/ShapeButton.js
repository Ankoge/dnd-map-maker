import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {PLAYER_OPTIONS} from "../data/playerOptions";

const ShapeButton = ({name, shape, optionType}) => {

    function onClick(event) {
        event.stopPropagation();
        switch (optionType) {
            case "player":
                PLAYER_OPTIONS.changeShape(name, shape.name);
                break;
            case "monster":
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
