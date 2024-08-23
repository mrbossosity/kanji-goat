import { ctx } from "../../functions/index.js";
import TextSprite from "../TextSprite.js";

export default class ScoreText extends TextSprite {
    constructor(
        name,
        gameState,
        x,
        y,
        text,
        fontName,
        fontURL,
        fontSize,
        textAlign,
        color,
        subColor,
        subColorOffsetX,
        subColorOffsetY
    ) {
        super(
            name,
            gameState,
            x,
            y,
            text,
            fontName,
            fontURL,
            fontSize,
            textAlign,
            color,
            subColor,
            subColorOffsetX,
            subColorOffsetY
        );
        this._score = 0;
    }

    // Public
    async build() {
        const font = new FontFace(this._fontName, this._fontURL);
        document.fonts.add(font);
        this._font = await font.load();

        this._gameState.updater.addEntity(this);
    }

    addPoints(num) {
        this._score += num;
    }

    reset() {
        this._score = 0;
    }

    update() {
        this._text = "Score: " + this._score.toString();
    }

    // render() {
    //     ctx.font = `${this._fontSize}px ${this._fontName}`;
    //     ctx.textAlign = "left";
    //     ctx.fillStyle = "black";
    //     ctx.fillText(
    //         this._renderText,
    //         this._x + this._margin - 4,
    //         this._y + this._margin + this._fontSize + 2
    //     );

    //     ctx.fillStyle = this._fontColor;
    //     ctx.fillText(
    //         this._renderText,
    //         this._x + this._margin,
    //         this._y + this._margin + this._fontSize
    //     );
    // }
}
