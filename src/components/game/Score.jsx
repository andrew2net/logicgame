import React from 'react';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function Score(props) {
  return(
    <ReactModal isOpen={props.score !== null}
    shouldCloseOnOverlayClick={true}
    overlayClassName='modalOverlay' className='modalContent Score'>
      <div className='Row'>Score {props.score && props.score.up - props.score.down}</div>
      <div className='Row'>
        <ul>
          <li><FontAwesomeIcon icon='thumbs-up' /> {props.score && props.score.up}</li>
          <li><FontAwesomeIcon icon='thumbs-down' /> {props.score && props.score.down}</li>
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
