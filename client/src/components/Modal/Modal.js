import React, { useState } from "react";
import ReactDOM from "react-dom";

const overlay_style = {
  backgroundColor: "#333",
  opacity: 0.7,
  width: "100%",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  zIndex: 1001,
};

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={overlay_style}></div>
      <div>{children}</div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
