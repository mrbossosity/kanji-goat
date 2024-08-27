import TextSprite from "../TextSprite";

export default class CarrotText extends TextSprite {
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
    }

    get canRender() {
        return this._canRender;
    }

    set canRender(boolean) {
        this._canRender = boolean;
    }

    async build() {
        super.build();
    }
}
