/**
 * Dropdown component that provides a customizable dropdown menu with optional search functionality.
 * 
 * @component
 * @param {DropdownProps} props - The properties for the Dropdown component.
 * @param {string} props.description - The description to display when no option is selected.
 * @param {string[]} props.options - The list of options to display in the dropdown.
 * @param {boolean} [props.enableSearch=true] - Whether to enable the search functionality within the dropdown.
 * @param {(option: string) => void} [props.onOptionSelect] - Callback function to handle option selection.
 * @param {boolean} [props.disabled=false] - Whether the dropdown is disabled.
 * @param {string} [props.tooltipMessage=''] - The message to display in the tooltip when the dropdown is disabled.
 * 
 * @returns {JSX.Element} The rendered Dropdown component.
 * 
 * @example
 * <Dropdown
 *   description="Select an option"
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   enableSearch={true}
 *   onOptionSelect={(option) => console.log(option)}
 *   disabled={false}
 *   tooltipMessage="This dropdown is disabled"
 * />
 */
import React, { useState, useEffect, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
interface DropdownProps {
  description: string;
  options: string[];
  enableSearch?: boolean;
  onOptionSelect?: (option: string) => void;
  disabled?: boolean;  // Atributo para desabilitar o dropdown
  tooltipMessage?: string;  // Atributo para exibir uma explicação
}

const Dropdown: React.FC<DropdownProps> = ({ description, options, enableSearch = true, onOptionSelect, disabled = false, tooltipMessage = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Função para alternar a abertura do dropdown, verificando se está desabilitado
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    } else {
      setShowTooltip(true);
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      className="relative w-full max-w-sm mx-auto"
      onMouseEnter={() => disabled && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      >
      <button
        onClick={toggleDropdown}
        className={`w-full flex justify-between items-center rounded-full ${
          disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100'
        } text-gray-700 p-4 shadow-md focus:outline-none`}
      >
        {selectedOption ? selectedOption : description}
        <div>

          {isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/> }
        </div>
      </button>

      {/* Tooltip (explicação) */}
      {showTooltip && disabled && (
        <div className="top-full left-0 mt-1 bg-gray-200 text-gray-700 p-2 rounded shadow-lg text-center">
          {tooltipMessage || 'Dropdown desabilitado'}
        </div>
      )}

      {isOpen && !disabled && (
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
