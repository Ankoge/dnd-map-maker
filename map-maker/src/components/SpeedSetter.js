import {PLAYER_OPTIONS} from "../data/playerOptions";
import {useState} from "react";

const SpeedSetter = (props) => {
    const [speed, setSpeed] = useState(PLAYER_OPTIONS.getSpeed(props.name))

    function handleSpeedInput(event) {
        if (parseInt(event.target.value, 10) > 9) {
            alert("Under development. Max speed is 9.");
            return;
        }
        setSpeed(event.target.value)
        PLAYER_OPTIONS.changeSpeed(props.name, event.target.value)
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
