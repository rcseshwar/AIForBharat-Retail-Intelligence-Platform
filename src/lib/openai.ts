import OpenAI from 'openai'

export function createOpenAIClient(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey: apiKey,
  })
}

export interface QueryResult {
  data: any[]
  explanation: string
  sqlGenerated: string
  executionTime: number
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export class AIService {
  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = createOpenAIClient(apiKey)
  }

  async generateSQL(
    naturalLanguageQuery: string,
    schema: string,
    organizationId: string
  ): Promise<{ sql: string; explanation: string }> {
    const systemPrompt = `You are a SQL expert that converts natural language queries to PostgreSQL queries.

Database Schema:
${schema}

CRITICAL PostgreSQL Rules:
1. ALL camelCase column names MUST be quoted with double quotes (e.g., "organizationId", "productId", "customerId", "createdAt", "updatedAt")
2. Table names are lowercase without quotes (e.g., products, sales, customers)
3. For data isolation, use appropriate WHERE clauses:
   - Tables with "organizationId": WHERE "organizationId" = '${organizationId}'
   - Sales data: JOIN with products/customers and filter by their "organizationId"
   - Other related tables: JOIN with parent tables that have "organizationId"
4. Limit results to 1000 rows maximum using LIMIT 1000
5. Only SELECT queries are allowed - no INSERT, UPDATE, DELETE, DROP, etc.
6. Use proper joins when needed for data isolation
7. Return only valid SQL without explanations in the SQL itself

CORRECT Examples of column quoting:
- SELECT * FROM products WHERE "organizationId" = '${organizationId}'
- SELECT s.*, p.name FROM sales s JOIN products p ON s."productId" = p.id WHERE p."organizationId" = '${organizationId}'
- SELECT "createdAt", "updatedAt", name FROM customers WHERE "organizationId" = '${organizationId}'

WRONG Examples (DO NOT USE):
- SELECT * FROM products WHERE organizationId = '${organizationId}' (missing quotes)
- SELECT s.*, p.name FROM sales s JOIN products p ON s.productid = p.id (wrong case)
- SELECT createdAt, updatedAt FROM customers (missing quotes on camelCase)

Respond with a JSON object containing:
- sql: The PostgreSQL query with properly quoted column names
- explanation: Human-readable explanation of what the query does`

    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: naturalLanguageQuery }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    return {
      sql: result.sql || '',
      explanation: result.explanation || 'Query generated successfully'
    }
  }

  async analyzeMarketTrends(data: any[], context: string): Promise<{
    trends: any[]
    insights: string[]
    confidence: number
  }> {
    const systemPrompt = `You are a market intelligence analyst. Analyze the provided data and identify trends, patterns, and actionable insights.

Context: ${context}

Provide analysis in JSON format with:
- trends: Array of trend objects with name, direction, strength, and timeframe
- insights: Array of actionable insight strings
- confidence: Number between 0-1 indicating confidence in analysis`

    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze this market data: ${JSON.stringify(data)}` }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(response.choices[0].message.content || '{}')
  }

  async forecastDemand(
    historicalData: any[],
    productInfo: any,
    horizon: number
  ): Promise<{
    predictions: any[]
    confidence: number
    factors: string[]
    methodology: string
  }> {
    const systemPrompt = `You are a demand forecasting expert. Analyze historical sales data and predict future demand.

Product Information: ${JSON.stringify(productInfo)}
Forecast Horizon: ${horizon} periods

Provide forecast in JSON format with:
- predictions: Array of prediction objects with period, predicted_demand, confidence_interval
- confidence: Overall confidence level (0-1)
- factors: Key factors influencing the forecast
- methodology: Brief explanation of forecasting approach used`

    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Historical data: ${JSON.stringify(historicalData)}` }
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(response.choices[0].message.content || '{}')
  }

  async optimizePricing(
    productData: any,
    competitorPrices: any[],
    marketConditions: any
  ): Promise<{
    recommendedPrice: number
    priceRange: [number, number]
    rationale: string[]
    confidence: number
  }> {
    const systemPrompt = `You are a pricing optimization expert. Analyze product data, competitor prices, and market conditions to recommend optimal pricing.

Provide recommendations in JSON format with:
- recommendedPrice: Optimal price point
- priceRange: [min_price, max_price] range
- rationale: Array of reasoning points
- confidence: Confidence level (0-1)`

    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Product: ${JSON.stringify(productData)}\nCompetitors: ${JSON.stringify(competitorPrices)}\nMarket: ${JSON.stringify(marketConditions)}` 
        }
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(response.choices[0].message.content || '{}')
  }

  async analyzeRisks(businessData: any[], complianceRules: any[]): Promise<{
    risks: any[]
    overallScore: number
    prioritizedActions: any[]
  }> {
    const systemPrompt = `You are a business risk analyst. Analyze business data and identify potential risks, compliance issues, and mitigation strategies.

Compliance Rules: ${JSON.stringify(complianceRules)}

Provide analysis in JSON format with:
- risks: Array of risk objects with id, category, severity, likelihood, description
- overallScore: Overall risk score (0-100)
- prioritizedActions: Array of recommended actions ordered by priority`

    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Business data: ${JSON.stringify(businessData)}` }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(response.choices[0].message.content || '{}')
  }

  async processDocument(content: string, fileType: string): Promise<{
    summary: string
    keyPoints: string[]
    extractedData: Record<string, any>
    confidence: number
  }> {
    const systemPrompt = `You are a document analysis expert. Extract key information, summarize content, and identify structured data from business documents.

File Type: ${fileType}

Provide analysis in JSON format with:
- summary: Brief summary of the document
- keyPoints: Array of key points and findings
- extractedData: Object with structured data found in document
- confidence: Confidence level in extraction (0-1)`

    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Document content: ${content}` }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(response.choices[0].message.content || '{}')
  }

  async chatWithCopilot(
    message: string,
    conversationHistory: any[],
    systemPrompt: string,
    contextData?: any
  ): Promise<{
    message: string
    suggestions: string[]
    actions: any[]
    sources: any[]
  }> {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    if (contextData) {
      messages.splice(-1, 0, {
        role: 'system',
        content: `Context data: ${JSON.stringify(contextData)}`
      })
    }

    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 1000
    })

    const content = response.choices[0].message.content || ''

    // For now, return simple response. In production, you might want to parse structured responses
    return {
      message: content,
      suggestions: [],
      actions: [],
      sources: []
    }
  }
}