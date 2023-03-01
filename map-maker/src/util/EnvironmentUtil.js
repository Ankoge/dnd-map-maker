import {TERRAIN, OPTION_TYPE} from "../data/options";

export const EnvironmentUtil = {
    setEnvironment: (row, column, size, shape, terrain, imageUrl) => {
        const imageCell = document.getElementById(`${row}${column}-cell-image-${OPTION_TYPE.ENVIRONMENT}`);
        const cellContainer = imageCell.parentElement;
        imageCell.style.backgroundImage = `url("${imageUrl}")`;
        imageCell.className = `cell-image ${size} ${shape} ${row}${column}-cell-image-${OPTION_TYPE.ENVIRONMENT}`;
        const currentTerrain = cellContainer.dataset.terrain;
        cellContainer.dataset.terrain = TERRAIN.LEVEL[terrain] > TERRAIN.LEVEL[currentTerrain] ? terrain : currentTerrain;
        cellContainer.dataset.environmentTerrain = terrain;
    },
    deleteEnvironment: (cellContainer) => {
        const imageCell = document.getElementById(`${cellContainer.dataset.row}${cellContainer.dataset.column}-cell-image-${OPTION_TYPE.ENVIRONMENT}`);
        imageCell.style.backgroundImage = "none";
        imageCell.className = "cell-image";
        cellContainer.dataset.terrain = cellContainer.dataset.soilTerrain;
        cellContainer.dataset.environmentTerrain = TERRAIN.OPTION.MOVABLE;
    }
}
