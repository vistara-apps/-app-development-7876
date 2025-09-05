import React from 'react'
import { Brain, GraduationCap, Package, TrendingUp, Users, Star, BarChart3, Clock } from 'lucide-react'
import Card from './ui/Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const Dashboard = ({ onNavigate }) => {
  const salesData = [
    { month: 'Jan', sales: 4000, recommendations: 240 },
    { month: 'Feb', sales: 3000, recommendations: 190 },
    { month: 'Mar', sales: 2000, recommendations: 130 },
    { month: 'Apr', sales: 2780, recommendations: 200 },
    { month: 'May', sales: 1890, recommendations: 150 },
    { month: 'Jun', sales: 2390, recommendations: 180 },
  ]

  const inventoryData = [
    { category: 'Electronics', value: 40 },
    { category: 'Clothing', value: 30 },
    { category: 'Home', value: 20 },
    { category: 'Sports', value: 10 },
  ]

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c']

  const features = [
    {
      id: 'recommender',
      title: 'AI Product Recommender',
      description: 'Get personalized product suggestions for customers',
      icon: Brain,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      stats: '2.3x higher conversion'
    },
    {
      id: 'training',
      title: 'Customer Service Trainer',
      description: 'Practice with AI-generated customer scenarios',
      icon: GraduationCap,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      stats: '45% faster resolution'
    },
    {
      id: 'inventory',
      title: 'Inventory Insights',
      description: 'Real-time stock levels and reorder predictions',
      icon: Package,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      stats: '30% reduction in stockouts'
    },
    {
      id: 'coach',
      title: 'Sales Performance Coach',
      description: 'AI-powered analysis and coaching tips',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      stats: '18% sales increase'
    }
  ]

  const quickStats = [
    { label: 'Active Users', value: '127', icon: Users, change: '+12%' },
    { label: 'Avg Rating', value: '4.8', icon: Star, change: '+0.2' },
    { label: 'Sales Today', value: '$24.2k', icon: BarChart3, change: '+8%' },
    { label: 'Training Hours', value: '156h', icon: Clock, change: '+23%' },
  ]

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome to RetailFlow AI
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto lg:mx-0">
          Empowering retail staff with AI for personalized service, efficient training, and smarter inventory management.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">{stat.label}</p>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-success">{stat.change}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon size={24} className="text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Sales & Recommendations</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="recommendations" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Inventory Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className="p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            onClick={() => onNavigate(feature.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 lg:p-4 rounded-xl ${feature.color} text-white flex-shrink-0`}>
                <feature.icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted mb-3 text-sm lg:text-base">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-success">
                    {feature.stats}
                  </span>
                  <span className="text-sm text-primary font-medium hover:underline">
                    Learn more →
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard