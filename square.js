import GameManager from "./game-manager.js";


export default class Square {
    constructor(color) {
        this._color = color;

    }

    draw(x,y) {
        GameManager.context.fillStyle = this._color;
        GameManager.context.fillRect(x,y,GameManager.config.squareSize, GameManager.config.squareSize);
    }
}  