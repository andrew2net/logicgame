import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CurrentScope(props) {
  return(
    <div>
      <ul className='currentScope'>
        <li>
          <FontAwesomeIcon icon='thumbs-up' /> {props.scope.up}
        </li>
        <li>
          <FontAwesomeIcon icon='thumbs-down' /> {props.scope.down}
        </li>
      </ul>
    </div>
  )
}