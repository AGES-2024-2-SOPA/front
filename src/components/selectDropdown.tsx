/**
 * Dropdown component for selecting options.
 *
 * @component
 * @example
 * ```tsx
 * <Dropdown
 *   description="Select an option"
 *   fetchOptions={fetchOptions}
 *   enableSearch={true}
 *   onOptionSelect={handleOptionSelect}
 * />
 * ```
 *
 * @param {string} description - The description of the dropdown.
 * @param {() => Promise<string[]>} fetchOptions - A function that fetches the options from the backend.
 * @param {boolean} [enableSearch=true] - Whether to enable a search field when there are to many options to show.
 * @param {(option: string) => void} [onOptionSelect] - A callback function to be called when an option is selected.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
import React, { useState, useEffect, useRef } from 'react';

interface DropdownProps {
  description: string;
  fetchOptions: () => Promise<string[]>;
  enableSearch?: boolean;
  onOptionSelect?: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ description, fetchOptions, enableSearch = true, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // This function fetches the options from the backend
  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await fetchOptions();
        setOptions(response);
        setFilteredOptions(response);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    getOptions();
  }, [fetchOptions]);

  // Handle filtering options based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // This function closes the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // This function handles the selection of an option
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    // If there is a callback function, call it
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-sm mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-gray-100 text-gray-500 rounded-full p-4 shadow-md focus:outline-none "
      >
        {selectedOption ? selectedOption : description}
        <span className="material-icons">
          {isOpen ? 'A' : 'V'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-10">
          {/* Search options (opcional) */}
          {enableSearch && (
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full p-4 border-b border-gray-200 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}

          {/* Dropdown options */}
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className="cursor-pointer p-4 hover:bg-gray-100"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">Nenhuma opção encontrada</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
