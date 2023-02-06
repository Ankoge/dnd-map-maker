import {PLAYER_OPTIONS} from "../data/playerOptions";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {ENVIRONMENT_OPTIONS} from "../data/environmentOptions";
import {useState} from "react";

export const ContextMenu = props => {
    const [contextButton, setContextButton] = useState("player")
    const [monsterTypeButton, setMonsterTypeButton] = useState("none")

    const handleContextOptionTypeChoose = (chosenType) => {
        setContextButton(chosenType.target.dataset.contexttype)
    }

    function handleMonsterOptionTypeChoose(chosenType) {
        if (chosenType.target.dataset.monsterType === monsterTypeButton) {
            setMonsterTypeButton("none")
        } else {
            setMonsterTypeButton(chosenType.target.dataset.monsterType)
        }
    }

    function handleContextOptionClick(option) {
        option.stopPropagation();
        const removeTerrain = false;
        props.setCellProperties(option.target, removeTerrain);
    }


    const contextMenuOptionBuilder = (options, optionType) => {
        return options.map((option, index) => <span key={index}
                                                    className={"on-hover context-menu-option".concat(optionType === "player" || optionType === "environment" ? " context-menu-option".concat(contextButton === optionType ? "-active" : "-inactive") : " context-menu-option".concat(monsterTypeButton === optionType ? "-active" : "-inactive"))}
                                                    data-image={option.cellUrl}
                                                    data-cell-size={option.cellSize}
                                                    data-cell-shape={option.cellShape ? option.cellShape : "tall"}
                                                    data-speed={optionType === "player" ? option.speed : 0}
                                                    data-terrain={optionType === "environment" ? option.cellTerrain : "creature"}
                                                    data-cell-name={option.cellName}
                                                    data-option-type={optionType}
                                                    onClick={handleContextOptionClick}
        >{option.cellName} <img className={"context-option-image"}
                                src={option.cellUrl}
                                alt={option.cellName}/>
        </span>)
    }


    const contextMenuMonsterOptionBuilder = () => {
        return MONSTER_OPTIONS.map(option => <div key={option.monsterType}
                                                            className={"context-menu-option context-menu-option".concat(contextButton === "monster" ? "-active" : "-inactive").concat(monsterTypeButton === option.monsterType ? "-chosen" : " on-hover")}
                                                            onClick={handleMonsterOptionTypeChoose}
                                                            data-monster-type={option.monsterType}
        >{option.monsterType}<img className={"monster-option-arrow ".concat(monsterTypeButton === option.monsterType? "down-arrow":"up-arrow")} src={"https://cdn.discordapp.com/attachments/1039961105046437989/1067774231636619284/pngegg_48.png"} alt={"down-arrow"}/>{contextMenuOptionBuilder(option.monsterTypes, option.monsterType)}
        </div>)
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


    return (<div id="context-menu"
                 className={"context-menu context-menu-".concat(props.isContextMenu ? "active" : "inactive")}>
        <div className="context-menu-button-container">
            {contextMenuButtonBuilder("player", "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/45528/old-man-emoji-clipart-md.png")}
            {contextMenuButtonBuilder("monster", "https://cdn-icons-png.flaticon.com/512/606/606971.png?w=826&t=st=1667696345~exp=1667696945~hmac=1f56ef0adf25915f0f3c1e120dc9660126c7fe79e29f9c806eccb1008fcccaa2")}
            {contextMenuButtonBuilder("environment", "https://cdn.discordapp.com/attachments/1039961105046437989/1060947032363253851/pngegg_24.png")}
        </div>
        <div key={"delete"}
             className={"context-menu-option on-hover"}
             data-image={""}
             data-cell-size={"medium"}
             data-option-type={"delete"}
             onClick={handleContextOptionClick}
        >Delete
        </div>
        {contextMenuOptionBuilder(PLAYER_OPTIONS, "player")}
        {contextMenuMonsterOptionBuilder()}
        {contextMenuOptionBuilder(ENVIRONMENT_OPTIONS, "environment")}
    </div>)

}
