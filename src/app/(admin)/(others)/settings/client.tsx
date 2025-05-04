"use client";

import RadioButtons from "@/components/form/form-elements/RadioButtons";
import React, { useState } from "react";

export default function SettingsPage() {
    const themeOptions = [
        { title: "Light" },
        { title: "Dark" },
        { title: "Device Theme" }
    ];

    const timeFormatOptions = [
        { title: "12-Hour Format" },
        { title: "24-Hour Format" }
    ];

    const decimalFormatOptions = [
        { title: "Default (Optimized for readability)" },
        { title: "No Decimal Places (Example: 100)" },
        { title: "1 Decimal Place (Example: 100.0)" },
        { title: "2 Decimal Places (Example: 100.00)" }
    ];

    const [theme, setTheme] = useState<string>(themeOptions[0].title); // default to "Light"
    const [timeFormat, setTimeFormat] = useState<string>(timeFormatOptions[0].title); // default to "12-Hour Format"
    const [decimalFormat, setDecimalFormat] = useState<string>(decimalFormatOptions[0].title); // default to "Default (Optimized for readability)"

    const handleThemeChange = (value: string) => {
        setTheme(value);
    };

    const handleTimeFormat = (value: string) => {
        setTimeFormat(value);
    };

    const handleDecimalFormat = (value: string) => {
        setDecimalFormat(value);
    };

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols">

            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">
                    Appearance
                </h2>
                <RadioButtons
                    title="Theme"
                    name="theme"
                    options={themeOptions}
                    value={theme}
                    onChange={handleThemeChange}
                />

                <RadioButtons
                    title="Time Format"
                    name="timeFormat"
                    options={timeFormatOptions}
                    value={timeFormat}
                    onChange={handleTimeFormat}
                />

                <RadioButtons
                    title="Decimal Format"
                    name="decimalFormat"
                    options={decimalFormatOptions}
                    value={decimalFormat}
                    onChange={handleDecimalFormat}
                />
            </div>
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">
                    Preferences
                </h2>
                <RadioButtons
                    title="Theme"
                    name="theme"
                    options={themeOptions}
                    value={theme}
                    onChange={handleThemeChange}
                />
            </div>
        </div>
    );
}
