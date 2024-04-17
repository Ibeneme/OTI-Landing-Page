import React from "react";
import "./Modal.css";
import { MdCancel } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  formContent: React.ReactNode;
  borderColor?: string;
  ifClose?: boolean; // New prop for border color
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  formContent,
  ifClose,
  borderColor, // Added borderColor prop
}) => {
  const modalClassName = isOpen ? "modal-open" : "modal";

  return (
    <div className={modalClassName}>
      <div
        className="modal-content"
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        {ifClose ? (
          <div
            style={{
              backgroundColor: "white",
              padding: 0.5,
              borderRadius: 244,
              width: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={onClose}
          >
            <MdCancel
              onClick={onClose}
              size={28}
              color={"#FF7342"}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : null}
        <div
          className="white-modal-content"
          style={{
            position: "relative",
            border: borderColor
              ? `2.3px solid ${borderColor}`
              : `2.3px solid var(--darkOrange)`,
          }}
        >
          <span
            style={{
              display: "none",
              //position: "absolute",
            }}
            className="close"
            onClick={onOpen}
          >
            &times;
          </span>
          <div>{formContent}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
