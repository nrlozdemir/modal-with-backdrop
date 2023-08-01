import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return props.show ? (
    <div className="backdrop" onClick={props.onClick}></div>
  ) : null;
};

const ModalPortal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop show={props.show} onClick={props.onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        props.children,
        document.getElementById("overlay-root")
      )}
    </div>
  );
};

const Modal = (props) => {
  return (
    <div className="modal">
      <button className="button" onClick={props.onClick}>
        Close Modal
      </button>
    </div>
  );
};

const SampleComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <button className="button" onClick={() => setShowModal(true)}>
        Show Modal
      </button>
      <ModalPortal show={showModal} onClick={onClickHandler}>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={showModal}
          timeout={{ enter: 600, exit: 300 }}
          classNames="modal"
        >
          <Modal onClick={onClickHandler} />
        </CSSTransition>
      </ModalPortal>
    </div>
  );
};

export default SampleComponent;
