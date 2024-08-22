export default class DBLoader {
    constructor(arr) {
        this._jsonsToLoad = arr;
        this._allSets = {};
        this._activeSets = {};
    }

    // Public
    get activeSets() {
        return this._activeSets;
    }

    addSet(name) {
        if (!(name in this._activeSets)) {
            this._activeSets[name] = this._allSets[name];
        }
    }

    removeSet(name) {
        if (name in this._activeSets) {
            delete this._activeSets[name];
        }
    }

    async load() {
        for (let json of this._jsonsToLoad) {
            let name = json.name;
            let path = json.path;
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`Error ${response.status}`);
                const data = await response.json();
                this._allSets[name] = data;
            } catch (error) {
                console.error("Error fetching JSON:", error);
            }
        }
    }

    update() {}
}
