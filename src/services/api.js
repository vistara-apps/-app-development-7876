// API Services for RetailFlow AI
// Abstracted API layer for LLM and Analytics services

class APIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    this.llmProvider = import.meta.env.VITE_LLM_PROVIDER || 'mock';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

class LLMService extends APIService {
  async generateProductRecommendations(customerProfile, productCatalog, context = {}) {
    // For demo purposes, return mock data if no real API is configured
    if (this.llmProvider === 'mock') {
      return this.mockProductRecommendations(customerProfile, productCatalog);
    }

    try {
      return await this.request('/llm/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          customerProfile,
          productCatalog,
          context,
          model: 'gpt-4',
          temperature: 0.7,
        }),
      });
    } catch (error) {
      console.warn('LLM API unavailable, falling back to mock data');
      return this.mockProductRecommendations(customerProfile, productCatalog);
    }
  }

  async generateTrainingScenario(moduleType, difficulty = 'intermediate') {
    if (this.llmProvider === 'mock') {
      return this.mockTrainingScenario(moduleType, difficulty);
    }

    try {
      return await this.request('/llm/training-scenario', {
        method: 'POST',
        body: JSON.stringify({
          moduleType,
          difficulty,
          model: 'gpt-4',
          temperature: 0.8,
        }),
      });
    } catch (error) {
      console.warn('LLM API unavailable, falling back to mock data');
      return this.mockTrainingScenario(moduleType, difficulty);
    }
  }

  async evaluateTrainingResponse(scenario, userResponse, expectedOutcome) {
    if (this.llmProvider === 'mock') {
      return this.mockTrainingEvaluation(userResponse);
    }

    try {
      return await this.request('/llm/evaluate-response', {
        method: 'POST',
        body: JSON.stringify({
          scenario,
          userResponse,
          expectedOutcome,
          model: 'gpt-4',
          temperature: 0.3,
        }),
      });
    } catch (error) {
      console.warn('LLM API unavailable, falling back to mock evaluation');
      return this.mockTrainingEvaluation(userResponse);
    }
  }

  async generateSalesCoachingTips(performanceData, salesData) {
    if (this.llmProvider === 'mock') {
      return this.mockCoachingTips(performanceData);
    }

    try {
      return await this.request('/llm/coaching-tips', {
        method: 'POST',
        body: JSON.stringify({
          performanceData,
          salesData,
          model: 'gpt-4',
          temperature: 0.6,
        }),
      });
    } catch (error) {
      console.warn('LLM API unavailable, falling back to mock coaching tips');
      return this.mockCoachingTips(performanceData);
    }
  }

  // Mock implementations for development and demo
  mockProductRecommendations(customerProfile, productCatalog) {
    const recommendations = [
      {
        productId: 'prod-001',
        name: 'Wireless Bluetooth Headphones',
        price: 129.99,
        rating: 4.5,
        confidence: 95,
        reason: 'Based on customer\'s interest in audio equipment and previous purchases',
        image: '🎧',
        category: 'Electronics'
      },
      {
        productId: 'prod-002',
        name: 'Smart Fitness Watch',
        price: 199.99,
        rating: 4.8,
        confidence: 88,
        reason: 'Complements their active lifestyle and health interests',
        image: '⌚',
        category: 'Wearables'
      },
      {
        productId: 'prod-003',
        name: 'Portable Phone Charger',
        price: 39.99,
        rating: 4.3,
        confidence: 75,
        reason: 'Essential accessory for mobile device users',
        image: '🔋',
        category: 'Accessories'
      }
    ];

    return Promise.resolve({
      recommendations,
      confidence: 0.87,
      reasoning: 'Recommendations based on customer profile analysis and purchase history patterns'
    });
  }

  mockTrainingScenario(moduleType, difficulty) {
    const scenarios = {
      'customer-service': {
        beginner: {
          title: 'Handling a Simple Return',
          scenario: 'A customer wants to return a shirt they bought last week. They have the receipt and the item is in perfect condition.',
          customerMessage: 'Hi, I\'d like to return this shirt. I bought it last week but it doesn\'t fit quite right.',
          expectedActions: ['Check receipt', 'Inspect item condition', 'Process return', 'Offer exchange'],
          difficulty: 'beginner'
        },
        intermediate: {
          title: 'Dealing with an Upset Customer',
          scenario: 'A customer is frustrated because an item they ordered online is out of stock when they came to pick it up.',
          customerMessage: 'This is ridiculous! I ordered this online and drove 30 minutes to pick it up, and now you\'re telling me it\'s not available?',
          expectedActions: ['Acknowledge frustration', 'Apologize sincerely', 'Offer alternatives', 'Provide compensation'],
          difficulty: 'intermediate'
        },
        advanced: {
          title: 'Complex Product Consultation',
          scenario: 'A customer needs help choosing between multiple high-end electronics with different features and price points.',
          customerMessage: 'I\'m looking for a new laptop for my design work, but I\'m not sure which one would be best. I need something powerful but portable.',
          expectedActions: ['Ask qualifying questions', 'Compare features', 'Demonstrate products', 'Provide expert recommendation'],
          difficulty: 'advanced'
        }
      }
    };

    const scenario = scenarios[moduleType]?.[difficulty] || scenarios['customer-service']['beginner'];
    
    return Promise.resolve({
      ...scenario,
      id: `scenario-${Date.now()}`,
      estimatedDuration: difficulty === 'beginner' ? 5 : difficulty === 'intermediate' ? 10 : 15
    });
  }

  mockTrainingEvaluation(userResponse) {
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
    const feedback = [
      'Good use of empathy in your response',
      'Consider asking more qualifying questions',
      'Excellent problem-solving approach',
      'Remember to confirm customer satisfaction'
    ];

    return Promise.resolve({
      score,
      feedback: feedback[Math.floor(Math.random() * feedback.length)],
      strengths: ['Communication', 'Problem-solving'],
      improvements: ['Product knowledge', 'Upselling techniques'],
      nextSteps: 'Try the intermediate module on product consultation'
    });
  }

  mockCoachingTips(performanceData) {
    const tips = [
      {
        category: 'Sales Technique',
        tip: 'Focus on asking open-ended questions to better understand customer needs',
        impact: 'high',
        difficulty: 'easy'
      },
      {
        category: 'Product Knowledge',
        tip: 'Study the top 10 best-selling products in your department',
        impact: 'medium',
        difficulty: 'medium'
      },
      {
        category: 'Customer Service',
        tip: 'Practice active listening by summarizing customer concerns before offering solutions',
        impact: 'high',
        difficulty: 'easy'
      }
    ];

    return Promise.resolve({
      tips,
      overallScore: performanceData?.score || 75,
      trend: 'improving',
      nextGoal: 'Increase conversion rate by 5%'
    });
  }
}

class AnalyticsService extends APIService {
  async getSalesData(userId, dateRange = '30d') {
    try {
      return await this.request(`/analytics/sales/${userId}?range=${dateRange}`);
    } catch (error) {
      console.warn('Analytics API unavailable, falling back to mock data');
      return this.mockSalesData(userId, dateRange);
    }
  }

  async getInventoryInsights(storeId) {
    try {
      return await this.request(`/analytics/inventory/${storeId}`);
    } catch (error) {
      console.warn('Analytics API unavailable, falling back to mock data');
      return this.mockInventoryData(storeId);
    }
  }

  async getPerformanceMetrics(userId) {
    try {
      return await this.request(`/analytics/performance/${userId}`);
    } catch (error) {
      console.warn('Analytics API unavailable, falling back to mock data');
      return this.mockPerformanceData(userId);
    }
  }

  mockSalesData(userId, dateRange) {
    const data = [
      { date: '2024-01-01', sales: 4000, recommendations: 240, conversions: 180 },
      { date: '2024-01-02', sales: 3000, recommendations: 190, conversions: 140 },
      { date: '2024-01-03', sales: 2000, recommendations: 130, conversions: 95 },
      { date: '2024-01-04', sales: 2780, recommendations: 200, conversions: 155 },
      { date: '2024-01-05', sales: 1890, recommendations: 150, conversions: 110 },
      { date: '2024-01-06', sales: 2390, recommendations: 180, conversions: 135 },
    ];

    return Promise.resolve({
      data,
      totalSales: data.reduce((sum, day) => sum + day.sales, 0),
      totalRecommendations: data.reduce((sum, day) => sum + day.recommendations, 0),
      conversionRate: 0.73,
      trend: 'stable'
    });
  }

  mockInventoryData(storeId) {
    const items = [
      { id: 1, name: 'Wireless Headphones', stock: 45, reorderPoint: 20, status: 'in-stock', velocity: 3.2 },
      { id: 2, name: 'Smart Watch', stock: 8, reorderPoint: 15, status: 'low-stock', velocity: 2.1 },
      { id: 3, name: 'Phone Case', stock: 0, reorderPoint: 25, status: 'out-of-stock', velocity: 5.4 },
      { id: 4, name: 'Bluetooth Speaker', stock: 23, reorderPoint: 10, status: 'in-stock', velocity: 1.8 },
    ];

    return Promise.resolve({
      items,
      lowStockCount: items.filter(item => item.status === 'low-stock').length,
      outOfStockCount: items.filter(item => item.status === 'out-of-stock').length,
      totalValue: 125000,
      turnoverRate: 2.3
    });
  }

  mockPerformanceData(userId) {
    return Promise.resolve({
      score: 78,
      rank: 12,
      totalSales: 45600,
      recommendationsAccepted: 156,
      customerSatisfaction: 4.6,
      trainingHours: 24,
      badges: ['Top Performer', 'Customer Favorite', 'Product Expert'],
      trends: {
        sales: 'up',
        satisfaction: 'stable',
        efficiency: 'up'
      }
    });
  }
}

// Export service instances
export const llmService = new LLMService();
export const analyticsService = new AnalyticsService();

// Export classes for testing
export { LLMService, AnalyticsService };
