import { canvas, ctx } from "./index.js";

export default class Animator {
    constructor() {
        this._objectsToRender = [];
    }

    addEntity(entity) {
        this._objectsToRender.push(entity);
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let obj of this._objectsToRender) {
            obj.render();
        }
    }
}

// export const globalRender = new GlobalRender();
