import {DELETE_ICON, OPTION_TYPE} from "../data/options";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {PLAYER_OPTIONS} from "../data/playerOptions";

const CreatureRemove = ({creatureName, imageUrl, deleteCreatureFromMap, optionType, isActive}) => {

    const removeListedCreature = () => {
        if (window.confirm("Do you want to permanently remove the creature from the list??")) {
            deleteCreatureFromMap(imageUrl, creatureName);
            switch (optionType) {
                case OPTION_TYPE.MONSTER:
                    MONSTER_OPTIONS.delete(creatureName);
                    break;
                case OPTION_TYPE.PLAYER:
                    PLAYER_OPTIONS.delete(creatureName);
                    break;
                default:
                    console.warn("Wrong delete method. The element is not a creature.")
                    break;
            }
        }

    }

    return (
        <div className={"creature-remove-button".concat(isActive?" active":" inactive")}
             onClick={removeListedCreature}
        >
            <img className={"creature-remove-image"}
            alt={DELETE_ICON.name}
            src={DELETE_ICON.url}/>
        </div>
    )
}

export default CreatureRemove;
