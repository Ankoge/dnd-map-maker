import {SIZE_OPTION, OPTION_TYPE} from "../data/options";

export const CreatureUtil = {
    setCreature: (row, column, size, shape, imageUrl, creatureId) => {
        const imageCell = document.getElementById(`${row}${column}-cell-image-${OPTION_TYPE.CREATURE}`);
        imageCell.className = `cell-image ${size} ${shape} ${row}${column}-cell-image-${OPTION_TYPE.CREATURE}`;
        imageCell.style.backgroundImage = `url("${imageUrl}")`;
        const cellContainer = imageCell.parentElement;
        cellContainer.dataset.creatureId = creatureId;
    },
    setCreatureCellGroup: (row, column, groupId, imageSource, type, speed, size) => {
        const cellContainer = document.getElementById(`${row}${column}-cell`);
        if (cellContainer === null) {
            return;
        }
        cellContainer.dataset.cellType = type;
        cellContainer.dataset.imageSourceCell = imageSource;
        cellContainer.dataset.groupId = groupId;
        cellContainer.dataset.cellSize = size;
        cellContainer.dataset.speed = speed;
        cellContainer.style.backgroundColor = "var(--reserved)";
    },
    deleteCreature: (cellContainer) => {
        const imageSource = cellContainer.dataset.imageSourceCell;
        const groupId = cellContainer.dataset.groupId;
        const imageCell = document.getElementById(imageSource);
        imageCell.className = `image-cell`;
        imageCell.style.backgroundImage = "none";
        const cellGroup = document.querySelectorAll(
            '[data-group-id="'
                .concat(`${groupId}`)
                .concat('"]'));
        cellGroup.forEach(element => {
            element.removeAttribute("data-creature-id");
            element.dataset.cellType = OPTION_TYPE.BLANK;
            element.removeAttribute("data-image-source-cell");
            element.removeAttribute("data-group-id");
            element.dataset.cellSize = SIZE_OPTION.NO_SIZE;
            element.dataset.speed = "0";
            element.style.backgroundColor = "var(--hex-background)";
        })
    }
}