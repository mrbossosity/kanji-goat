export default class KanjiManager {
    constructor(game, arr) {
        this._game = game;
        this._jsonsToLoad = arr;
        this._allDecks = {};
        this._activeDecks = {};
        this._gameDeck;

        this._input = document.getElementById("answer-input");
        this._currentCard;
        this._hiraganizedAnswer;
    }

    // Public
    get activeDecks() {
        return this._activeDecks;
    }

    get gameDeck() {
        return this._gameDeck;
    }

    get input() {
        return this._input;
    }

    get hiraganizedAnswer() {
        return this._hiraganizedAnswer;
    }

    set hiraganizedAnswer(string) {
        this._hiraganizedAnswer = string;
    }

    get currentCard() {
        return this._currentCard;
    }

    addDeck(name) {
        if (!(name in this._activeDecks)) {
            this._activeDecks[name] = this._allDecks[name];
        }
    }

    removeDeck(name) {
        if (name in this._activeDecks) {
            delete this._activeDecks[name];
        }
    }

    buildGameDeck() {
        this._gameDeck = Object.values(this._activeDecks).flatMap((v) =>
            Object.values(v).flat()
        );
    }

    randomCard() {
        if (this._gameDeck) {
            this._currentCard =
                this._gameDeck[
                    Math.floor(Math.random() * this._gameDeck.length)
                ];
            return this._currentCard;
        }
    }

    async build() {
        for (let json of this._jsonsToLoad) {
            let name = json.name;
            let path = json.path;
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`Error ${response.status}`);
                const data = await response.json();
                this._allDecks[name] = data;
            } catch (error) {
                console.error("Error fetching JSON:", error);
            }
        }
    }

    update() {}
}
