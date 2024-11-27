import GameManager from "./game-manager.js";

    const config = {
        width: 960,
        height: 540,
        columns: 10,
        lines: 20,
        squareSize: 25,
        nextPieceQueueSize: 2,
        initialPiecefallInMilliseconds: 1000,
        piecefallIntervalDecay: 0.9

    };

GameManager.start(config);