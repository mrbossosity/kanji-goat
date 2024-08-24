import { GLOBAL_MS } from "../functions/index.js";

export default class SpriteState {
    constructor(sprite, stateInfo) {
        this._sprite = sprite;
        this._x = sprite.x;
        this._y = sprite.y;
        // stateInfo formatted as {
        //     name: "",
        //     path: "",
        //     animates: boolean,
        //     loops: boolean,
        //     fixedLength: boolean,
        //     stateDuration: int,
        //     stateControlsMvmt: boolean
        // }
        if (stateInfo) {
            this._name = stateInfo.name;
            this._imgURL = `${stateInfo.path}.png`;
            this._jsonURL = `${stateInfo.path}.json`;
            this._animates = stateInfo.animates; // false if sprite is static
            this._loops = stateInfo.loops;
            this._fixedLength = stateInfo.fixedLength; // true if state exits after a finite period
            this._stateDuration = stateInfo.stateDuration; // finite state length (in frames)
            this._stateControlsMvmt = stateInfo.stateControlsMvmt;
        }

        this._frames;
        this._framesMap;
        this._frameNum = 0;
        this._frameTimer = 0;
        this._stateTimer = 0;
    }

    get name() {
        return this._name;
    }

    async build() {
        this._frames = new Image();
        this._frames.src = this._imgURL;
        this._framesMap = await fetch(this._jsonURL)
            .then((response) => response.json())
            .then((data) => {
                let mappedSprite = Object.values(data.frames).map(
                    (frame, index) => {
                        return {
                            x: frame.frame.x,
                            y: frame.frame.y,
                            w: frame.frame.w,
                            h: frame.frame.h,
                            duration: frame.duration,
                            index: index,
                        };
                    }
                );
                return mappedSprite;
            });
    }

    enter() {
        console.log(
            `${this._sprite.name} entering spriteState named ${this._name}`
        );
    }

    update() {
        if (!this._stateControlsMvmt) {
            this._x = this._sprite.x;
            this._y = this._sprite.y;
        }
        // Check if fixed length state has ended
        if (this._fixedLength) {
            if (this._stateTimer == this._stateDuration) {
                console.log(
                    `${this._sprite.name}'s fixed state named ${this._name} has ended.`
                );
                this._stateTimer = 0;
                // TOOD: exit state
                this.exit();
                return;
            } else {
                this._stateTimer++;
            }
        }

        // Advance frame timer and update animation frame
        if (this._animates) {
            this._frameTimer += GLOBAL_MS;
            if (this._frameTimer >= this._framesMap[this._frameNum].duration) {
                this._frameNum++;
                this._frameTimer = 0;

                // If on last frame, loop OR end animation and exit state
                if (this._frameNum == this._framesMap.length) {
                    if (this._loops) {
                        this._frameNum = 0;
                        this._frameTimer = 0;
                    } else {
                        console.log(
                            `${this._sprite.name}'s animated state named ${this._name} has ended.`
                        );
                        // TODO: exit state
                        this.exit();
                        return;
                    }
                }
            }
        }

        // Update sprite's render parameters
        this._sprite.renderSpecs = {
            a: this._frames,
            b: this._framesMap[this._frameNum].x,
            c: this._framesMap[this._frameNum].y,
            d: this._framesMap[this._frameNum].w,
            e: this._framesMap[this._frameNum].h,
            f: this._x,
            g: this._y,
            h: this._framesMap[this._frameNum].w,
            i: this._framesMap[this._frameNum].h,
        };
    }

    exit() {
        console.log(`${this._sprite.name} exiting state named ${this._name}`);
        // this._sprite.changeState("", {});
    }
}
