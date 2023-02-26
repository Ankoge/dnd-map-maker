import {PLAYER_OPTIONS} from "../data/playerOptions";
import {useState} from "react";

const SpeedSetter = (props) => {
    const [speed, setSpeed] = useState(props.speed)

    function handleSpeedInput(event) {
        if(parseInt(event.target.value, 10) > 8){
            alert("Max speed is 8. More is gone kill it.");
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
