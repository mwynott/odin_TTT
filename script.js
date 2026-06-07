//Player
//Factory function to create players
const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
};

//Board

const gameBoard = (() => {
    //Array to hold empty spaces on the board
    const board = Array(9).fill('');
    const getBoard = () => board;

    //Function to update the board with the player's marker
    const updateBoard = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };
    //Function to reset gameBoard to empty spaces
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }
    return {getBoard, updateBoard, resetBoard};
})();

//Game Controller
const gameController = (() => {
    let currentPlayer;
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');

//Function to switch the current player
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
//Function to check for a win condition
    const checkWin = () => {
        const board = gameBoard.getBoard();
        //All possible win conditions for indices on 3x3 grid
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        /*Check if any of the win conditions above are met for each of the
        indices on the board. If the cells at those indices are not empty and
        they are the same, then we have a winner!*/
        return winConditions.some(([a, b, c]) =>
        board[a] !== '' && board[a] === board[b] && board[b] === board[c]
    );
    }

//Function to check for tie
    const checkTie = () => {
        const board = gameBoard.getBoard();
        return board.every(cell => cell !== '');
    };
    
//Function to start the game
    const getCurrentPlayer = () => currentPlayer;
    const startGame = () => {
        currentPlayer = player1;
    }

    return {startGame, switchPlayer, checkWin, checkTie, getCurrentPlayer};
})();



//UI Controller

let cell = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', () => {
    gameBoard.resetBoard();
    cell.forEach(cell => cell.textContent = '');
    gameController.startGame();
});

const cellClicked = () => {
    console.log('Cell clicked');
}

cell.forEach(cell => cell.addEventListener('click', cellClicked));


