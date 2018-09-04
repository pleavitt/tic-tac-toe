import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Board.css';
import '../App.css';

function Square(props) {
  const { winner, isCurrentMove, value, onClick } = props;
  const winnerClass = winner ? 'winner -green' : '-regular';
  const currentMove = isCurrentMove ? 'currentMove' : '';
  return (
    <button
      type="button"
      className={`${currentMove} ${winnerClass} square button center`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    const { currentMove, squares, winner, onClick } = this.props;
    const isCurrentMove = currentMove === i;
    const isWinner = winner.indexOf(i) !== -1;
    return (
      <Square
        winner={isWinner}
        isCurrentMove={isCurrentMove}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Square.propTypes = {
  winner: PropTypes.bool.isRequired,
  isCurrentMove: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Board.propTypes = {
  winner: PropTypes.bool.isRequired,
  currentMove: PropTypes.number.isRequired,
  squares: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Board;
