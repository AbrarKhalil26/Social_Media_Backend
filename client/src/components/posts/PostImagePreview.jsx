import React from "react";
import { MdDelete } from "react-icons/md";

export default function PostImagePreview({ preview, onRemove }) {
  return (
    <div className="relative my-3">
      <img
        src={preview}
        alt="preview"
        className="max-h-80 rounded-lg object-cover w-full"
      />
      <div
        onClick={onRemove}
        className="absolute top-2 right-2 p-2 bg-gray-400/40 cursor-pointer w-fit rounded-full duration-300 hover:scale-110"
      >
        <MdDelete />
      </div>
    </div>
  );
}
