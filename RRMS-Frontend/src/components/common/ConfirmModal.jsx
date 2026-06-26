import React from "react";

function ConfirmModal({
  show,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  onClose,
}) {

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                {title}
              </h5>

              <button
                className="btn-close"
                onClick={onClose}
              ></button>

            </div>

            <div className="modal-body">
              <p>{message}</p>
            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ConfirmModal;