import React, { useState } from 'react'
import { ArrowLeft, GraduationCap, MessageCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import Card from './ui/Card'
import Button from './ui/Button'

const TrainingModule = ({ onBack }) => {
  const [currentScenario, setCurrentScenario] = useState(null)
  const [conversation, setConversation] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(null)

  const scenarios = [
    {
      id: 1,
      title: 'Handling Product Returns',
      difficulty: 'Beginner',
      description: 'Learn to handle customer returns professionally and efficiently',
      initialMessage: "Hi, I bought this shirt last week but it doesn't fit properly. I'd like to return it, but I don't have the receipt with me. Can you help?",
      customerType: 'Frustrated but polite'
    },
    {
      id: 2,
      title: 'Upselling Techniques',
      difficulty: 'Intermediate',
      description: 'Practice suggesting additional products to increase sales',
      initialMessage: "I'm looking for a new phone case for my iPhone. Do you have anything simple and affordable?",
      customerType: 'Budget-conscious but open to suggestions'
    },
    {
      id: 3,
      title: 'Handling Complaints',
      difficulty: 'Advanced',
      description: 'Manage difficult customer complaints with professionalism',
      initialMessage: "This is the third time I'm here about this defective product! Your store keeps selling broken items and I'm fed up with this terrible service!",
      customerType: 'Very angry and demanding'
    }
  ]

  const startScenario = (scenario) => {
    setCurrentScenario(scenario)
    setConversation([
      {
        role: 'customer',
        message: scenario.initialMessage,
        timestamp: new Date()
      }
    ])
    setIsCompleted(false)
    setScore(null)
  }

  const sendMessage = () => {
    if (!userInput.trim()) return

    const newMessage = {
      role: 'associate',
      message: userInput,
      timestamp: new Date()
    }

    setConversation(prev => [...prev, newMessage])
    setUserInput('')

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Thank you for that response. Let me ask you another question...",
        "I appreciate your help, but I'm still not satisfied with this solution.",
        "That sounds reasonable. Could you tell me more about the warranty options?",
        "Okay, that helps. What would you recommend for someone in my situation?"
      ]
      
      const aiResponse = {
        role: 'customer',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }
      
      setConversation(prev => [...prev, aiResponse])
    }, 1500)
  }

  const completeScenario = () => {
    setIsCompleted(true)
    setScore(Math.floor(Math.random() * 30) + 70) // Random score between 70-100
  }

  const resetScenario = () => {
    setCurrentScenario(null)
    setConversation([])
    setUserInput('')
    setIsCompleted(false)
    setScore(null)
  }

  if (!currentScenario) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} className="text-white border-white/20 hover:bg-white/10">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Customer Service Training</h1>
            <p className="text-white/80">Practice with AI-generated customer scenarios</p>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{scenario.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    scenario.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                    scenario.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>
              </div>
              
              <p className="text-muted mb-4 text-sm">{scenario.description}</p>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-1">Customer Type:</p>
                <p className="text-sm text-muted">{scenario.customerType}</p>
              </div>

              <Button 
                onClick={() => startScenario(scenario)}
                className="w-full"
              >
                Start Training
              </Button>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={resetScenario} className="text-white border-white/20 hover:bg-white/10">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{currentScenario.title}</h1>
            <p className="text-white/80">{currentScenario.difficulty} Level</p>
          </div>
        </div>
        {!isCompleted && (
          <Button variant="outline" onClick={completeScenario} className="text-white border-white/20 hover:bg-white/10">
            Complete Scenario
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-96">
            <div className="flex flex-col h-full">
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {conversation.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'associate' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      msg.role === 'associate' 
                        ? 'bg-primary text-white' 
                        : 'bg-background border border-border'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.role === 'associate' ? 'text-white/70' : 'text-muted'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              {!isCompleted && (
                <div className="border-t border-border p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your response..."
                      className="flex-1 p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button onClick={sendMessage} disabled={!userInput.trim()}>
                      <MessageCircle size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Scenario Info */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-3">Scenario Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Customer Type:</span>
                <p className="text-muted">{currentScenario.customerType}</p>
              </div>
              <div>
                <span className="font-medium">Objective:</span>
                <p className="text-muted">{currentScenario.description}</p>
              </div>
            </div>
          </Card>

          {/* Score Card */}
          {isCompleted && (
            <Card className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  {score >= 80 ? (
                    <CheckCircle className="text-green-500" size={32} />
                  ) : score >= 60 ? (
                    <MessageCircle className="text-yellow-500" size={32} />
                  ) : (
                    <XCircle className="text-red-500" size={32} />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{score}%</h3>
                <p className="text-muted text-sm mb-4">Training Score</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Professionalism:</span>
                    <span className="font-medium">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Problem Solving:</span>
                    <span className="font-medium">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Empathy:</span>
                    <span className="font-medium">Very Good</span>
                  </div>
                </div>

                <Button 
                  onClick={resetScenario}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Try Another
                </Button>
              </div>
            </Card>
          )}

          {/* Tips */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-3">Tips</h3>
            <ul className="text-sm text-muted space-y-2">
              <li>• Listen actively to customer concerns</li>
              <li>• Show empathy and understanding</li>
              <li>• Offer clear solutions</li>
              <li>• Ask clarifying questions when needed</li>
              <li>• Maintain a professional tone</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TrainingModule