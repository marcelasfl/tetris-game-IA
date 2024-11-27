import GameManager from './game-manager.js';



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

        this.currentPiece = GameManager.tetrominoFactory.getTetromino().setPosition(1, 1);
        this.endLinePosition = { x: 1, y: 1 };
        this._currentPieceFallInterval = setInterval(this._currentPieceFall, 1000);

        this.score = 0;

    }

    checkGameOver() {
        console.log(this._squares)

        return this._squares.some(x => {
            return x[1] !== undefined && x[1] !== null
        })

    }

    endGame() {
        // Pausa o jogo
        clearInterval(this._currentPieceFallInterval);
        const userChoice = confirm('Fim de jogo! Deseja jogar novamente?');
    
        if (userChoice) {
            this.restartGame();
        } else {
            console.log('Jogo encerrado.');
        }
    }
    
    restartGame() {
        this._squares = [...Array(this._columns)].map(() => [...Array(this._lines)]);
        this.currentPiece = GameManager.tetrominoFactory.getTetromino().setPosition(1, 1);
        
        this._currentPieceFallInterval = setInterval(this._currentPieceFall, 1000);
    
        this.draw();
    }


    _currentPieceFall() {
        if (!GameManager.arena.currentPiece.tryMoveDown()) {
            GameManager.arena.currentPiece.mergeToArena();
            
            if (GameManager.arena.checkGameOver()) {
                GameManager.arena.endGame(); 
                clearInterval(this._currentPieceFallInterval); 
 
            }
            
            GameManager.arena.removeCompletedLines();
            GameManager.arena.currentPiece = GameManager.nextPieceQueue.pop().setPosition(1, 1);
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
        this._drawScore();

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

    _drawScore() {
        GameManager.context.font = '20px Arial';
        GameManager.context.fillStyle = '#000';
        GameManager.context.clearRect(10, 10, 200, 30); 
        GameManager.context.fillText(`Score: ${this.score}`, 10, 30);
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
    
        const animationDuration = 500; 
        const startTime = Date.now();
    
        const animate = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = elapsedTime / animationDuration;
    
            if (progress > 1) {
                for (let i = 0; i < completedLines.length; i++) {
                    for (let j = 0; j < this._columns; j++) {
                        this._squares[j].splice(completedLines[i], 1);
                        this._squares[j].unshift(null);
                    }
                }
    
                this.updateScore(completedLines.length);
                this.draw();
                return;
            }
    
            GameManager.context.fillStyle = `rgba(255, 255, 0, ${0.5 + 0.5 * Math.sin(progress * Math.PI)})`;
            for (const line of completedLines) {
                GameManager.context.fillRect(
                    this.position.left,
                    this.position.top + line * GameManager.config.squareSize,
                    this._width,
                    GameManager.config.squareSize
                );
            }
    
            requestAnimationFrame(animate);
        };
    
        animate();
    
        return completedLines.length;
    }
    

    updateScore(linesRemoved) {
        const pointsPerLine = [0, 100, 300, 500, 800];
        this.score += pointsPerLine[linesRemoved] || 0;
        this.draw(); 
    }

    

}