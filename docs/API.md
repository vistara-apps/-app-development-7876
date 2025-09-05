# RetailFlow AI - API Documentation

## Overview

RetailFlow AI provides a comprehensive API for integrating AI-powered retail assistance features. The API is designed to be flexible and scalable, supporting both mock implementations for development and production-ready integrations.

## Base Configuration

### Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_LLM_PROVIDER=mock # or 'openai', 'anthropic', etc.

# LLM Provider Configuration (when not using mock)
VITE_OPENAI_API_KEY=your_openai_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
```

## API Services

### LLM Service

The LLM Service provides AI-powered functionality for product recommendations, training scenarios, and coaching tips.

#### Product Recommendations

```javascript
import { llmService } from '../services/api'

// Generate product recommendations
const recommendations = await llmService.generateProductRecommendations(
  customerProfile,
  productCatalog,
  context
)
```

**Parameters:**
- `customerProfile` (Object): Customer demographics and preferences
- `productCatalog` (Array): Available products
- `context` (Object): Additional context (location, season, etc.)

**Response:**
```json
{
  "recommendations": [
    {
      "productId": "prod-001",
      "name": "Wireless Bluetooth Headphones",
      "price": 129.99,
      "rating": 4.5,
      "confidence": 95,
      "reason": "Based on customer's interest in audio equipment",
      "image": "🎧",
      "category": "Electronics"
    }
  ],
  "confidence": 0.87,
  "reasoning": "Recommendations based on customer profile analysis"
}
```

#### Training Scenarios

```javascript
// Generate training scenario
const scenario = await llmService.generateTrainingScenario(
  'customer-service',
  'intermediate'
)
```

**Parameters:**
- `moduleType` (String): Type of training module
- `difficulty` (String): 'beginner', 'intermediate', 'advanced'

**Response:**
```json
{
  "id": "scenario-1234567890",
  "title": "Dealing with an Upset Customer",
  "scenario": "A customer is frustrated because...",
  "customerMessage": "This is ridiculous! I ordered this online...",
  "expectedActions": ["Acknowledge frustration", "Apologize sincerely"],
  "difficulty": "intermediate",
  "estimatedDuration": 10
}
```

#### Training Evaluation

```javascript
// Evaluate training response
const evaluation = await llmService.evaluateTrainingResponse(
  scenario,
  userResponse,
  expectedOutcome
)
```

**Response:**
```json
{
  "score": 85,
  "feedback": "Good use of empathy in your response",
  "strengths": ["Communication", "Problem-solving"],
  "improvements": ["Product knowledge", "Upselling techniques"],
  "nextSteps": "Try the intermediate module on product consultation"
}
```

#### Sales Coaching

```javascript
// Generate coaching tips
const coaching = await llmService.generateSalesCoachingTips(
  performanceData,
  salesData
)
```

**Response:**
```json
{
  "tips": [
    {
      "category": "Sales Technique",
      "tip": "Focus on asking open-ended questions",
      "impact": "high",
      "difficulty": "easy"
    }
  ],
  "overallScore": 75,
  "trend": "improving",
  "nextGoal": "Increase conversion rate by 5%"
}
```

### Analytics Service

The Analytics Service provides data insights for sales performance, inventory management, and user metrics.

#### Sales Data

```javascript
import { analyticsService } from '../services/api'

// Get sales data
const salesData = await analyticsService.getSalesData(userId, '30d')
```

**Parameters:**
- `userId` (String): User identifier
- `dateRange` (String): '7d', '30d', '90d', '1y'

**Response:**
```json
{
  "data": [
    {
      "date": "2024-01-01",
      "sales": 4000,
      "recommendations": 240,
      "conversions": 180
    }
  ],
  "totalSales": 16060,
  "totalRecommendations": 1090,
  "conversionRate": 0.73,
  "trend": "stable"
}
```

#### Inventory Insights

```javascript
// Get inventory insights
const inventory = await analyticsService.getInventoryInsights(storeId)
```

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "stock": 45,
      "reorderPoint": 20,
      "status": "in-stock",
      "velocity": 3.2
    }
  ],
  "lowStockCount": 1,
  "outOfStockCount": 1,
  "totalValue": 125000,
  "turnoverRate": 2.3
}
```

#### Performance Metrics

```javascript
// Get performance metrics
const performance = await analyticsService.getPerformanceMetrics(userId)
```

**Response:**
```json
{
  "score": 78,
  "rank": 12,
  "totalSales": 45600,
  "recommendationsAccepted": 156,
  "customerSatisfaction": 4.6,
  "trainingHours": 24,
  "badges": ["Top Performer", "Customer Favorite"],
  "trends": {
    "sales": "up",
    "satisfaction": "stable",
    "efficiency": "up"
  }
}
```

## Data Models

### User Model

```javascript
import { User } from '../models'

const user = new User(
  'user-123',
  'John Doe',
  'Sales Associate',
  'store-001',
  {
    totalSales: 45600,
    recommendationsAccepted: 156,
    customerSatisfaction: 4.6
  }
)

// Methods
user.addSalesSession(session)
user.getPerformanceScore() // Returns calculated score
```

### Product Model

```javascript
import { Product } from '../models'

const product = new Product(
  'prod-001',
  'Wireless Headphones',
  'High-quality bluetooth headphones',
  'Electronics',
  45, // current stock
  3.2 // sales velocity
)

// Methods
product.getStockStatus() // 'in-stock', 'low-stock', 'out-of-stock'
product.getDaysUntilStockout() // Calculated based on velocity
```

### Sales Session Model

```javascript
import { SalesSession } from '../models'

const session = new SalesSession(
  'session-123',
  'user-123',
  'customer-456'
)

// Methods
session.addProductView('prod-001')
session.addPurchase('prod-001', 1, 129.99)
session.addRecommendation('prod-002', 95, 'Complementary product')
session.getTotalSalesValue() // Returns total value of purchases
```

## Error Handling

All API services include comprehensive error handling with fallback to mock data:

```javascript
try {
  const data = await llmService.generateProductRecommendations(profile, catalog)
  // Handle successful response
} catch (error) {
  console.error('API Error:', error)
  // Service automatically falls back to mock data
  // No additional error handling required
}
```

## Rate Limiting

When using production APIs, implement appropriate rate limiting:

- OpenAI API: 3,500 requests per minute
- Anthropic API: 1,000 requests per minute
- Custom APIs: As per your service limits

## Authentication

For production deployments, implement proper authentication:

```javascript
// Example with API key authentication
const config = {
  headers: {
    'Authorization': `Bearer ${process.env.VITE_API_KEY}`,
    'Content-Type': 'application/json'
  }
}
```

## Testing

The API services include comprehensive mock implementations for testing:

```javascript
// Force mock mode for testing
process.env.VITE_LLM_PROVIDER = 'mock'

// All services will return consistent mock data
const recommendations = await llmService.generateProductRecommendations()
// Returns predefined mock recommendations
```

## Production Deployment

For production deployment:

1. Set up proper API endpoints
2. Configure authentication
3. Implement rate limiting
4. Set up monitoring and logging
5. Configure environment variables
6. Test all endpoints thoroughly

## Support

For API support and integration assistance:
- Review the mock implementations in `/src/services/api.js`
- Check the data models in `/src/models/index.js`
- Refer to component usage examples in `/src/components/`
