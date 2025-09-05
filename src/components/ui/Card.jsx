import React from 'react'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-card border border-white/20 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card