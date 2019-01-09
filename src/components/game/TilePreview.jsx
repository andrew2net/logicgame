import React from 'react';
import { ItemTypes } from './Constants';
import { DragLayer } from 'react-dnd';
import Tile from './Tile';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px) rotate(-5deg)`;
  return {
    transform: transform,
    WebkitTransform: transform,
    transformOrigin: '7vmin 7vmin'
  };
}

function TilePreview(props) {
  if (!props.isDragging) {
    return null;
  }

  function renderItem(type, item) {
    if (type === ItemTypes.NUMBER) {
      return (
        <Tile number={item.tileId} />
      );
    }
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)} className='TilePreview'>
        {renderItem(props.itemType, props.item)}
      </div>
    </div>
  );
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(TilePreview);