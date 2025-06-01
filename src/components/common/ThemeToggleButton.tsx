import React from "react";
import { useTheme } from "../../context/ThemeContext";
import RadioButtons from "../form/form-elements/RadioButtons";

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    if (value !== theme) {
      toggleTheme();
    }
  };

  return (
    <RadioButtons
      title="Select Theme"
      name="theme"
      options={[{ title: "light" }, { title: "dark" }]}
      value={theme}
      onChange={handleThemeChange}
    />
  );
};
