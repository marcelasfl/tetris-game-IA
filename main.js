import GameManager from "./game-manager.js";

    const config = {
        width: 960,
        height: 540,
        columns: 10,
        lines: 20,
        squareSize: 25,
        nextPieceQueueSize: 2
    };

GameManager.start(config);