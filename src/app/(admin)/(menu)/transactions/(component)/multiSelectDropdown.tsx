'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  options: string[];
  selected: string[];
  setSelected: (value: string[]) => void;
}

const MultiSelectDropdown: React.FC<Props> = ({ options, selected = [], setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleOption = (option: string) => {
    setSelected(
      selected.includes(option)
        ? selected.filter(o => o !== option)
        : [...selected, option]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full border rounded-lg p-2 flex justify-between items-center"
      >
        <span className="truncate">
          {selected.length > 0 ? selected.join(', ') : 'Select tags'}
        </span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-64 overflow-y-auto">
          {/* Search input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border px-2 py-1 rounded-md text-sm"
              autoFocus={hasMounted}  // <-- only autofocus after client mount
            />
          </div>

          {/* Filtered options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <label
                key={option}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>{option}</span>
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                />
              </label>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">No tags found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
