import GameManager from "./game-manager.js";

//aq é onde faço os movimentos com o teclad
export default class InputHandler {
    constructor() {
        document.addEventListener("keydown", this.onKeyDown)
    }
    onKeyDown(e){
        switch(e.code) {
            case "KeyS":
                GameManager.arena.currentPiece.tryMoveDown();
                break;
        }
        switch(e.code) {
            case "KeyW":
                GameManager.arena.currentPiece.tryRotateClockWise();
                break;
        }

        switch(e.code) {
            case "KeyA":
                GameManager.arena.currentPiece.tryMoveLeft();
                break;
        }

        switch(e.code) {
            case "KeyD":
                GameManager.arena.currentPiece.tryMoveRight();
                break;
            case "Space":
                while (GameManager.arena.currentPiece.tryMoveDown());
                break;
        } 

        switch(e.code) {
            case "ArrowLeft":
                GameManager.arena.currentPiece.tryMoveLeft();
                break;
        }

        switch(e.code) {
            case "ArrowRight":
                GameManager.arena.currentPiece.tryMoveRight();
                break;
        }

        switch(e.code) {
            case "ArrowDown":
                GameManager.arena.currentPiece.tryMoveDown();
                break;
        }

        switch(e.code) {
            case "ArrowUp":
                GameManager.arena.currentPiece.tryRotateClockWise();
                break;
        }
    }
}