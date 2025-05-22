"use client";
import React from "react";

type ButtonItem = {
  label: string;
  description: string;
  icon: React.ReactNode;
  bgColorClass: string;
  textColorClass: string;
  iconColorClass:string;
  hoverBgColorClass: string;
  onClick: () => void;
};

type RecordModalProps = {
  title: string;
  description: string;
  buttons: ButtonItem[];
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({
  title,
  description,
  buttons,
  isOpen,
  onClose,
}: RecordModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 sm:px-6">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-start">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{description}</p>

          <div className="flex flex-col gap-4">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                className={`w-full flex text-start items-center gap-3 p-4 rounded-xl ${btn.bgColorClass} ${btn.hoverBgColorClass} transition`}
              >
                <div className={`flex-shrink-0 p-2 rounded-full ${btn.iconColorClass} flex items-center justify-center`}>
                  {btn.icon}
                </div>
                <div>
                  <div className={`${btn.textColorClass} font-semibold`}>{btn.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{btn.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
