"use client";

import { useState, Children, isValidElement, cloneElement, ReactElement } from "react";

// Select Component
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (value: string) => {
    onChange(value); // Call the onChange prop with the selected value
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative">
      <div
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select an option"} {/* Display the selected value or placeholder */}
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-10">
          {Children.map(children, (child) => {
            if (isValidElement<SelectItemProps>(child)) {
              return cloneElement(child as ReactElement<SelectItemProps>, {
                onClick: () => handleItemClick(child.props.value), // Pass the value to handleItemClick
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

// SelectTrigger Component
export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// SelectContent Component
export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="py-1">{children}</div>;
}

// SelectItem Component
interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void; // Make onClick optional
}

export function SelectItem({ value, children, onClick }: SelectItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation
    if (onClick) onClick(); // Call the onClick handler
  };

  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={handleClick} // Use the updated click handler
      data-value={value} // Use the value prop as a data attribute to avoid ESLint warning
    >
      {children}
    </div>
  );
}

// SelectValue Component
export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <>{placeholder}</>;
}