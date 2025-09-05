import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  className = '',
  label,
  error,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          className={`w-full px-3 py-2 border border-border bg-input text-foreground rounded-md text-left focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${error ? 'border-destructive focus:ring-destructive' : ''} ${className}`}
          onClick={() => setIsOpen(!isOpen)}
          {...props}
        >
          <span className={selectedOption ? 'text-foreground' : 'text-muted'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            size={16} 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-accent/10 focus:bg-accent/10 focus:outline-none transition-colors"
                onClick={() => handleSelect(option)}
              >
                <span className="text-foreground">{option.label}</span>
                {option.description && (
                  <span className="block text-sm text-muted">{option.description}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

export default Select
