import { useState, useEffect } from 'react';

interface DropdownProps {
    description: string;
    fetchOptions: () => Promise<string[]>;
    }

const Dropdown = ({
    description,
    fetchOptions,
    }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Fetching options from the backend
  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await fetchOptions();
        setOptions(response);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    getOptions();
  }, [fetchOptions]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-gray-100 text-gray-700 rounded-full p-4 shadow-md focus:outline-none"
      >
        {selectedOption ? selectedOption : description}
        <span className="material-icons">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>
      {isOpen && (
        <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-10 ">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="cursor-pointer p-4 hover:bg-gray-100 border-b-2 border-gray-100 rounded-t-lg"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
