import React from 'react'

const AppShell = ({ 
  children, 
  variant = 'default',
  className = '',
  header,
  sidebar,
  footer
}) => {
  const variants = {
    default: {
      container: 'min-h-screen bg-background',
      main: 'flex-1',
      content: 'container mx-auto px-4 sm:px-6 lg:px-8'
    },
    glass: {
      container: 'min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800',
      main: 'flex-1 backdrop-blur-sm bg-white/5',
      content: 'container mx-auto px-4 sm:px-6 lg:px-8'
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className={`${currentVariant.container} ${className}`}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-50 border-b border-border/10 backdrop-blur-sm bg-surface/80">
          {header}
        </header>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        {sidebar && (
          <aside className="w-64 border-r border-border/10 bg-surface/50 backdrop-blur-sm">
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <main className={currentVariant.main}>
          <div className={currentVariant.content}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t border-border/10 bg-surface/50 backdrop-blur-sm">
          {footer}
        </footer>
      )}
    </div>
  )
}

export default AppShell
