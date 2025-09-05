// Data Models for RetailFlow AI
// Based on PRD specifications

export class User {
  constructor(userId, name, role, storeId, performanceMetrics = {}) {
    this.userId = userId;
    this.name = name;
    this.role = role; // 'Sales Associate', 'Manager', etc.
    this.storeId = storeId;
    this.performanceMetrics = performanceMetrics;
    this.salesSessions = [];
  }

  addSalesSession(session) {
    this.salesSessions.push(session);
  }

  getPerformanceScore() {
    const { totalSales = 0, recommendationsAccepted = 0, customerSatisfaction = 0 } = this.performanceMetrics;
    return Math.round((totalSales * 0.4 + recommendationsAccepted * 0.3 + customerSatisfaction * 0.3) / 3);
  }
}

export class Product {
  constructor(productId, name, description, category, currentStock, salesVelocity = 0) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.category = category;
    this.currentStock = currentStock;
    this.salesVelocity = salesVelocity; // units sold per day
    this.inventoryLevels = [];
    this.price = 0;
    this.rating = 0;
    this.image = '';
  }

  addInventoryLevel(level) {
    this.inventoryLevels.push(level);
  }

  getStockStatus() {
    if (this.currentStock === 0) return 'out-of-stock';
    if (this.currentStock < 10) return 'low-stock';
    if (this.currentStock < 50) return 'medium-stock';
    return 'in-stock';
  }

  getDaysUntilStockout() {
    if (this.salesVelocity === 0) return Infinity;
    return Math.floor(this.currentStock / this.salesVelocity);
  }
}

export class SalesSession {
  constructor(sessionId, userId, customerId, timestamp = new Date()) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.customerId = customerId;
    this.timestamp = timestamp;
    this.productsViewed = [];
    this.productsPurchased = [];
    this.recommendationsGiven = [];
    this.sessionDuration = 0;
    this.customerSatisfactionScore = 0;
  }

  addProductView(productId) {
    this.productsViewed.push({
      productId,
      timestamp: new Date(),
      duration: 0
    });
  }

  addPurchase(productId, quantity, price) {
    this.productsPurchased.push({
      productId,
      quantity,
      price,
      timestamp: new Date()
    });
  }

  addRecommendation(productId, confidence, reason) {
    this.recommendationsGiven.push({
      productId,
      confidence,
      reason,
      timestamp: new Date(),
      accepted: false
    });
  }

  getTotalSalesValue() {
    return this.productsPurchased.reduce((total, purchase) => 
      total + (purchase.price * purchase.quantity), 0
    );
  }
}

export class InventoryLevel {
  constructor(productId, storeId, quantity, lastUpdated = new Date()) {
    this.productId = productId;
    this.storeId = storeId;
    this.quantity = quantity;
    this.lastUpdated = lastUpdated;
    this.reorderPoint = 0;
    this.maxStock = 0;
    this.supplier = '';
  }

  needsReorder() {
    return this.quantity <= this.reorderPoint;
  }

  getReorderQuantity() {
    return Math.max(0, this.maxStock - this.quantity);
  }
}

export class TrainingModule {
  constructor(moduleId, name, description, scenario, difficulty = 'beginner') {
    this.moduleId = moduleId;
    this.name = name;
    this.description = description;
    this.scenario = scenario;
    this.difficulty = difficulty; // 'beginner', 'intermediate', 'advanced'
    this.completionRate = 0;
    this.averageScore = 0;
    this.estimatedDuration = 0; // in minutes
    this.tags = [];
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  getDifficultyColor() {
    switch (this.difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }
}

// Customer Profile for recommendations
export class CustomerProfile {
  constructor(customerId, demographics = {}, preferences = {}, purchaseHistory = []) {
    this.customerId = customerId;
    this.demographics = demographics; // age, gender, location, etc.
    this.preferences = preferences; // categories, brands, price range, etc.
    this.purchaseHistory = purchaseHistory;
    this.loyaltyTier = 'bronze'; // bronze, silver, gold, platinum
    this.totalSpent = 0;
    this.visitFrequency = 0;
  }

  getPreferredCategories() {
    const categoryCount = {};
    this.purchaseHistory.forEach(purchase => {
      categoryCount[purchase.category] = (categoryCount[purchase.category] || 0) + 1;
    });
    
    return Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);
  }

  getAverageOrderValue() {
    if (this.purchaseHistory.length === 0) return 0;
    return this.totalSpent / this.purchaseHistory.length;
  }
}
