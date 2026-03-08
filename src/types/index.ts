import { User, Organization, Product, Sale, Customer } from '@prisma/client'

// User types for the free/pro system
export type UserType = 'free' | 'pro'

export interface SessionData {
  userType: UserType
  createdAt: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Query types
export interface QueryRequest {
  query: string
  sessionId: string
  userType: UserType
}

export interface QueryResponse {
  data: any[]
  explanation: string
  sqlGenerated: string
  executionTime: number
  success: boolean
  error?: string
}

// Market Intelligence types
export interface MarketTrend {
  name: string
  direction: 'up' | 'down' | 'stable'
  strength: number
  timeframe: string
  value?: number
  change?: number
}

export interface MarketAnalysis {
  trends: MarketTrend[]
  insights: string[]
  confidence: number
  dataPoints: number
  lastUpdated: Date
}

// Demand Forecasting types
export interface DemandPrediction {
  period: Date
  predicted: number
  confidenceInterval: [number, number]
  factors: string[]
}

export interface DemandForecast {
  productId: string
  predictions: DemandPrediction[]
  confidence: number
  influencingFactors: string[]
  recommendations: string[]
  methodology: string
}

// Pricing types
export interface PricingRecommendation {
  recommendedPrice: number
  priceRange: [number, number]
  expectedImpact: {
    revenue: number
    margin: number
    marketShare: number
  }
  rationale: string[]
  confidence: number
}

export interface CompetitorPrice {
  competitor: string
  price: number
  timestamp: Date
  source?: string
}

// Risk Analysis types
export interface Risk {
  id: string
  category: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  likelihood: number
  description: string
  impact: string
  status: 'open' | 'mitigated' | 'closed'
  detectedAt: Date
}

export interface RiskAssessment {
  risks: Risk[]
  overallScore: number
  prioritizedActions: Action[]
  lastAssessed: Date
}

export interface Action {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  assignedTo?: string
}

// Document Processing types
export interface DocumentAnalysis {
  documentId: string
  summary: string
  keyPoints: string[]
  extractedData: Record<string, any>
  confidence: number
}

export interface DocumentAnswer {
  answer: string
  sources: DocumentSection[]
  confidence: number
}

export interface DocumentSection {
  page?: number
  section: string
  content: string
}

// AI Copilot types
export interface CopilotMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface CopilotResponse {
  message: string
  suggestions: string[]
  actions: Action[]
  sources: DataSource[]
}

export interface DataSource {
  type: string
  name: string
  url?: string
  lastUpdated?: Date
}

// Dashboard types
export interface DashboardMetrics {
  totalRevenue: number
  revenueGrowth: number
  totalOrders: number
  ordersGrowth: number
  averageOrderValue: number
  aovGrowth: number
  customerCount: number
  customerGrowth: number
}

export interface ChartData {
  name: string
  value: number
  date?: string
  category?: string
}

// Extended Prisma types with relations
export interface UserWithOrganization extends User {
  organization: Organization
}

export interface ProductWithSales extends Product {
  sales: Sale[]
  _count: {
    sales: number
  }
}

export interface CustomerWithSales extends Customer {
  sales: Sale[]
  _count: {
    sales: number
  }
}

// Form types
export interface ApiKeyFormData {
  apiKey: string
  userType: UserType
}

export interface SystemPromptFormData {
  name: string
  content: string
}

// Filter and pagination types
export interface PaginationParams {
  page: number
  limit: number
}

export interface FilterParams {
  startDate?: Date
  endDate?: Date
  category?: string
  region?: string
  status?: string
}

export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}

// Alert types
export interface Alert {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  data?: any
  createdAt: Date
  readAt?: Date
  resolvedAt?: Date
}

// Configuration types
export interface SystemConfig {
  openaiModel: string
  sessionTtl: number
  maxQueryResults: number
  alertThreshold: number
  logLevel: string
}

// Analytics types
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: Date
  userId?: string
  sessionId?: string
}

// Export utility type for API handlers
export type ApiHandler<T = any> = (
  req: Request,
  context?: any
) => Promise<Response | ApiResponse<T>>