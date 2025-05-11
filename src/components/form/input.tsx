import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full border px-3 py-2 rounded focus:outline-none ${props.className || ""}`}
    />
  );
}
