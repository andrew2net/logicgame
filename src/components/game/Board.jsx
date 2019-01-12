import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import Tile from './Tile';
import TilePlace from './TilePlace';
import TilePreview from './TilePreview';
import Operator from './Operator';
import Result from './Result';
import CurrentScope from './CurrentScope';
import Scope from './Scope';
import './Board.sass';

library.add(faThumbsUp, faThumbsDown);

const numbers = [1, 3, 4, 6];
const operators = [
  ['-', '=', '-'],
  ['-', '>', '-'],
  ['+', '=', '+'],
  ['+', '>', '+']
];

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [0 ,1, 2, 3],
      ops: 0,
      result: null,
      currentScope: { up: 0, down: 0 },
      scope: null //{ up: 2, down: 1 }
    };
  }

  validate = () => {
    const notPlaced = this.state.positions.find(p => p < 4);
    if (notPlaced !== undefined) return;

    const positions = this.state.positions;
    const nums = numbers.map((_n, i) => {
      const idx = positions.indexOf(i + 4);
      return numbers[idx];
    });

    const numOpers = nums.reduce((prev, curr, i) => {
      prev.push(operators[this.state.ops][i - 1] , curr);
      return prev;
    }, []);

    const expr = numOpers.join('').replace('=', '===');
    const result = eval(expr);
    this.setState({ result: result });
    setTimeout(() => {
      let nextOps = this.state.ops;
      let currentScope = Object.assign({}, this.state.currentScope);
      let scope = null;

      if (result) {
        nextOps++;
        currentScope.up++;
      } else currentScope.down++;

      if (nextOps >= operators.length) {
        nextOps = operators.length - 1;
        scope = currentScope;
      }

      this.setState({
        positions: [0, 1, 2, 3],
        ops: nextOps,
        result: null,
        currentScope: currentScope,
        scope: scope
      });
    }, 1000);
  }

  moveTile = (source, position) => {
    const idx = numbers.indexOf(source.tileId);
    const positions = this.state.positions.slice();
    positions[idx] = position;
    this.setState({ positions: positions }, this.validate);
  }

  canDrop = (position, number) => {
    const i = this.state.positions.indexOf(position);
    if (i >= 0) return false;
    switch (position) {
      case 4:
      case 6:
        if (operators[this.state.ops][position - 4] === '-') {
          const nextIdx = this.state.positions.indexOf(position + 1);
          if (nextIdx >= 0 && numbers[nextIdx] > number) return false;
        }
        break;
      case 5:
      case 7:
        if (operators[this.state.ops][position - 5] === '-') {
          const prevIdx = this.state.positions.indexOf(position - 1);
          if (prevIdx >= 0 && numbers[prevIdx] < number) return false;
        }
        break;
    
      default:
        return true;
    }
    return true;
  }

  renderTilePlace = (i, offset = 0) => {
    const index = i + offset;
    const positionIdx = this.state.positions.indexOf(index);
    return (
      <TilePlace key={(index).toString()} position={index} canDrop={this.canDrop} moveTile={this.moveTile}>
        {positionIdx >= 0 ? <Tile number={numbers[positionIdx]} /> : null}
      </TilePlace>);
  }

  renderRow = (operator, offset = 0) => {
    const nums = numbers.map((_n, i) => this.renderTilePlace(i, offset));
    return nums.reduce((prev, curr, i) => {
      if (i === 0) prev.push(curr);
      else prev.push(operator(i), curr);
      return prev;
    }, []);
  }

  renderNumbers = () => this.renderRow(i => <Operator key={i + 3} />)

  renderOperators = () => {
    return this.renderRow(i => <Operator key={i+7} sign={operators[this.state.ops][i - 1]} />, 4)
  }

  render() {
    return(
      <div>
        <div className="Board">
          <div className="Row">
            {this.renderNumbers()}
          </div>
          <div className="Row">
            {this.renderOperators()}
          </div>
          <TilePreview />
          <Result result={this.state.result} />
          <Scope scope={this.state.scope} />
        </div>
        <CurrentScope scope={this.state.currentScope}/>
     </div> 
    );
  }
}

export default Board;