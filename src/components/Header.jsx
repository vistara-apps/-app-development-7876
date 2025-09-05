import React from 'react'
import { User, Menu, X } from 'lucide-react'

const Header = ({ onNavigate, activeView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'recommender', label: 'AI Recommender' },
    { id: 'training', label: 'Training' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'coach', label: 'Sales Coach' },
  ]

  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-2xl font-bold text-white hover:text-purple-200 transition-colors"
            >
              RetailFlow AI
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-white/80">
              <User size={20} />
              <span className="text-sm">Sales Associate</span>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                    activeView === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header