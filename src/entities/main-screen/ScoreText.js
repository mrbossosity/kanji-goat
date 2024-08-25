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
    addPoints(num) {
        this._score += num;
    }

    reset() {
        this._score = 0;
    }

    update() {
        super.update();
        this._text = "Score: " + this._score.toString();
    }
}
