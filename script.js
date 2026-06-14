// Player
const player = (name, marker) => {
    let playerName = name;
    const getName = () => playerName;
    const setName = (newName) => { playerName = newName; };
    const getMarker = () => marker;
    return { getName, setName, getMarker };
};

// Board
const gameBoard = (() => {
    const board = Array(9).fill('');
    const getBoard = () => board;
    const updateBoard = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };
    const resetBoard = () => board.fill('');
    return { getBoard, updateBoard, resetBoard };
})();

// Game Controller
const gameController = (() => {
    let currentPlayer;
    let gameActive = false;
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');

    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winConditions.some(([a, b, c]) =>
            board[a] !== '' && board[a] === board[b] && board[b] === board[c]
        );
    };

    const checkTie = () => gameBoard.getBoard().every(cell => cell !== '');

    const getCurrentPlayer = () => currentPlayer;

    const resetGame = () => {
        gameBoard.resetBoard();
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = player1;
        gameActive = true;
        statusDisplay.textContent = `${currentPlayer.getName()}'s turn`;
    };

    const startGame = () => {
        if (gameActive) return; // Prevent re-entry

        const p1Name = prompt("Enter name for Player 1 (X):", "Player 1");
        player1.setName(p1Name?.trim() || 'Player 1');

        const p2Name = prompt("Enter name for Player 2 (O):", "Player 2");
        player2.setName(p2Name?.trim() || 'Player 2');

        startButton.disabled = true;
        restartButton.disabled = false;

        resetGame();
    };

    const endGame = (message) => {
        statusDisplay.textContent = message;
        gameActive = false;
        setTimeout(resetGame, 1500);
    };

    function cellClicked(e) {
        if (!gameActive) {
            statusDisplay.textContent = "Press Start Game to begin!";
            return;
        }
        if (e.target.textContent !== '') return;

        gameBoard.updateBoard(e.target.dataset.index, currentPlayer.getMarker());
        e.target.textContent = currentPlayer.getMarker();

        if (checkWin()) {
            setTimeout(() => endGame(`${currentPlayer.getName()} wins!`), 500);
        } else if (checkTie()) {
            setTimeout(() => endGame("It's a tie!"), 500);
        } else {
            switchPlayer();
            statusDisplay.textContent = `${currentPlayer.getName()}'s turn`;
        }
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', () => {
        if (!gameActive) return;
        resetGame();
    });
    cells.forEach(cell => cell.addEventListener('click', cellClicked));

    return { getCurrentPlayer, switchPlayer, checkWin, checkTie };
})();