let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
let ties = 0;

const cells = document.querySelectorAll(".cell");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const tiesEl = document.getElementById("ties");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] !== "") return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            setTimeout(() => {
                alert(`Jugador ${currentPlayer} ganó!`);
                updateScore(currentPlayer);
                resetBoard();
            }, 100);
            return;
        }

        if (board.every(cell => cell !== "")) {
            setTimeout(() => {
                alert("Empate!");
                ties++;
                tiesEl.textContent = ties;
                resetBoard();
            }, 100);
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
});

function checkWin() {
    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    
    return winCombos.some(combo =>
        combo.every(i => board[i] === currentPlayer)
    );
}

function updateScore(player) {
    if (player === "X") {
        scoreX++;
        scoreXEl.textContent = scoreX;
    } else {
        scoreO++;
        scoreOEl.textContent = scoreO;
    }
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(c => c.textContent = "");
    currentPlayer = "X";
}

document.getElementById("resetBtn").addEventListener("click", resetBoard);
