import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function Result(props) {
  return (
    <ReactModal isOpen={props.result !== null}
    shouldCloseOnOverlayClick={true}
    overlayClassName='modalOverlay' className='modalContent'>
      <FontAwesomeIcon style={{ fontSize: '20vmin' }}
      icon={props.result ? 'thumbs-up' : 'thumbs-down'} />
    </ReactModal>
  )
}