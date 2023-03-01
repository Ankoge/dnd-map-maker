import {TERRAIN, OPTION_TYPE} from "../data/options";

export const SoilUtil = {
    setSoil: (row, column, terrain, imageUrl) => {
        const imageCell = document.getElementById(`${row}${column}-cell-image-${OPTION_TYPE.SOIL}`);
        const cellContainer = imageCell.parentElement;
        imageCell.style.backgroundImage = `url("${imageUrl}")`;
        const currentTerrain = cellContainer.dataset.terrain;
        cellContainer.dataset.terrain = TERRAIN.LEVEL[terrain] > TERRAIN.LEVEL[currentTerrain] ? terrain : currentTerrain;
        cellContainer.dataset.soilTerrain = terrain;
    },
    deleteSoil: (cellContainer) => {
        const imageCell = document.getElementById(`${cellContainer.dataset.row}${cellContainer.dataset.column}-cell-image-${OPTION_TYPE.SOIL}`);
        imageCell.style.backgroundImage = "none";
        cellContainer.dataset.terrain = cellContainer.dataset.environmentTerrain;
        cellContainer.dataset.soilTerrain = TERRAIN.OPTION.MOVABLE;
    }
}
