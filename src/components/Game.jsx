import React from 'react';
import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Board from './Board';

function Game() {
  return(
    <Board />
  );
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Game);