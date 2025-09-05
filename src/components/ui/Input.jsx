import React from 'react'

const Input = ({ 
  className = '', 
  variant = 'default',
  icon: Icon,
  error,
  label,
  ...props 
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
  
  const variants = {
    default: 'border-border bg-input text-foreground placeholder:text-muted',
    withIcon: 'pl-10 border-border bg-input text-foreground placeholder:text-muted'
  }

  const errorClasses = error ? 'border-destructive focus:ring-destructive' : ''
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon size={16} className="text-muted" />
          </div>
        )}
        <input
          className={`${baseClasses} ${variants[variant]} ${errorClasses} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

export default Input
