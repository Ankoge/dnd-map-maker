import {PLAYER_OPTIONS} from "../data/playerOptions";
import {useState} from "react";
import {OPTION_TYPE} from "../data/options";
import {MONSTER_OPTIONS} from "../data/monsterOptions";

const SpeedSetter = (props) => {
    const [speed, setSpeed] = useState(props.optionType === OPTION_TYPE.PLAYER ? PLAYER_OPTIONS.getSpeed(props.name) : MONSTER_OPTIONS.getSpeed(props.name))

    function handleSpeedInput(event) {
        if (parseInt(event.target.value, 10) > 9) {
            alert("Under development. Max speed is 9.");
            return;
        }
        setSpeed(event.target.value)
        props.optionType === OPTION_TYPE.PLAYER ? PLAYER_OPTIONS.changeSpeed(props.name, event.target.value) : MONSTER_OPTIONS.changeSpeed(props.name, event.target.value)
    }

    return (
        <input className={"speed-setter"}
               value={String(speed)}
               onChange={handleSpeedInput}
        >
        </input>
    )
}

export default SpeedSetter;
