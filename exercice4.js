const nbCellsX = 8;
const nbCellsY = 8;
const board = [...Array(nbCellsX)].map(e => Array(nbCellsY));

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const knightMoves = [[1,2],[2,1],[1,-2],[-2,1],[-1,2],[2,-1],[-1,-2],[-2,-1]]; // all possible knight moves

const moves = [];
let firstTime = true;
let pressedCell;

function Cell(dom, x, y, color) {
	this.dom = dom;
	this.x = x;
	this.y = y;
	this.intialColor = color;
}

// switches a color between black and transparent
function switchColor(color) {
	let c = color;
	if (c == 'black') {
		c = 'transparent';
	} else {
		c = 'black';
	}
	return c;
}

// returns a cell with an indicator inside (for ex. a column number like A, B, C etc.)
function getIndicatorCell(indicator) {
	const cell = document.createElement('td');
	cell.innerHTML = '<p>'+indicator+'</p>';
	cell.setAttribute('class', 'indicator');
	return cell;
}

// returns the row with letter indicators (A, B, C, D etc.)
function getLetterIndicatorsRow() {
	const row = document.createElement('tr');

	const emptyCell1 = getIndicatorCell('');
	row.appendChild(emptyCell1);

	for (let i = 0; i < nbCellsY; i += 1) {
			row.appendChild(getIndicatorCell(letters[i]));
	}

	const emptyCell2 = getIndicatorCell('');
	row.appendChild(emptyCell2);
	return row;
}

// fills the html table and the board array with empty cells
function fillTable() {
	const table = document.getElementById('table');
	let color = 'transparent';
	const row = document.createElement('tr');

	table.appendChild(getLetterIndicatorsRow());

	for (let i = 0; i < nbCellsY; i += 1) {
		const row = document.createElement('tr');
		row.appendChild(getIndicatorCell(nbCellsX - i));

		for (let j = 0; j < nbCellsX; j += 1) {
			const cell = document.createElement('td');
			cell.setAttribute('onclick', 'putKnight('+i+','+j+')');
			cell.style.background = color;
			board[i][j] = new Cell(cell, i+1, j+1, color);
			row.appendChild(cell);
			color = switchColor(color);
		}

		row.appendChild(getIndicatorCell(nbCellsX - i));
		table.appendChild(row);
		color = switchColor(color);
	}

	table.appendChild(getLetterIndicatorsRow());
}

// cleans colored cells
function movesClean() {
	for (let i = moves.length - 1; i >= 0; i--) {
		moves[i].dom.style.background = moves[i].intialColor;
		moves.splice(i, 1);
	}
}

// given a certain position, returns a string containing possible moves for the knight
function getNextPositions(cell) {
	for (let i = 0; i < knightMoves.length; i += 1) {
		const newX = cell.x + knightMoves[i][0];
		const newY = cell.y + knightMoves[i][1];
		if ((1 <= newX && newX <= nbCellsX) && (1 <= newY && newY <= nbCellsY)) {
			move = board[newX-1][newY-1];
			move.dom.style.background = '#12C429';
			moves.push(move);
		}
	}
}

// function called when the user clicks on a cell where he wants to put his knight
function putKnight(i, j) {
	const cell = board[i][j];
	if (!firstTime) {
		movesClean();
		pressedCell.dom.style.background = pressedCell.intialColor;
	}
	cell.dom.style.background = 'blue';
	pressedCell = cell;
	getNextPositions(cell);
	firstTime = false;
}
