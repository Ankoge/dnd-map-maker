import './App.css';
import Container from "./components/Container";
import {useEffect, useState} from "react";
import Background from "./components/Background";
import ColorStyle from "./components/ColorStyle";


function App() {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mapSize, setMapSize] = useState(45);

    useEffect(() => {
        setMapSize(45);
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


    function onRightClick(event) {
        event.preventDefault();
    }

    return (
        <div className="App"
        onContextMenu={onRightClick}>
            <header className="App-header">
            </header>
            <Container isMouseDown={isMouseDown}
                       mapSize={mapSize}/>
            <Background/>
            <ColorStyle/>
        </div>
    );
}

export default App;
