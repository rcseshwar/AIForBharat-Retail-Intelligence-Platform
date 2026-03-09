import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/openai'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, apiKey } = await request.json()

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
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

    // Create system prompt for business copilot
    const systemPrompt = `You are an AI business copilot and strategic advisor. You help business owners, entrepreneurs, and managers make informed decisions by providing:

1. Strategic business advice and planning
2. Market analysis and competitive insights
3. Risk assessment and mitigation strategies
4. Growth opportunities and revenue optimization
5. Operational efficiency recommendations
6. Financial planning guidance
7. Marketing and customer acquisition strategies

Guidelines:
- Provide practical, actionable advice
- Ask clarifying questions when needed
- Use business terminology appropriately
- Be concise but comprehensive
- Focus on ROI and business impact
- Consider both short-term and long-term implications
- Acknowledge when you need more specific information

Always maintain a professional, helpful, and strategic mindset.`

    // Format conversation history for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    const response = await aiService.chatWithCopilot(
      message,
      conversationHistory,
      systemPrompt
    )

    return NextResponse.json({
      success: true,
      message: response.message,
      suggestions: response.suggestions,
      actions: response.actions
    })

  } catch (error: any) {
    console.error('Copilot processing error:', error)

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'An unexpected error occurred while processing your message.' 
      },
      { status: 500 }
    )
  }
}