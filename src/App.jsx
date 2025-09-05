import React, { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ProductRecommender from './components/ProductRecommender'
import TrainingModule from './components/TrainingModule'
import InventoryInsights from './components/InventoryInsights'
import SalesCoach from './components/SalesCoach'

function App() {
  const [activeView, setActiveView] = useState('dashboard')

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveView} />
      case 'recommender':
        return <ProductRecommender onBack={() => setActiveView('dashboard')} />
      case 'training':
        return <TrainingModule onBack={() => setActiveView('dashboard')} />
      case 'inventory':
        return <InventoryInsights onBack={() => setActiveView('dashboard')} />
      case 'coach':
        return <SalesCoach onBack={() => setActiveView('dashboard')} />
      default:
        return <Dashboard onNavigate={setActiveView} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <Header onNavigate={setActiveView} activeView={activeView} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {renderActiveView()}
      </main>
    </div>
  )
}

export default App