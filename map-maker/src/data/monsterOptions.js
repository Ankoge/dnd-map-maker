export const MONSTER_OPTIONS = {

    monsters: [
        {
            cellName: "Bandit Chief",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://www.kryxrpg.com/static/a5ef4a2187298abc4de31ba3f0fca6c7/5aa84/bandit.avif"
        }, {
            cellName: "Bandit",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1039964412703952976/My_project_2.png"
        }, {
            cellName: "Berserker",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1039961944397975652/berserker_main.png"
        }, {
            cellName: "Thief Cat",
            cellSize: "medium",
            cellShape: "round",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1067440767020322866/pngegg_41.png"
        }, {
            cellName: "Beholder",
            cellSize: "large",
            cellShape: "round",
            cellUrl: "https://www.kryxrpg.com/static/b5bfe3f8f12161cc1a1d23eb5341538b/49e7e/beholder.avif"
        }, {
            cellName: "Abominable Yeti",
            cellSize: "huge",
            cellShape: "tall",
            cellUrl: "https://www.kryxrpg.com/static/3110afcfe7d9cd419f79494cd4858067/997b7/abominable-yeti.avif"
        }, {
            cellName: "Fat Assasin",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1042437552717701140/pngwing.com.png"
        }, {
            cellName: "Brew Witch",
            cellSize: "medium",
            cellShape: "tall",
            cellUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1050851179745263687/My_project_16.png"
        }
    ],
    addMonster: (name, size, url) => {
        MONSTER_OPTIONS.monsters.push(
            {
                cellName: name,
                cellSize: size,
                cellShape: "tall",
                cellUrl: url
            }
        )
    },
    changeShape: (name, shape) => {
        const monsterForShapeChange = MONSTER_OPTIONS.monsters.find((monster) => monster.cellName === name);
        if (monsterForShapeChange) {
            monsterForShapeChange.cellShape = "shape";
        }
    }
};