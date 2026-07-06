import React from "react";

export default function ValidationError({ error, checked }) {
  return <>{checked && <p className="error-message">{error}</p>}</>;
}
