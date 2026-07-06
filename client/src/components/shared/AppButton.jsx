import { Button, Spinner } from "flowbite-react";
import React from "react";

export default function AppButton({ children, isLoading, ...props }) {
  return (
    <Button {...props}>
      {isLoading && (
        <Spinner className="me-3" aria-label="Spinner button example" size="sm" light />
      )}
      {children}
    </Button>
  );
}
