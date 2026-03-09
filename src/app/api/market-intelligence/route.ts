import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { apiKey, industry, region } = await request.json()

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

    // Mock market data for demonstration
    const mockMarketData = {
      marketSize: '$125M',
      growthRate: '8.5%',
      marketShare: '15.2%',
      competitorIndex: 92,
      trends: [
        {
          name: 'E-commerce Growth',
          description: 'Online sales increasing by 15% YoY',
          direction: 'up' as const
        },
        {
          name: 'Mobile Commerce',
          description: 'Mobile transactions up 22%',
          direction: 'up' as const
        },
        {
          name: 'Traditional Retail',
          description: 'Physical store sales declining 5%',
          direction: 'down' as const
        }
      ],
      competitors: [
        { name: 'TechCorp', score: 75 },
        { name: 'AudioMax', score: 60 },
        { name: 'Your Company', score: 85 }
      ],
      insights: [
        {
          type: 'opportunity' as const,
          title: 'Growth Opportunity',
          description: 'The mobile commerce segment shows strong growth potential. Consider investing in mobile app development and mobile-first marketing strategies.'
        },
        {
          type: 'risk' as const,
          title: 'Market Risk',
          description: 'Traditional retail channels are declining. Diversify your sales channels to reduce dependency on physical stores.'
        },
        {
          type: 'advantage' as const,
          title: 'Competitive Advantage',
          description: 'Your company outperforms competitors in customer satisfaction. Leverage this strength in marketing campaigns.'
        }
      ]
    }

    // In a real implementation, you would use the AI service to analyze market data
    // For now, we'll return the mock data with some AI-generated insights
    try {
      const analysisPrompt = `Analyze the ${industry} market in ${region} and provide insights on:
      1. Current market trends
      2. Growth opportunities
      3. Competitive landscape
      4. Risk factors
      5. Strategic recommendations
      
      Provide a brief analysis focusing on actionable insights.`

      const aiAnalysis = await aiService.analyzeMarketTrends([], analysisPrompt)
      
      // Enhance mock data with AI insights if available
      if (aiAnalysis.insights && aiAnalysis.insights.length > 0) {
        mockMarketData.insights = aiAnalysis.insights.map((insight: string, index: number) => ({
          type: index % 3 === 0 ? 'opportunity' : index % 3 === 1 ? 'risk' : 'advantage',
          title: `AI Insight ${index + 1}`,
          description: insight
        }))
      }
    } catch (aiError) {
      console.log('AI analysis failed, using mock data:', aiError)
      // Continue with mock data if AI analysis fails
    }

    return NextResponse.json({
      success: true,
      data: mockMarketData
    })

  } catch (error: any) {
    console.error('Market intelligence processing error:', error)

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'An unexpected error occurred while processing market intelligence data.' 
      },
      { status: 500 }
    )
  }
}