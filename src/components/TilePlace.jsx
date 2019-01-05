import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

const tilePlaceTarget = {
  drop(props, monitor) {
    props.moveTile(monitor.getItem(), props.position);
  },

  canDrop(props, monitor) {
    return props.canDrop(props.position, monitor.getItem().tileId);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver() && monitor.canDrop()
  }
}

function TilePlace({connectDropTarget, isOver, children}) {
  return connectDropTarget(
    <div className="TilePlace"
    style={{backgroundColor: isOver ? 'yellow' : null}}>{children}</div>
  );
}

export default DropTarget(ItemTypes.NUMBER, tilePlaceTarget, collect)(TilePlace);