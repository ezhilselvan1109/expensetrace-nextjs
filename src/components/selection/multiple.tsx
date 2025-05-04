'use client';

import { useState, useEffect, useRef } from 'react';

const OPTIONS = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Grapes',
  'Mango',
  'Orange',
  'Strawberry',
];

export default function MultiSelectDropdown() {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleOption = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const filteredOptions = OPTIONS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <label className="block text-sm font-medium mb-1">Select Fruits</label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded-md p-2 text-left bg-white"
      >
        {selected.length > 0
          ? selected.join(', ')
          : 'Click to select options...'}
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border-b border-gray-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => toggleOption(item)}
                  className="cursor-pointer px-4 py-2 hover:bg-blue-50 flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    readOnly
                    className="form-checkbox"
                  />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
