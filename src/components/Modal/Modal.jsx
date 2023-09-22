import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { useEffect, useCallback } from 'react';

const modalWindow = document.querySelector('#root-modal');

export const Modal = ({ largeImageURL, tags, handleCloseModal, showModal }) => {
  const handleEsc = useCallback(
    e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    if (showModal) {
      document.addEventListener('keydown', handleEsc);
      disablePageScroll();
    }
    if (!showModal) {
      document.removeEventListener('keydown', handleEsc);
      enablePageScroll();
    }
  }, [showModal, handleEsc]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={largeImageURL} alt={tags} />
      </ModalStyled>
    </Overlay>,
    modalWindow
  );
};

// export default class Modal extends Component {
//   componentDidMount() {
// document.addEventListener('keydown', this.handleEsc);
// disablePageScroll();
//   }
//   componentWillUnmount() {
// document.removeEventListener('keydown', this.handleEsc);
// enablePageScroll();
//   }
// handleEsc = e => {
//   if (e.code === 'Escape') {
//     this.props.handleCloseModal();
//   }
// };

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.handleCloseModal();
//     }
//   };
//   render() {
//     const { largeImageURL, tags } = this.props;
// return createPortal(
//   <Overlay onClick={this.handleBackdropClick}>
//     <ModalStyled>
//       <img src={largeImageURL} alt={tags} />
//     </ModalStyled>
//   </Overlay>,
//   modalWindow
// );
//   }
// }
