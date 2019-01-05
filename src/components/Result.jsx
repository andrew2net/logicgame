import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  openModal = () => { this.setState({ modalIsOpen: true })}
  closeModal = () => { this.setState({ modalIsOpen: false })}

  render() {
    return (
      <ReactModal isOpen={this.props.result.length > 0}
      shouldCloseOnOverlayClick={true}
      overlayClassName='modalOverlay' className='modalContent'>
        <FontAwesomeIcon style={{ fontSize: '20vmin' }} icon={this.props.result} />
      </ReactModal>
    )
  }
}