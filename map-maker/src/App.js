import './App.css';
import Map from "./components/Map";
import EditorSidebar from "./components/EditorSidebar";
import {useState} from "react";

function App() {
    const [isPressV, setIsPressV] = useState(false)

    document.body.addEventListener('keydown', (event) => {
        const modifyCellSize = (modifier) => {
            let size = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cell-size"), 10)
            document.documentElement.style.setProperty('--cell-size', `${size + modifier}px`)
        }
        switch (event.key) {
            case "-":
                modifyCellSize(-1);
                break;
            case "+":
                modifyCellSize(1);
                break;
            case "v":
                setIsPressV(true);
                break;
            default:
                break;
        }
    })

    document.body.addEventListener('keyup', (event) => {
        if (event.key === "v") {
            setIsPressV(false)
        }
    })

    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Map mapSize={40}
            isPressV={ isPressV}/>
        </div>
    );
}

export default App;
