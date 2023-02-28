import './App.css';
import Map from "./components/Map";
import {useEffect, useState} from "react";
import Background from "./components/Background";
import ColorStyle from "./components/ColorStyle";
import SaveMap from "./components/SaveMap";

function App() {
    const [isMouseDown, setIsMouseDown] = useState(false)
    useEffect(() => {
        document.body.addEventListener('keydown', (event) => {
            const modifyCellSize = (modifier) => {
                let size = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cell-size"), 10);
                if (size > 200) {
                    size = 200;
                } else if (size < 0) {
                    size = 0;
                }
                document.documentElement.style.setProperty('--cell-size', `${size + modifier}px`)
            }
            switch (event.key) {
                case "-":
                    modifyCellSize(-4);
                    break;
                case "+":
                    modifyCellSize(4);
                    break;
                default:
                    break;
            }
        })

        document.body.addEventListener('mouseup', () => {

            setIsMouseDown(false)

        })

        document.body.addEventListener('mousedown', () => {
            setIsMouseDown(true)
        })
    }, [])


    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Map mapSize={45}
                 isMouseDown={isMouseDown}/>
            <Background/>
            <ColorStyle/>
        </div>
    );
}

export default App;
