import {PLAYER_OPTIONS} from "../data/playerOptions";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {ENVIRONMENT_OPTIONS} from "../data/environmentOptions";
import {useRef, useState} from "react";
import {useEffectOnce} from "../hooks/useEffectOnce";
import fetchGet from "../fetches/fetchGet";

export const ContextMenu = props => {
    const [contextButton, setContextButton] = useState("player")
    const [monsterSearch, setMonsterSearch] = useState("")
    const [targetedMonsters, setTargetedMonsters] = useState([]);
    const allMonsters = useRef([]);

    useEffectOnce(() => {
        fetchGet("https://www.dnd5eapi.co/api/monsters")
            .then(monsters => allMonsters.current = monsters.results)
    })

    const handleContextOptionTypeChoose = (chosenType) => {
        setContextButton(chosenType.target.dataset.contexttype)
    }


    function handleContextOptionClick(option) {
        option.stopPropagation();
        const removeTerrain = false;
        props.setCellProperties(option.target, removeTerrain);
    }


    const contextMenuOptionBuilder = (options, optionType) => {
        return options.map((option, index) => <span key={index}
                                                    className={"on-hover context-menu-option".concat(" context-menu-option".concat(contextButton === optionType ? "-active" : "-inactive"))}
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
        return contextMenuOptionBuilder(MONSTER_OPTIONS.monsters, "monster")

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

    function handleSearchTargetClick(event) {
        const url = event.target.dataset.url;
        fetchGet(`https://www.dnd5eapi.co${url}`)
            .then(monsterData => MONSTER_OPTIONS.addMonster(monsterData.name, monsterData.size.toLowerCase(), `https://www.dnd5eapi.co${monsterData.image}`)
            );
    }

    const makeSearchDropdown = () => {
        return targetedMonsters.map((monster, index) => <span
            key={`${index}`}
            className={"context-menu-option-active search-option"}
            data-url={monster.url}
            onClick={handleSearchTargetClick}>
            {monster.name}</span>);

    }


    function handleSearchInputChange(event) {
        if (isAnyMeaningfulCharacter(event.target.value)) {
            setTargetedMonsters(allMonsters.current.filter(monster =>
                monster.name.toLowerCase().includes(event.target.value.toLowerCase())
            ))
        } else {
            setTargetedMonsters([])
        }
    }

    function isAnyMeaningfulCharacter(searchKey) {
        return searchKey.replaceAll(" ", "").split("").length > 0;
    }

    function addNewMonsterFromList() {
        return <div
            className={"context-menu-option".concat(" context-menu-option".concat(contextButton === "monster" ? "-active" : "-inactive"))}>
            <input className={"monster-input-field"}
                   type={"text"}
                   onChange={handleSearchInputChange}
            ></input>
            <div className={"search-dropdown"}
            >{makeSearchDropdown()}
            </div>
        </div>
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
        {addNewMonsterFromList()}
        {contextMenuMonsterOptionBuilder()}
        {contextMenuOptionBuilder(ENVIRONMENT_OPTIONS, "environment")}
    </div>)

}
