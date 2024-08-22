import { ctx } from "../../functions/index.js";

export default class ScoreText {
    constructor(
        gameState,
        x,
        y,
        fontName,
        fontURL,
        fontSize,
        fontColor,
        margin
    ) {
        this._x = x;
        this._y = y;

        this._font;
        this._fontName = fontName;
        this._fontURL = fontURL;
        this._fontLoaded = false;
        this._fontSize = fontSize;
        this._fontColor = fontColor;
        this._margin = margin;

        this._baseText = "Score: ";
        this._score = 0;
        this._renderText;

        gameState.updater.addEntity(this);
    }

    // Private

    // Public
    async build() {
        const font = new FontFace(this._fontName, this._fontURL);
        document.fonts.add(font);
        this._font = await font.load();
        this._fontLoaded = true;
    }

    addPoints(num) {
        this._score += num;
    }

    reset() {
        this._score = 0;
    }

    update() {
        if (this._fontLoaded) {
            this._renderText = this._baseText + this._score.toString();
        }
    }

    render() {
        ctx.font = `${this._fontSize}px ${this._fontName}`;
        ctx.textAlign = "left";
        ctx.fillStyle = "black";
        ctx.fillText(
            this._renderText,
            this._x + this._margin - 4,
            this._y + this._margin + this._fontSize + 2
        );

        ctx.fillStyle = this._fontColor;
        ctx.fillText(
            this._renderText,
            this._x + this._margin,
            this._y + this._margin + this._fontSize
        );
    }
}

// export const scoreText = new ScoreText(
//     0,
//     0,
//     "Supply Text",
//     "url(/src/assets/fonts/supply-center.ttf)",
//     25,
//     "white",
//     20
// );
