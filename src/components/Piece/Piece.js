import constants from '../../constants.js';


class Piece {

	constructor () {
		this.piece = constants.Pieces[Math.floor(Math.random()*constants.Pieces.length)];
		this.current = 0;
		this.numberOfRotations = this.piece.pieces.length;
	}

	getSquares() {
		return this.piece.pieces[(this.current % this.numberOfRotations)].squares;
	}

	getColor() {
		return this.piece.aColor;
	}

	getSize() {
		return this.piece.pieces[(this.current % this.numberOfRotations)].size;
	}
	getHeight() {
		return this.piece.pieces[(this.current % this.numberOfRotations)].height;
	}

	rotateRight() {
		this.current++;
		return this;
	}

	rotateLeft() {
		this.current--;
		if (this.current < 0) this.current = this.numberOfRotations-1;
		return this;
	}
}
export default Piece;