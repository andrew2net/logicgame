import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CurrentScore(props) {
  return(
    <div>
      <ul className='currentScore'>
        <li>
          <FontAwesomeIcon icon='thumbs-up' /> {props.score.up}
        </li>
        <li>
          <FontAwesomeIcon icon='thumbs-down' /> {props.score.down}
        </li>
      </ul>
    </div>
  )
}
