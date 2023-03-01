import {Util} from "../util/Util";
import {useRef} from "react";
import {MONSTER_OPTIONS} from "../data/monsterOptions";
import {OPTION_TYPE} from "../data/options";

const LoadMap = ({setCell, contextTarget}) => {
    const loadedMapState = useRef({
        map: {
            creature: [],//{row: , column: , name: , size: , shape: , speed: , optionType: , imageUrl: }
            soil: [],//{row: , column: , terrain: , optionType: , imageUrl: }
            environment: [],//{row: , column: , size: , shape: , terrain: , optionType: , imageUrl: }
        }
    });

    const handleLoad = () => {
        loadedMapState.current = Util.load("mapName");
        console.log("In load with content: ", Util.load("mapName"));
        loadMap();
    }

    const loadMap = () => {
        loadedMapState.current.map.creature.forEach(creature => {
            if (!MONSTER_OPTIONS.isMonsterInList(creature.name)&& creature.optionType === OPTION_TYPE.MONSTER) {
                MONSTER_OPTIONS.add(creature.name, creature.cellIndex, creature.size, creature.imageUrl)
            }
            contextTarget.current.row = creature.row;
            contextTarget.current.column = creature.column;
            setCell({
                className: "",
                dataset: {
                    optionType: creature.optionType,
                    cellSize: creature.size,
                    cellShape: creature.shape,
                    speed: creature.speed,
                    cellName: creature.name,
                    image: creature.imageUrl,
                }
            })

        });
        loadedMapState.current.map.environment.forEach(environment => {

            contextTarget.current.row = environment.row;
            contextTarget.current.column = environment.column;
            setCell({
                className: "",
                dataset: {
                    optionType: environment.optionType,
                    cellSize: environment.size,
                    cellShape: environment.shape,
                    terrain: environment.terrain,
                    image: environment.imageUrl,
                }
            })

        });
        loadedMapState.current.map.soil.forEach(soil => {
            contextTarget.current.row = soil.row;
            contextTarget.current.column = soil.column;
            setCell({
                className: "",
                dataset: {
                    optionType: soil.optionType,
                    terrain: soil.terrain,
                    image: soil.imageUrl,
                }
            })
        });
    }

    return (
        <div className={"load-icon"}
             onClick={handleLoad}>
            <div className={"load-icon-arrow"}></div>
        </div>
    )
}

export default LoadMap;
