import React from 'react';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function Scope(props) {
  return(
    <ReactModal isOpen={props.scope !== null}
    shouldCloseOnOverlayClick={true}
    overlayClassName='modalOverlay' className='modalContent Scope'>
      <div className='Row'>Score {props.scope && props.scope.up - props.scope.down}</div>
      <div className='Row'>
        <ul>
          <li><FontAwesomeIcon icon='thumbs-up' /> {props.scope && props.scope.up}</li>
          <li><FontAwesomeIcon icon='thumbs-down' /> {props.scope && props.scope.down}</li>
        </ul>
      </div>
      <div className='Row'>
        <Route render={({ history }) => (
          <button type='button' onClick={() => { history.push('/logicgame')}}>Close</button>
        )} />
      </div>
    </ReactModal>
  );
}
