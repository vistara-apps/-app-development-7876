import React, { useState } from 'react'
import { ArrowLeft, Package, AlertTriangle, TrendingUp, TrendingDown, RefreshCw, Search } from 'lucide-react'
import Card from './ui/Card'
import Button from './ui/Button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const InventoryInsights = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const inventoryData = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      currentStock: 15,
      reorderPoint: 20,
      salesVelocity: 8.5,
      status: 'low',
      predictedStockout: '3 days',
      lastRestock: '2024-01-15'
    },
    {
      id: 2,
      name: 'Cotton T-Shirts',
      category: 'Clothing',
      currentStock: 45,
      reorderPoint: 30,
      salesVelocity: 5.2,
      status: 'good',
      predictedStockout: '9 days',
      lastRestock: '2024-01-10'
    },
    {
      id: 3,
      name: 'Smart Watch',
      category: 'Electronics',
      currentStock: 5,
      reorderPoint: 15,
      salesVelocity: 12.3,
      status: 'critical',
      predictedStockout: 'Tomorrow',
      lastRestock: '2024-01-08'
    },
    {
      id: 4,
      name: 'Running Shoes',
      category: 'Sports',
      currentStock: 28,
      reorderPoint: 25,
      salesVelocity: 3.8,
      status: 'good',
      predictedStockout: '7 days',
      lastRestock: '2024-01-12'
    },
    {
      id: 5,
      name: 'Coffee Maker',
      category: 'Home',
      currentStock: 8,
      reorderPoint: 12,
      salesVelocity: 2.1,
      status: 'low',
      predictedStockout: '4 days',
      lastRestock: '2024-01-14'
    }
  ]

  const salesTrendData = [
    { day: 'Mon', electronics: 45, clothing: 30, sports: 20, home: 15 },
    { day: 'Tue', electronics: 52, clothing: 35, sports: 18, home: 12 },
    { day: 'Wed', electronics: 38, clothing: 42, sports: 25, home: 18 },
    { day: 'Thu', electronics: 60, clothing: 28, sports: 22, home: 20 },
    { day: 'Fri', electronics: 48, clothing: 38, sports: 30, home: 16 },
    { day: 'Sat', electronics: 65, clothing: 45, sports: 35, home: 25 },
    { day: 'Sun', electronics: 42, clothing: 32, sports: 28, home: 14 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'low': return 'text-yellow-600 bg-yellow-100'
      case 'good': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return <AlertTriangle size={16} />
      case 'low': return <TrendingDown size={16} />
      case 'good': return <TrendingUp size={16} />
      default: return <Package size={16} />
    }
  }

  const filteredData = inventoryData.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    totalItems: inventoryData.length,
    lowStock: inventoryData.filter(item => item.status === 'low').length,
    critical: inventoryData.filter(item => item.status === 'critical').length,
    avgVelocity: (inventoryData.reduce((acc, item) => acc + item.salesVelocity, 0) / inventoryData.length).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="text-white border-white/20 hover:bg-white/10">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Inventory Insights</h1>
          <p className="text-white/80">Real-time stock levels and predictive analytics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Total Items</p>
              <p className="text-2xl font-bold">{stats.totalItems}</p>
            </div>
            <Package className="text-primary" size={24} />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <TrendingDown className="text-yellow-600" size={24} />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Critical</p>
              <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Avg Velocity</p>
              <p className="text-2xl font-bold">{stats.avgVelocity}/day</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Stock Levels by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="electronics" fill="#8884d8" />
                <Bar dataKey="clothing" fill="#82ca9d" />
                <Bar dataKey="sports" fill="#ffc658" />
                <Bar dataKey="home" fill="#ff7c7c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Sales Velocity Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="electronics" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="clothing" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-xl font-semibold">Inventory Items</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={16} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="critical">Critical</option>
              <option value="low">Low Stock</option>
              <option value="good">Good</option>
            </select>
            
            <Button variant="outline">
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2">Product</th>
                <th className="text-left py-3 px-2">Category</th>
                <th className="text-center py-3 px-2">Stock</th>
                <th className="text-center py-3 px-2">Velocity</th>
                <th className="text-center py-3 px-2">Status</th>
                <th className="text-center py-3 px-2">Stockout</th>
                <th className="text-right py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-background/50">
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted">Last restock: {item.lastRestock}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-muted">{item.category}</td>
                  <td className="py-3 px-2 text-center">
                    <div>
                      <p className="font-medium">{item.currentStock}</p>
                      <p className="text-xs text-muted">Min: {item.reorderPoint}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="font-medium">{item.salesVelocity}/day</span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="capitalize">{item.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`font-medium ${item.status === 'critical' ? 'text-red-600' : item.status === 'low' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {item.predictedStockout}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Button size="sm" variant="outline">
                      Reorder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default InventoryInsights