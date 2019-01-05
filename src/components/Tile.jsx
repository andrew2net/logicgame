import React from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const tileSource = {
  beginDrag(props) {
    return { tileId: props.number };
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function Tile({ connectDragSource, isDragging, number }) {
  return connectDragSource(
    <div style={{
      opacity: isDragging ? 0.5 : 1
    }}
    className="Tile">{number}</div>
  );
}

export default DragSource(ItemTypes.NUMBER, tileSource, collect)(Tile);