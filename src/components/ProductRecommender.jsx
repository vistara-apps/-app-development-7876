import React, { useState } from 'react'
import { ArrowLeft, Brain, User, ShoppingCart, Star, TrendingUp } from 'lucide-react'
import Card from './ui/Card'
import Button from './ui/Button'

const ProductRecommender = ({ onBack }) => {
  const [customerProfile, setCustomerProfile] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const sampleProducts = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: '$129.99',
      rating: 4.5,
      confidence: 95,
      reason: 'Based on customer\'s interest in audio equipment and previous purchases',
      image: '🎧'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: '$199.99',
      rating: 4.8,
      confidence: 88,
      reason: 'Complements their active lifestyle and health interests',
      image: '⌚'
    },
    {
      id: 3,
      name: 'Portable Phone Charger',
      price: '$39.99',
      rating: 4.3,
      confidence: 75,
      reason: 'Essential accessory for mobile device users',
      image: '🔋'
    }
  ]

  const generateRecommendations = () => {
    setIsLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      setRecommendations(sampleProducts)
      setIsLoading(false)
    }, 2000)
  }

  const customerProfiles = [
    "Tech enthusiast looking for the latest gadgets",
    "Fitness-focused customer interested in health tracking",
    "Busy professional needing productivity accessories",
    "Style-conscious shopper seeking trendy items"
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="text-white border-white/20 hover:bg-white/10">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">AI Product Recommender</h1>
          <p className="text-white/80">Generate personalized product suggestions for customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Input */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold">Customer Profile</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-2">
                  Describe the customer
                </label>
                <textarea
                  value={customerProfile}
                  onChange={(e) => setCustomerProfile(e.target.value)}
                  placeholder="e.g., Young professional interested in fitness and technology..."
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">
                  Quick profiles
                </label>
                <div className="space-y-2">
                  {customerProfiles.map((profile, index) => (
                    <button
                      key={index}
                      onClick={() => setCustomerProfile(profile)}
                      className="w-full p-2 text-left text-sm border border-border rounded-lg hover:bg-background transition-colors"
                    >
                      {profile}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateRecommendations}
                disabled={!customerProfile.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Brain size={16} />
                    <span>Generate Recommendations</span>
                  </div>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="text-green-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold">Recommended Products</h2>
            </div>

            {recommendations.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="mx-auto text-muted mb-4" size={48} />
                <h3 className="text-lg font-medium text-foreground mb-2">No recommendations yet</h3>
                <p className="text-muted">Enter a customer profile to get AI-powered product suggestions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((product) => (
                  <div key={product.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{product.image}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">{product.price}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="text-yellow-400 fill-current" size={16} />
                              <span className="text-sm text-muted">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted mb-3">{product.reason}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="text-green-500" size={16} />
                            <span className="text-sm font-medium text-green-600">
                              {product.confidence}% confidence
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductRecommender