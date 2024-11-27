import Arena from "./arena.js";
import InputHandler from "./input-handler.js";
import NextPieceQueue from "./next-piece-queue.js";
import TetrominoFactory from "./tetromino-factory.js";
import Score from "./score.js";


export default class GameManager{
   static start (config) {
        GameManager.config = config;
        window.addEventListener("load", GameManager._init)
    };

    static _init(){
        let canvas = document.getElementById("canvas");
        canvas.width = GameManager.config.width;
        canvas.height = GameManager.config.height;

        GameManager.context = canvas.getContext("2d");
        GameManager.score = new Score();
        GameManager.tetrominoFactory = new TetrominoFactory();
        GameManager.nextPieceQueue = new NextPieceQueue(GameManager.config.nextPieceQueueSize);
        GameManager.arena = new Arena();
        GameManager.inputHandler = new InputHandler();
        

        GameManager._draw();

    }

    static _draw(){

        GameManager.context.clearRect(0, 0, GameManager.config.width, GameManager.config.height);

        GameManager.arena.draw();
        GameManager.nextPieceQueue.draw();


        requestAnimationFrame(GameManager._draw);
    }

    static levelUp(newLevel) {
        GameManager.arena.levelUp(newLevel);
        
    }

    
}