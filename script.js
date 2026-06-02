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




//Game Controller
