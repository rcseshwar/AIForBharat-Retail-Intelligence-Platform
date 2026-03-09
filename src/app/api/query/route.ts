import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

const DATABASE_SCHEMA = `
-- Users and Organizations
users (id, email, name, role, "organizationId", "createdAt", "updatedAt")
organizations (id, name, industry, "createdAt", "updatedAt")

-- Products and Sales
products (id, name, category, price, cost, sku, description, "organizationId", "createdAt", "updatedAt")
sales (id, "productId", "customerId", quantity, revenue, timestamp, channel, region) -- NO organizationId, filter via product/customer joins
customers (id, "organizationId", email, name, segment, "lifetimeValue", "acquisitionDate", "lastPurchaseDate", region, "createdAt", "updatedAt")
price_history (id, "productId", price, timestamp, reason) -- NO organizationId, filter via product join

-- Market Intelligence
market_data (id, region, category, metric, value, timestamp, source, "organizationId")
competitor_prices (id, "productId", competitor, price, timestamp, source, url) -- NO organizationId, filter via product join

-- Forecasting
demand_forecasts (id, "productId", period, predicted, confidence, granularity, "createdAt") -- NO organizationId, filter via product join
sales_targets (id, "organizationId", category, region, target, period, granularity, "createdAt")

-- Risk and Compliance
risks (id, "organizationId", category, severity, likelihood, description, status, "detectedAt", "resolvedAt", impact)
mitigations (id, "riskId", strategy, description, status, "assignedTo", "dueDate", "createdAt", "completedAt") -- NO organizationId, filter via risk join
compliance_rules (id, name, description, regulation, category, "isActive", "createdAt", "updatedAt") -- NO organizationId, global rules
compliance_violations (id, "ruleId", description, severity, "detectedAt", "resolvedAt", status) -- NO organizationId, filter via rule join

-- Documents
documents (id, "userId", filename, "fileType", "fileSize", summary, "uploadedAt", "processedAt", status) -- NO organizationId, filter via user join
extracted_data (id, "documentId", key, value, "dataType", confidence) -- NO organizationId, filter via document join

-- System
system_prompts (id, name, content, "isActive", version, "createdAt", "updatedBy") -- NO organizationId, global prompts
queries (id, "userId", query, "sqlGenerated", "executionTime", timestamp, success, "errorMessage", "resultCount") -- NO organizationId, filter via user join
access_logs (id, "userId", resource, action, timestamp, "ipAddress", success, details) -- NO organizationId, filter via user join
alerts (id, type, severity, title, description, data, "createdAt", "readAt", "resolvedAt") -- NO organizationId, global alerts
performance_metrics (id, endpoint, method, duration, timestamp, "userId", success, "errorType") -- NO organizationId, filter via user join
`

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { query, apiKey } = await request.json()

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key is required' },
        { status: 400 }
      )
    }

    if (!apiKey.startsWith('sk-')) {
      return NextResponse.json(
        { success: false, error: 'Invalid OpenAI API key format' },
        { status: 400 }
      )
    }

    // Initialize AI service with provided API key
    const aiService = new AIService(apiKey)

    // Generate SQL from natural language
    const { sql, explanation } = await aiService.generateSQL(
      query,
      DATABASE_SCHEMA,
      'demo-org'
    )

    // Validate SQL (basic security check)
    const sqlUpper = sql.toUpperCase()
    const dangerousKeywords = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'CREATE', 'ALTER', 'TRUNCATE']
    
    if (dangerousKeywords.some(keyword => sqlUpper.includes(keyword))) {
      return NextResponse.json(
        { success: false, error: 'Only SELECT queries are allowed for security reasons.' },
        { status: 400 }
      )
    }

    // Execute SQL query
    let data: any[] = []
    let executionTime = 0
    let success = true
    let errorMessage: string | undefined

    try {
      const queryStart = Date.now()
      data = await prisma.$queryRawUnsafe(sql)
      executionTime = Date.now() - queryStart

      // Limit results
      const maxResults = parseInt(process.env.MAX_QUERY_RESULTS || '1000')
      if (data.length > maxResults) {
        data = data.slice(0, maxResults)
      }
    } catch (sqlError: any) {
      success = false
      errorMessage = sqlError.message
      console.error('SQL execution error:', sqlError)
    }

    const totalTime = Date.now() - startTime

    if (!success) {
      return NextResponse.json({
        success: false,
        error: errorMessage || 'Query execution failed',
        sqlGenerated: sql,
        explanation
      })
    }

    return NextResponse.json({
      success: true,
      data,
      explanation,
      sqlGenerated: sql,
      executionTime: totalTime,
      resultCount: data.length
    })

  } catch (error: any) {
    console.error('Query processing error:', error)

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'An unexpected error occurred while processing your query.' 
      },
      { status: 500 }
    )
  }
}