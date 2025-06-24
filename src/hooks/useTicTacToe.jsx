import { useState } from "react";
import { checkWinner, checkEndTheGame } from "../utils/gameLogic";

export const useTicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("x");
    const [winner, setWinner] = useState(null);
    const [difficulty, setDifficulty] = useState("easy");

    const updateSquares = (ind) => {
        if (squares[ind] || winner) {
            return;
        }
        const s = [...squares];
        s[ind] = turn;
        setSquares(s);
        setTurn(turn === "x" ? "o" : "x");
        const W = checkWinner(s);
        if (W) {
            setWinner(W);
        } else if (checkEndTheGame(s)) {
            setWinner("x | o");
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setTurn("x");
        setWinner(null);
    };

    const changeDifficulty = () => {
        const difficulties = ["easy", "medium", "hard"];
        const currentIndex = difficulties.indexOf(difficulty);
        const nextDifficulty = difficulties[(currentIndex + 1) % difficulties.length];
        setDifficulty(nextDifficulty);
        resetGame();
    };

    return {
        squares,
        turn,
        winner,
        difficulty,
        updateSquares,
        resetGame,
        changeDifficulty,
    };
};
