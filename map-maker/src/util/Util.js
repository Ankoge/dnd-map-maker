
export const Util = {
    save: (stateName, mapState) => {
        localStorage.setItem(stateName, JSON.stringify(mapState));
        if (Util.load(stateName) !== undefined) {
            console.log("Saved");
        } else {
            console.warn("Save failed");
        }
    },

    load: (stateName) => {
        let mapState = localStorage.getItem(stateName);
        if (mapState !== true) {
            return JSON.parse(mapState);
        } else {
            console.warn("Can't reach localstorage")
        }
    }
}