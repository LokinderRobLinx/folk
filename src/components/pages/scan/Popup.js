import React, { useEffect } from "react";

function Popup({ isSuccess, backgroundColor, onClose, cardNumber }) {
  useEffect(() => {
    // Automatically close the popup after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Clear the timer when the component unmounts or when the popup is closed manually
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="popup" style={{ backgroundColor }}>
      {isSuccess ? (
        <div className="popup-content success">
          {/* <i className="fa fa-check-circle" /> */}
          <h3>Success!</h3>
          <h3>Card -- {cardNumber}</h3>
          <h3> Data matched.</h3>
        </div>
      ) : (
        <div className="popup-content error">
          {/* <i className="fa fa-times-circle" /> */}
          <h3>Error!</h3>
          <h3>Card -- {cardNumber}</h3>
          <h3> Data did not match.</h3>
        </div>
      )}
    </div>
  );
}

export default Popup;
