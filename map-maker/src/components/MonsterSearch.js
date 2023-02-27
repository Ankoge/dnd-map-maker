import {useRef, useState} from "react";
import {useEffectOnce} from "../hooks/useEffectOnce";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import fetchGet from "../fetches/fetchGet";
import {SIZE_OPTION, TYPE_OPTION} from "../data/options";

const MonsterSearch = ({contextButton}) => {
    const [monsterSearch, setMonsterSearch] = useState("")
    const [targetedMonsters, setTargetedMonsters] = useState([]);
    const allMonsters = useRef([]);

    useEffectOnce(() => {
        allMonsters.current = Object.keys(MONSTER_OPTIONS.monsterUrls)
    })

    async function handleSearchTargetClick(event) {
        const imageUrl = event.target.dataset.url;
        const name = event.target.dataset.name;
        const nameIndex = name.replaceAll(" ", "-").toLowerCase();
        const nameCount = getMonsterNumber(nameIndex);
        const modifier = nameCount >= 1 ? " ".concat(String(nameCount)) : "";
        let size = SIZE_OPTION.MEDIUM
        try {
            await fetchGet(`https://www.dnd5eapi.co/api/monsters/${nameIndex}`)
                .then(response => {
                    console.log(response)
                    if (response.status !== 200) {
                        throw new Error(`Can not find in API database monster: ${nameIndex}`)
                    } else {
                        size = response.data.size.toLowerCase();
                        console.log(size)
                    }
                })
        } catch (e) {
            console.warn(e);
        } finally {
            MONSTER_OPTIONS.addMonster(name.concat(modifier), nameIndex, size, imageUrl)
            setTargetedMonsters([])
            setMonsterSearch("")
        }
    }

    const getMonsterNumber = (nameIndex) => {
        return MONSTER_OPTIONS.monsters.reduce((count, monster) => count + (monster.cellIndex.includes(nameIndex) ? 1 : 0), 0)
    }

    const makeSearchDropdown = () => {
        return targetedMonsters.map((monster, index) => <span
            key={`${index}`}
            className={"context-menu-option-active search-option"}
            data-url={MONSTER_OPTIONS.monsterUrls[monster]}
            data-name={monster}
            onClick={handleSearchTargetClick}>
            {monster}</span>);

    }

    function handleSearchInputChange(event) {
        setMonsterSearch(event.target.value)
        if (isAnyMeaningfulCharacter(event.target.value)) {
            setTargetedMonsters(allMonsters.current.filter(monster =>
                monster.toLowerCase().includes(event.target.value.toLowerCase())
            ))
        } else {
            setTargetedMonsters([])
        }
    }

    function isAnyMeaningfulCharacter(searchKey) {
        return searchKey.replaceAll(" ", "").split("").length > 0;
    }

    return <div
        className={"context-menu-option".concat(" context-menu-option".concat(contextButton === TYPE_OPTION.MONSTER ? "-active" : "-inactive"))}
        id={"monster-search-container"}>
        <input className={"monster-input-field"}
               type={"text"}
               onChange={handleSearchInputChange}
               value={monsterSearch}
        ></input>
        <div className={"search-dropdown".concat(targetedMonsters.length > 0 ? " active":  " inactive")}
        >{makeSearchDropdown()}
        </div>
    </div>
}

export default MonsterSearch;
