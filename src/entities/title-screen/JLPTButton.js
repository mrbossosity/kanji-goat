import ButtonSprite, { ButtonSpriteState } from "../ButtonSprite.js";

export default class JLPTButtonSprite extends ButtonSprite {
    constructor(
        name,
        gameState,
        x,
        y,
        width,
        height,
        defaultSpritePath,
        selectedSpritePath,
        selectCallbackFn,
        deselectCallbackFn
    ) {
        super(
            name,
            gameState,
            x,
            y,
            width,
            height,
            defaultSpritePath,
            selectedSpritePath,
            selectCallbackFn,
            deselectCallbackFn
        );
    }

    async build() {
        super.build();

        const defaultState = new ButtonSpriteState(
            this,
            {
                name: "default",
                path: this._defaultSpritePath,
                animates: false,
                loops: false,
                fixedLength: false,
                stateDuration: null,
            },
            this._selectCallbackFn
        );
        await defaultState.build();
        this._stateMachine.addState(defaultState.name, defaultState);

        const selectedState = new ButtonSpriteState(
            this,
            {
                name: "selected",
                path: this._selectedSpritePath,
                animates: false,
                loops: false,
                fixedLength: false,
                stateDuration: null,
            },
            this._deselectCallbackFn
        );
        await selectedState.build();
        this._stateMachine.addState(selectedState.name, selectedState);

        this.changeState("default");
    }
}
