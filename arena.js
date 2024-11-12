import GameManager from './game-manager.js';
import TetrominoFactory from './tetromino-factory.js';

export default class Arena {
    constructor() {
        this._columns = GameManager.config.columns;
        this._lines = GameManager.config.lines;
        this._width = this._columns * GameManager.config.squareSize;
        this._height = this._lines * GameManager.config.squareSize;
        this.position = {
            top: (GameManager.config.height - this._height) / 2,
            left: (GameManager.config.width - this._width) / 2

        }
        this._squares = [...Array(this._columns)].map(() => [...Array(this._lines)]);

        this.currentPiece = new TetrominoFactory().getTetromino().setPosition(1, 3);
        this._currentPieceFallInterval = setInterval(this._currentPieceFall, 1000);
    }

    _currentPieceFall() {
        if (!GameManager.arena.currentPiece.tryMoveDown()){
            GameManager.arena.currentPiece.mergeToArena();
            GameManager.arena.removeCompletedLines();
            GameManager.arena.currentPiece = new TetrominoFactory().getTetromino().setPosition(1, 3);
        }
    }

    isOutsideBoundaries(i, j, piece) {
        return (piece.position.y + j) >= this._lines
        || (piece.position.x + i) >= this._columns
        || (piece.position.x + i) < 0;



    }

    conflicts(i, j, piece) {
        return this._squares[piece.position.x + i][piece.position.y + j];
    }

    setSquare(i,j, square) {
        this._squares[i][j] = square;
    }

    draw() {
        this._drawBorder();
        this._drawSquares()
        this._drawGrid();
        this.currentPiece.draw();

    }

    _drawBorder() {
        GameManager.context.strokeStyle = "#000000";
        GameManager.context.strokeRect(    
            this.position.left,
            this.position.top,
            this._width,
            this._height
        );
    }

    _drawSquares() {
        for (let i = 0; i < this._columns; i++) {
            for (let j = 0; j < this._lines; j++) {
                if (this._squares[i][j]) {
                    this._squares[i][j].draw(
                    this.position.left + i * GameManager.config.squareSize,
                    this.position.top + j * GameManager.config.squareSize,   
                )}
            }
        }
    }

    _drawGrid() {
        // beginPath, moveTo, lineTo, stroke

        GameManager.context.strokeStyle = "#dedede";
        GameManager.context.beginPath();
        for (let i = 1; i < this._lines; i++) {
            GameManager.context.moveTo(this.position.left, this.position.top + GameManager.config.squareSize * i);
            GameManager.context.lineTo(this.position.left + this._width, this.position.top + GameManager.config.squareSize * i);
        }

        for (let i = 1; i < this._columns; i++) {
            GameManager.context.moveTo(this.position.left + GameManager.config.squareSize * i, this.position.top);
            GameManager.context.lineTo(this.position.left + GameManager.config.squareSize * i, this.position.top + this._height);
        }

        GameManager.context.stroke();
    }


    removeCompletedLines() {
        let completedLines = [];
    
        for (let j = 0; j < this._lines; j++) {
            let completed = true;
    
            for (let i = 0; i < this._columns; i++) {
                if (!this._squares[i][j]) {
                    completed = false;
                    break;
                }
            }
            if (completed) {
                completedLines.push(j);
            }
        }
    
        if (completedLines.length === 0) {
            return 0;
        }
    
        for (let i = 0; i < completedLines.length; i++) {
            for (let j = 0; j < this._columns; j++) {
                this._squares[j].splice(completedLines[i], 1);
                this._squares[j].unshift(null); 
            }
        }
    
        return completedLines.length;
    }

    endLine() {
        
    }
    

}