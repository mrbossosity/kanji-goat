import { ctx } from "../functions/index.js";
import Sprite from "./Sprite.js";

export default class TextSprite extends Sprite {
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
        super(name, gameState, x, y, null, null);
        this._text = text;
        this._fontName = fontName;
        this._fontURL = fontURL;
        this._font;
        this._fontSize = fontSize;
        this._textAlign = textAlign;
        this._color = color;
        if (subColor) {
            this._subColor = subColor;
            this._subColorOffsetX = subColorOffsetX;
            this._subColorOffsetY = subColorOffsetY;
        }
    }

    async build() {
        // Load font
        const font = new FontFace(this._fontName, this._fontURL);
        document.fonts.add(font);
        this._font = await font.load();
    }

    render() {
        if (this._subColor) {
            ctx.font = `${this._fontSize}px ${this._fontName}`;
            ctx.textAlign = this._textAlign;
            ctx.fillStyle = this._subColor;
            ctx.fillText(
                this._text,
                this._x - this._subColorOffsetX,
                this._y + this._subColorOffsetY
            );
        }
        ctx.textAlign = this._textAlign;
        ctx.fillStyle = this._color;
        ctx.fillText(this._text, this._x, this._y);
    }
}
