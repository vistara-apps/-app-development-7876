import React, { useState } from 'react'

const Tabs = ({ 
  tabs = [], 
  defaultTab = 0, 
  className = '',
  variant = 'default',
  onChange
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (index) => {
    setActiveTab(index)
    if (onChange) {
      onChange(index, tabs[index])
    }
  }

  const variants = {
    default: {
      container: 'border-b border-border',
      tab: 'px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:text-primary hover:border-primary/50',
      activeTab: 'text-primary border-primary',
      inactiveTab: 'text-muted'
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className={className}>
      <div className={currentVariant.container}>
        <nav className="flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${currentVariant.tab} ${
                activeTab === index 
                  ? currentVariant.activeTab 
                  : currentVariant.inactiveTab
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab.icon && (
                <tab.icon size={16} className="inline mr-2" />
              )}
              {tab.label}
              {tab.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}

export default Tabs
