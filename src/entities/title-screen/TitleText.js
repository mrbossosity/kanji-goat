import { ctx } from "../../functions/index.js";
import Sprite from "../Sprite.js";

export default class TitleText extends Sprite {
    constructor(
        gameState,
        x,
        y,
        width,
        height,
        fontName,
        fontURL,
        fontSize,
        color,
        subColor
    ) {
        super(gameState, x, y, width, height);
        this._fontName = fontName;
        this._fontURL = fontURL;
        this._font;
        this._fontLoaded = false;
        this._fontSize = fontSize;
        this._renderText = "漢字 Goat";
        this._color = color;
        this._subColor = subColor;
    }

    async build() {
        // Load font
        const font = new FontFace(this._fontName, this._fontURL);
        document.fonts.add(font);
        this._font = await font.load();
        this._fontLoaded = true;
    }

    render() {
        ctx.font = `${this._fontSize}px ${this._fontName}`;
        ctx.textAlign = "center";
        ctx.fillStyle = this._subColor;
        ctx.fillText(this._renderText, this._x - 4, this._y + 4);

        ctx.fillStyle = this._color;
        ctx.fillText(this._renderText, this._x, this._y);
    }
}
