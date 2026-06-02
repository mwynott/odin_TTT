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
