import {SHAPE_OPTION, SIZE_OPTION} from "./options";

export const PLAYER_OPTIONS = {
    changeSize: (name, size) => {
        const player = PLAYER_OPTIONS.players.find(player => player.cellName === name);
        if (player) {
            player.cellSize = size;
        }
    },
    changeShape: (name, shape) => {
        const player = PLAYER_OPTIONS.players.find(player => player.cellName === name);
        if (player) {
            player.cellShape = shape;
        }
    },
    changeSpeed: (name, speed) => {
        const player = PLAYER_OPTIONS.players.find(player => player.cellName === name);
        if (player) {
            player.speed = speed;
        }
    }, getSpeed: (name) => {
        const player = PLAYER_OPTIONS.players.find(player => player.cellName === name);
        if (player) {
            return player.speed;
        }
    },
    delete: (name) => {
        let deletedElementIndex = NaN;
        PLAYER_OPTIONS.players.forEach((player, index) => {
            if (player.cellName === name) {
                deletedElementIndex = index;
            }
        });
        if (deletedElementIndex || deletedElementIndex === 0) {
            PLAYER_OPTIONS.players.splice(deletedElementIndex, 1);
        }
    },
    players: [
        {
            cellName: "Tarvis",
            cellSize: SIZE_OPTION.MEDIUM,
            cellShape: SHAPE_OPTION.TALL,
            speed: 6,
            imageUrl: "https://cdn.discordapp.com/attachments/894595052427431936/1081165921743274054/My_project_34.png"
        }, {
            cellName: "Urd Jotunnson",
            cellSize: SIZE_OPTION.SMALL,
            cellShape: SHAPE_OPTION.TALL,
            speed: 5,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1081173291634532452/goblin-barbar.png"
        }, {
            cellName: "Orcsány Fiktor",
            cellSize: SIZE_OPTION.MEDIUM,
            cellShape: SHAPE_OPTION.TALL,
            speed: 6,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1081159044330430505/orcsany-fektor.png"
        }, {
            cellName: "Kildrak",
            cellSize: SIZE_OPTION.MEDIUM,
            cellShape: SHAPE_OPTION.FLAT,
            speed: 5,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1080590204781461504/dwarf.png"
        }, {
            cellName: "Jophiel",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1080574733780799529/elf-warrior.png",
            speed: 6,
        }, {
            cellName: "????",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1080577042929696798/My_project_27.png",
            speed: 5,
        }, {
            cellName: "Senki",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1080576303767486544/My_project_26.png",
            speed: 6,
        }, {
            cellName: "Jackson",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1080580334971797594/thiefling-sorcerer.png",
            speed: 6
        }, {
            cellName: "Pixie",
            cellSize: SIZE_OPTION.SMALL,
            cellShape: SHAPE_OPTION.TALL,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060890887833522226/pngegg_19.png",
            speed: 5
        }, {
            cellName: "Oni",
            cellSize: SIZE_OPTION.MEDIUM,
            cellShape: SHAPE_OPTION.TALL,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1080581560715190312/oni-remastered.png",
            speed: 6
        }, {
            cellName: "Dr. Herman",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060872053844095047/pngegg_17.png",
            speed: 6,
        }, {
            cellName: "Aizen",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1022511328771985469/1040294520350322808/My_project_9.png",
            speed: 8,
        }, {
            cellName: "Alfina",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060873325682892830/pngegg_18.png",
            speed: 8,
        }, {
            cellName: "Grug",
            cellSize: SIZE_OPTION.MEDIUM,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060870387770085476/pngegg_16.png",
            speed: 8,
        }, {
            cellName: "Kildrak",
            cellSize: SIZE_OPTION.MEDIUM,
            cellShape: SHAPE_OPTION.FLAT,
            speed: 5,
            imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1080590204781461504/dwarf.png"
        }, {
            cellName: "Spiritual Weapon",
            cellSize: SIZE_OPTION.SMALL,
            cellShape: SHAPE_OPTION.TALL,
            imageUrl: "https://cdn.discordapp.com/attachments/1022511328771985469/1040353290736640070/fire-hammer.png",
            speed: 4,
        }]
};