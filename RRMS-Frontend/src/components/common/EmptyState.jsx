import React from "react";
import { FaInbox } from "react-icons/fa";

function EmptyState({
  title = "No Data Found",
  description = "Nothing to display right now.",
}) {
  return (
    <div className="text-center py-5">

      <FaInbox
        size={60}
        className="text-secondary mb-3"
      />

      <h5>{title}</h5>

      <p className="text-muted">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;