export const Util = {
    save: (stateName,mapState) => {
        localStorage.setItem(stateName, JSON.stringify(mapState));
    },

    load: (stateName) => {
        let mapState = localStorage.getItem(stateName);
        if (mapState !== undefined) {
            return this.setState(JSON.parse(mapState));
        }
    },



}