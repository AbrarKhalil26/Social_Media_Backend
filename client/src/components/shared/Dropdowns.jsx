import React from "react";

export default function Dropdowns({ labelDropdown, children, open, setOpen }) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full inline-flex items-center justify-center text-white bg-brand box-border border border-neutral-700 hover:bg-brand-strong focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-[12px] px-4 py-1 focus:outline-none"
        type="button"
      >
        {labelDropdown}
      </button>
      <div className="absolute top-[calc(100%+5px)] z-10 border border-neutral-700 rounded-lg">
        <ul
          className={`${open ? "" : "hidden"} bg-neutral-800 text-sm text-body font-medium rounded-lg`}
        >
          {children}
        </ul>
      </div>
    </div>
  );
}
