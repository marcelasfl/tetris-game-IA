import GameManager from "./game-manager.js";

export default class NextPieceQueue{
    constructor(queueSize) {
        this._next = []; 
        for (let i = 0; i < queueSize; i++) {
            this._next.push(GameManager.tetrominoFactory.getTetromino());
        }
    }

    pop() {
        this._next.push(GameManager.tetrominoFactory.getTetromino());
        const piece = this._next[0];
        this._next = this._next.splice(1);

        return piece;
    }

    draw() {
        for (let i = 0; i < this._next.length; i++){
            this._next[i].setPosition(-5, 5 * i).draw();
        }
    }
}