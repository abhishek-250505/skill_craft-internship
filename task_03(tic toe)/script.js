// Tic-Tac-Toe beginner-friendly logic
const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const modeToggle = document.getElementById('mode-toggle');

const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');
const scoreDrawEl = document.getElementById('score-draw');

// Game state
let board = Array(9).fill(null); // null, 'X' or 'O'
let currentPlayer = 'X';
let running = true;
let scores = { X: 0, O: 0, D: 0 };

// Winning combinations
const WIN_COMBOS = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

// Utilities
function updateStatus(text){
  statusEl.textContent = text;
}

function renderBoard(){
  cells.forEach((cell, i) => {
    cell.textContent = board[i] || '';
    cell.classList.toggle('disabled', !!board[i] || !running);
    cell.classList.remove('win'); // remove any previous highlight
  });
}

// Check for winner; return { winner: 'X'|'O'|null, combo: [i...]|null }
function checkWinner(){
  for (const combo of WIN_COMBOS){
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      return { winner: board[a], combo };
    }
  }
  if (board.every(cell => cell !== null)){
    return { winner: null, combo: null, draw: true };
  }
  return { winner: null, combo: null };
}

function highlightCombo(combo){
  if (!combo) return;
  combo.forEach(i => cells[i].classList.add('win'));
}

// Make a move (returns true if move succeeded)
function makeMove(index){
  if (!running || board[index]) return false;
  board[index] = currentPlayer;
  return true;
}

// End game handling
function endGame(result){
  running = false;
  if (result && result.winner){
    updateStatus(`Player ${result.winner} wins!`);
    highlightCombo(result.combo);
    scores[result.winner] += 1;
  } else {
    updateStatus(`It's a draw!`);
    scores.D += 1;
  }
  updateScoresUI();
  renderBoard();
}

// Update scoreboard DOM
function updateScoresUI(){
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDrawEl.textContent = scores.D;
}

// Switch player
function switchPlayer(){
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

// Handle player's click
function onCellClick(e){
  const idx = Number(e.currentTarget.dataset.index);
  if (!makeMove(idx)) return; // invalid click
  renderBoard();

  const res = checkWinner();
  if (res.winner || res.draw) {
    endGame(res);
    return;
  }

  switchPlayer();

  
  if (modeToggle.checked && currentPlayer === 'O' && running){
    // small delay to feel natural
    setTimeout(computerMove, 350);
  }
}

function computerMove(){
  if (!running) return;

  
  const avail = board.map((v,i) => v === null ? i : null).filter(v => v !== null);

  function findWinningMove(player){
    for (const idx of avail){
      const copy = board.slice();
      copy[idx] = player;
      for (const combo of WIN_COMBOS){
        const [a,b,c] = combo;
        if (copy[a] && copy[a] === copy[b] && copy[a] === copy[c]){
          return idx;
        }
      }
    }
    return null;
  }

  // 1) win
  let move = findWinningMove('O');
  // 2) block X
  if (move === null) move = findWinningMove('X');
  // 3) center
  if (move === null && board[4] === null) move = 4;
  // 4) corners
  const corners = [0,2,6,8].filter(i => board[i] === null);
  if (move === null && corners.length) move = corners[Math.floor(Math.random()*corners.length)];
  // 5) random
  if (move === null && avail.length) move = avail[Math.floor(Math.random()*avail.length)];

  if (move !== null){
    makeMove(move);
    renderBoard();

    const res = checkWinner();
    if (res.winner || res.draw){
      endGame(res);
      return;
    }

    switchPlayer();
  }
}

// Reset board (keep scores)
function resetBoard(){
  board = Array(9).fill(null);
  currentPlayer = 'X';
  running = true;
  updateStatus(`Player ${currentPlayer}'s turn`);
  cells.forEach(c => c.classList.remove('win'));
  renderBoard();
}


function fullReset(){
  scores = { X: 0, O: 0, D: 0 };
  updateScoresUI();
  resetBoard();
}


cells.forEach(cell => cell.addEventListener('click', onCellClick));
resetBtn.addEventListener('click', fullReset);

modeToggle.addEventListener('change', () => {
 
  resetBoard();
});


window.addEventListener('keydown', (e) => {
 
  const keyMap = {
    '1': 6, '2': 7, '3': 8,
    '4': 3, '5': 4, '6': 5,
    '7': 0, '8': 1, '9': 2
  };
  if (e.key in keyMap && running){
    const idx = keyMap[e.key];
  
    cells[idx].click();
  } else if (e.key === 'r' || e.key === 'R'){
    fullReset();
  } else if (e.key === 'Escape'){
    resetBoard();
  }
});

// initial render
renderBoard();
updateScoresUI();
updateStatus(`Player ${currentPlayer}'s turn`);
