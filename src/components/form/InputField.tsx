import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`form-input ${className || ""}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
