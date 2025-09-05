import React, { useState } from 'react'
import { ArrowLeft, TrendingUp, Award, Target, Calendar, BarChart3, Users, Star } from 'lucide-react'
import Card from './ui/Card'
import Button from './ui/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const SalesCoach = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedAssociate, setSelectedAssociate] = useState('you')

  const performanceData = [
    { period: 'Mon', sales: 4000, target: 5000, interactions: 25 },
    { period: 'Tue', sales: 3000, target: 5000, interactions: 20 },
    { period: 'Wed', sales: 5200, target: 5000, interactions: 30 },
    { period: 'Thu', sales: 2780, target: 5000, interactions: 18 },
    { period: 'Fri', sales: 1890, target: 5000, interactions: 15 },
    { period: 'Sat', sales: 6390, target: 5000, interactions: 35 },
    { period: 'Sun', sales: 4490, target: 5000, interactions: 28 }
  ]

  const skillsData = [
    { skill: 'Product Knowledge', score: 85, fullMark: 100 },
    { skill: 'Customer Service', score: 92, fullMark: 100 },
    { skill: 'Upselling', score: 78, fullMark: 100 },
    { skill: 'Problem Solving', score: 88, fullMark: 100 },
    { skill: 'Communication', score: 95, fullMark: 100 },
    { skill: 'Time Management', score: 82, fullMark: 100 }
  ]

  const insights = [
    {
      type: 'strength',
      title: 'Excellent Customer Communication',
      description: 'Your customer satisfaction scores are 15% above team average',
      action: 'Continue using your active listening skills',
      icon: Star
    },
    {
      type: 'improvement',
      title: 'Upselling Opportunity',
      description: 'Only 23% of your sales include additional items vs 35% team average',
      action: 'Focus on suggesting complementary products',
      icon: TrendingUp
    },
    {
      type: 'goal',
      title: 'Weekly Target Progress',
      description: 'You\'re 85% towards your weekly goal with 2 days remaining',
      action: 'Increase customer interactions by 20% daily',
      icon: Target
    }
  ]

  const achievements = [
    { title: 'Customer Champion', description: 'Highest satisfaction score this month', date: '2024-01-15', icon: '🏆' },
    { title: 'Sales Streak', description: '7 consecutive days meeting targets', date: '2024-01-12', icon: '🔥' },
    { title: 'Team Player', description: 'Helped 5 colleagues with customer queries', date: '2024-01-10', icon: '🤝' }
  ]

  const currentStats = {
    todaySales: '$2,340',
    weeklyProgress: 85,
    customerRating: 4.8,
    rank: 3
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="text-white border-white/20 hover:bg-white/10">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Sales Performance Coach</h1>
          <p className="text-white/80">AI-powered analysis and personalized coaching</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Today's Sales</p>
              <p className="text-2xl font-bold text-primary">{currentStats.todaySales}</p>
            </div>
            <BarChart3 className="text-primary" size={24} />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Weekly Progress</p>
              <p className="text-2xl font-bold text-green-600">{currentStats.weeklyProgress}%</p>
            </div>
            <Target className="text-green-600" size={24} />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Customer Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{currentStats.customerRating}</p>
            </div>
            <Star className="text-yellow-600" size={24} />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Team Rank</p>
              <p className="text-2xl font-bold text-purple-600">#{currentStats.rank}</p>
            </div>
            <Users className="text-purple-600" size={24} />
          </div>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Sales Performance</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border border-border rounded-lg text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} name="Actual Sales" />
                <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Skills Assessment</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="mr-2 text-primary" size={24} />
          AI Coaching Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              insight.type === 'strength' ? 'border-green-500 bg-green-50' :
              insight.type === 'improvement' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center mb-2">
                <insight.icon className={`mr-2 ${
                  insight.type === 'strength' ? 'text-green-600' :
                  insight.type === 'improvement' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} size={20} />
                <h4 className="font-semibold text-foreground">{insight.title}</h4>
              </div>
              <p className="text-sm text-muted mb-3">{insight.description}</p>
              <p className="text-sm font-medium text-primary">{insight.action}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="mr-2 text-primary" size={24} />
          Recent Achievements
        </h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-background rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                <p className="text-sm text-muted">{achievement.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Items */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recommended Actions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="font-medium">Complete Product Knowledge Training</span>
            </div>
            <Button size="sm">Start Now</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium">Practice Upselling Scenarios</span>
            </div>
            <Button size="sm" variant="outline">Schedule</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">Review Customer Feedback</span>
            </div>
            <Button size="sm" variant="outline">View</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SalesCoach