'use client';
import React, { useState, useMemo } from 'react';

type ButtonItem = {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
};

type RecordModalProps = {
    title: string;
    description: string;
    buttons: ButtonItem[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmDisabled?: boolean;
    confirmText?: string;
    loading?: boolean;
};

export default function Modal({
    title,
    description,
    buttons,
    selectedId,
    onSelect,
    isOpen,
    onClose,
    onConfirm,
    confirmDisabled,
    confirmText = 'Confirm',
    loading = false,
}: RecordModalProps) {
    const [search, setSearch] = useState('');

    const filteredButtons = useMemo(() => {
        return buttons.filter((btn) =>
            btn.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, buttons]);

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
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

                    <div className="relative w-full mb-4">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1016.65 1a7.5 7.5 0 000 15z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700
                                        text-sm text-gray-900 dark:text-white placeholder-gray-500
                                        border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800
                                        focus:outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
                        {filteredButtons.length === 0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
                        ) : (
                            filteredButtons.map((btn) => {
                                const isSelected = selectedId === btn.id;
                                return (
                                    <button
                                        key={btn.id}
                                        onClick={() => onSelect(btn.id)}
                                        className={`w-full flex items-start text-start gap-4 p-4 rounded-xl transition shadow-sm
                                        ${isSelected
                                                ? 'bg-blue-50 dark:bg-blue-900 border border-blue-600 text-blue-900 dark:text-blue-100'
                                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-400'}`}>
                                        <div
                                            className={`p-2 rounded-full shrink-0 transition
                                        ${isSelected
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                                            {btn.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold mb-1">{btn.label}</div>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>


                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-md bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={confirmDisabled || loading}
                            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
