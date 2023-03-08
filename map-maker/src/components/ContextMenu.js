import {PLAYER_OPTIONS} from "../data/playerOptions";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {useState} from "react";
import MonsterSearch from "./MonsterSearch";
import ShapeButton from "./ShapeButton";
import {SHAPE_OPTION, OPTION_TYPE, SHAPE_ICON} from "../data/options";
import SizeDropdown from "./SizeDropdown";
import SpeedSetter from "./SpeedSetter";
import CreatureRemove from "./CreatureRemove";
import ButtonSwitch from "./ButtonSwitch";

export const ContextMenu = props => {
    const [contextButton, setContextButton] = useState(OPTION_TYPE.PLAYER)
    const [isButtonActive, setIsButtonActive] = useState(false);


    const handleContextOptionTypeChoose = (chosenType) => {
        setContextButton(chosenType.target.dataset.contexttype)
    }

    function handleContextOptionClick(option) {
        option.stopPropagation();
        props.setCellProperties(option.target);
    }

    const contextMenuOptionBuilder = (options, optionType) => {
        return options.map((option, index) =>
            <span key={10000 + index}
                  className={"context-menu-option".concat(" context-menu-option".concat(contextButton === optionType ? "-active" : "-inactive"))}

            ><span key={index}
                   className={"on-hover context-menu-option option"}
                   data-image={option.imageUrl}
                   data-cell-index={option.cellIndex}
                   data-cell-size={option.cellSize}
                   data-cell-shape={option.cellShape ? option.cellShape : SHAPE_OPTION.TALL}
                   data-speed={option.speed}
                   data-cell-name={option.cellName}
                   data-option-type={optionType}
                   onClick={handleContextOptionClick}
            ><div className={"cell-option"}>{option.cellName}</div>
                <img className={"context-option-image cell-option"}
                     src={option.imageUrl}
                     alt={option.cellName}/>

        </span>
                <SizeDropdown name={option.cellName}
                              optionType={optionType}/>
                <SpeedSetter name={option.cellName}
                             speed={option.speed}
                             optionType={optionType}/>
                <ButtonSwitch isActive={isButtonActive}
                              setIsActive={setIsButtonActive}/>
                <ShapeButton name={option.cellName}
                             shape={SHAPE_ICON.TALL}
                             optionType={optionType}
                             isActive={isButtonActive}/>
                <ShapeButton name={option.cellName}
                             shape={SHAPE_ICON.ROUND}
                             optionType={optionType}
                             isActive={isButtonActive}/>
                <ShapeButton name={option.cellName}
                             shape={SHAPE_ICON.FLAT}
                             optionType={optionType}
                             isActive={isButtonActive}/>
                <CreatureRemove creatureName={option.cellName}
                                imageUrl={option.imageUrl}
                                optionType={optionType}
                                deleteCreatureFromMap={props.deleteCreatureFromMap}
                                isActive={isButtonActive}/>

        </span>)
    }


    const contextMenuButtonBuilder = (optionType, iconUrl) => {
        return (<button className={"on-hover context-menu-button".concat(contextButton === optionType ? "-active" : "")}
                        data-contexttype={optionType}
                        onClick={handleContextOptionTypeChoose}><img className={"context-menu-button-icon"}
                                                                     data-contexttype={optionType}
                                                                     src={iconUrl}
                                                                     alt={`${optionType}-icon`}/>
        </button>)
    }

    return (
        <div id="context-menu"
             className={"context-menu context-menu-".concat(props.isContextMenu ? "active" : "inactive")}>
            <div className="context-menu-button-container">
                {contextMenuButtonBuilder(OPTION_TYPE.PLAYER, "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/45528/old-man-emoji-clipart-md.png")}
                {contextMenuButtonBuilder(OPTION_TYPE.MONSTER, "https://cdn-icons-png.flaticon.com/512/606/606971.png?w=826&t=st=1667696345~exp=1667696945~hmac=1f56ef0adf25915f0f3c1e120dc9660126c7fe79e29f9c806eccb1008fcccaa2")}
            </div>
            {contextMenuOptionBuilder(PLAYER_OPTIONS.players, OPTION_TYPE.PLAYER)}
            <MonsterSearch contextButton={contextButton}/>
            {contextMenuOptionBuilder(MONSTER_OPTIONS.monsters, OPTION_TYPE.MONSTER)}
        </div>)

}
