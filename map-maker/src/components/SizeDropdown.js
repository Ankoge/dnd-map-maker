import {SIZE_ICON, SIZE_OPTION, TYPE_OPTION} from "../data/options";
import {useState} from "react";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {PLAYER_OPTIONS} from "../data/playerOptions";

const SizeDropdown = ({name, optionType}) => {
    const [sizeOptions, setSizeOptions] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false)

    function handleSizeChose(event) {
        const size = event.target.dataset.size;
        switch (optionType) {
            case TYPE_OPTION.PLAYER:
                PLAYER_OPTIONS.changeSize(name, size);
                break;
            case TYPE_OPTION.MONSTER:
                MONSTER_OPTIONS.changeSize(name, size);
                break;
            default:
                break;
        }
        setIsDropdown(false);
    }

    const makeSizeDropdown = () => {
        return (
            sizeOptions.map((size, index) =>
                <span key={`${index}`}
                      className={"context-menu-option-active search-option"}
                      data-size={size}
                      onClick={handleSizeChose}
                >{size}</span>
            )
        )
    }

    function handleDropdownClick() {
        setIsDropdown(!isDropdown);
        setSizeOptions(Object.values(SIZE_OPTION));
    }

    return (
        <div className={"size-dropdown-container"}
             onClick={handleDropdownClick}>
            <div className={"size-dropdown-button"}>
                <img
                    className={"size-image"}
                    src={SIZE_ICON.imageUrl}
                    alt={SIZE_ICON.name}/>
            </div>
            <div className={"size-dropdown-option".concat(isDropdown ? " active" : " inactive")}>
                {makeSizeDropdown()}
            </div>
        </div>
    )
}

export default SizeDropdown
