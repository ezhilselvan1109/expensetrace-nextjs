"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Radio from "../input/Radio";

interface Option {
  title: string;
}

interface RadioButtonsProps {
  title: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioButtons({
  title,
  name,
  options,
  value,
  onChange,
}: RadioButtonsProps) {
  return (
    <ComponentCard title={title}>
      <div className="flex flex-wrap items-center gap-8">
        {options.map((option, index) => (
          <Radio
            key={index}
            id={`${name}-${index}`}
            name={name}
            value={option.title}
            checked={value === option.title}
            onChange={() => onChange(option.title)}
            label={option.title}
          />
        ))}
      </div>
    </ComponentCard>
  );
}
