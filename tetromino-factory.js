import Tetromino from "./tetromino.js";

export default class TetrominoFactory {
    constructor() {
        this._collection = [
            () => new Tetromino(
                "#0000bb",
                [
                    [0,0,1,0],
                    [0,0,1,0],
                    [0,0,1,0],
                    [0,0,1,0],
    
                ]
            ),

            () => new Tetromino(
                "#00bbbb",
                [
                    [0,0,0,0],
                    [0,0,1,0],
                    [1,1,1,0],
                    [0,0,0,0],
    
                ]
            ),

            () => new Tetromino(
                "#bbbb00",
                [
                    [0,0,0,0],
                    [0,1,0,0],
                    [0,1,1,1],
                    [0,0,0,0],
    
                ]
            ),

            () => new Tetromino(
                "#bbbbbb",
                [
                    [0,0,0,0],
                    [0,1,0,0],
                    [1,1,1,0],
                    [0,0,0,0],
    
                ]
            ),

            () => new Tetromino(
                "#bb0000",
                [
                    [0,0,0,0],
                    [1,1,0,0],
                    [0,1,1,0],
                    [0,0,0,0],
    
                ]
            ),

            () => new Tetromino(
                "#bb00bb",
                [
                    [0,0,0,0],
                    [0,1,1,0],
                    [1,1,0,0],
                    [0,0,0,0],
    
                ]
            ),

            () => new Tetromino(
                "#00bb00",
                [
                    [0,0,0,0],
                    [0,1,1,0],
                    [0,1,1,0],
                    [0,0,0,0],

                ]
            ),
        ];
    }

    getTetromino () {
        const randomIndex = Math.floor(Math.random() * this._collection.length);
        return this._collection[randomIndex]();
    }
}