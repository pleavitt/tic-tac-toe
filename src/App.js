import React, { Component } from 'react';
import Toggle from 'react-toggle';
import FlipMove from 'react-flip-move';

import 'react-toggle/style.css';
import './App.css';
import './components/Board.css';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          thisMove: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      reverse: false,
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return this.null;
  }

  handleClick(i) {
    const { history: propsHistory, stepNumber, xIsNext } = this.state;
    const history = propsHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          thisMove: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const { history: propsHistory, stepNumber, xIsNext, reverse } = this.state;

    const history = propsHistory;
    const current = history[stepNumber];
    const winner = this.calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const location = `(${step.thisMove % 3},${Math.floor(step.thisMove / 3)})`;
      const desc = move ? `Go to move #${move} ${location}` : 'Go to game start';
      return (
        <li key={move}>
          <button type="button" className="button -blue center" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    moves = reverse ? moves.reverse() : moves;

    let status;
    if (winner) {
      status = `Winner: ${current.squares[winner[0]]}`;
    } else if (stepNumber === 9) {
      status = 'Draw';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            currentMove={current.thisMove}
            winner={winner || []}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>

          <div className="toggle-line">
            <span>Reverse </span>
            <Toggle
              className="reverse-toggle"
              onChange={() => this.setState({ reverse: !reverse })}
            />
          </div>
          <FlipMove typeName="ul">{moves}</FlipMove>
        </div>
      </div>
    );
  }
}

export default App;
