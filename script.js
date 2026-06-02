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
    return {getBoard, updateBoard};
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
    }