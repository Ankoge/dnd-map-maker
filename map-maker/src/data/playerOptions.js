export const PLAYER_OPTIONS = {
    changeSize: (name, size) => {
        const playerForShapeChange = PLAYER_OPTIONS.players.find(player => player.cellName === name);
        if (playerForShapeChange) {
            playerForShapeChange.cellSize = size;
        }
    },
    changeShape: (name, shape) => {
        const playerForShapeChange = PLAYER_OPTIONS.players.find(player => player.cellName === name);
        if (playerForShapeChange) {
            playerForShapeChange.cellShape = shape;
        }
    }
    ,players: [
    {
        cellName: "Jophiel",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060899537658589245/pngegg_21.png",
        speed: 6,
    }, {
        cellName: "????",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060901262641602570/My_project_20.png",
        speed: 5,
    }, {
        cellName: "My Name Is Nobody",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060898933750124604/pngegg_20.png",
        speed: 6,
    }, {
        cellName: "Jackson",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060898323860566137/My_project_19.png",
        speed: 6
    }, {
        cellName: "Pixie",
        cellSize: "small",
        cellShape: "tall",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060890887833522226/pngegg_19.png",
        speed: 5
    }, {
        cellName: "Oni",
        cellSize: "medium",
        cellShape: "tall",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1078419627723460648/oni-remastered.png",
        speed: 6
    }, {
        cellName: "Dr. Herman",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060872053844095047/pngegg_17.png",
        speed: 6,
    }, {
        cellName: "Aizen",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1022511328771985469/1040294520350322808/My_project_9.png",
        speed: 8,
    }, {
        cellName: "Alfina",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060873325682892830/pngegg_18.png",
        speed: 8,
    }, {
        cellName: "Grug",
        cellSize: "medium",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1060870387770085476/pngegg_16.png",
        speed: 8,
    }, {
        cellName: "Spiritual Weapon",
        cellSize: "small",
        cellShape: "tall",
        cellUrl: "https://cdn.discordapp.com/attachments/1022511328771985469/1040353290736640070/fire-hammer.png",
        speed: 4,
    },{
        cellName: "Miner Dwarf",
        cellSize: "small",
        cellShape: "round",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1061009114295185439/pngegg_31.png",
        speed: 4
    }, {
        cellName: "Smith Dwarf",
        cellSize: "small",
        cellShape: "tall",
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1061018524430119084/My_project_22.png",
        speed: 4
    }, {
        cellName: "Cat",
        cellSize: "tiny",
        cellShape: "tall",
        speed: 8,
        cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1061276011926392922/pngwing.com_1.png"
    },{
        cellName: "Cuki",
        cellSize: "medium",
        cellShape: "round",
        speed: 5,
        cellUrl: "https://www.kryxrpg.com/static/295c8956c39f286151c102a2e8b3e7cc/02303/hell-hound.avif",

    }]};