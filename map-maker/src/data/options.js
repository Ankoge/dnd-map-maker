export const OPTION_TYPE = {
    PLAYER: "player",
    MONSTER: "monster",
    ENVIRONMENT: "environment",
    BLANK: "blank",
    SOIL: "soil",
    CREATURE: "creature",
    DELETE: "delete",
}

export const TERRAIN = {
    LEVEL: {
        "movable": 1,
        "hard": 2,
        "unmovable": 3,
        "catch": 4,
    },
    OPTION: {
        MOVABLE: "movable",
        HARD: "hard",
        UNMOVABLE: "unmovable",
        CATCH: "catch",
    }
}


export const SHAPE_OPTION = {
    TALL: {
        name: "tall",
        imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1078363909024649216/tall-icon.png",
    },
    ROUND: {
        name: "round",
        imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1078364099928408125/round-icon.png",
    },
    FLAT: {
        name: "flat",
        imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1078363931040551052/flat-icon.png",
    },
    TALL_OVER_SIZED: {
        name: "tall-over-sized",
        imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1078363909024649216/tall-icon.png",
    }
}

export const SIZE_OPTION = {
    NO_SIZE: "",
    TINY: "tiny",
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
    HUGE: "huge",
    GARGANTUA: "gargantuan",
}

export const SIZE_ICON = {
    name: "size",
    imageUrl: "https://cdn.discordapp.com/attachments/1039961105046437989/1078405045311258674/pngegg_58.png"
}

export const BACKGROUND_OPTIONS = [
    {
        name: "Default",
        url: "https://cdn.discordapp.com/attachments/1039961105046437989/1072134876901429298/transparent.png"
    }, {
        name: "Grass",
        url: "https://cdn.discordapp.com/attachments/1039961105046437989/1072211457011355800/AdobeStock_418559126_Preview.jpeg"
    }, {
        name: "Dessert",
        url: "https://cdn.discordapp.com/attachments/1039961105046437989/1072206046602473532/sand.jpg"
    }, {
        name: "Acid Dessert",
        url: "https://cdn.discordapp.com/attachments/1039961105046437989/1072208867850727434/yellow-tile-1.jpeg"
    }, {
        name: "Gravel",
        url: "https://cdn.discordapp.com/attachments/1039961105046437989/1072207782444531814/gravel-soil.jpg"
    }
]
