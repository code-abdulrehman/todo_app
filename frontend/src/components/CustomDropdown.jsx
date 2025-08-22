import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CustomDropdown = ({ 
  options = [], 
  placeholder = "", 
  value, 
  onChange, 
  className = "",
  disabled = false,
  label = null,
  id = "",
  name = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };


  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between p-2 rounded-md border border-accent/10 
          bg-secondary/50 text-white placeholder:text-white/50 text-sm
          hover:bg-secondary focus:bg-secondary transition-all duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'border-accent/30 bg-secondary' : ''}
        `}
      >
        <p className={selectedOption ? 'text-white' : 'text-white/50'}>
          {selectedOption ? selectedOption.label : (label || placeholder)}
        </p>
        {isOpen ? (
          <FaChevronUp className="text-accent text-xs" />
        ) : (
          <FaChevronDown className="text-accent text-xs" />
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-secondary border border-accent/10 rounded-md shadow-lg max-h-60 overflow-auto text-sm ">
          {options.length === 0 ? (
            <div className="p-2 text-white/50 text-center text-sm">
              No options available
            </div>
          ) : (
            options.map((option, index) => (
              <button
                key={option.value || index}
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`
                  w-full text-left p-2 hover:bg-accent/20 transition-colors duration-200 text-sm rounded-md
                  ${selectedOption?.value === option.value ? 'bg-accent/30 text-accent' : 'text-white'}
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown; 