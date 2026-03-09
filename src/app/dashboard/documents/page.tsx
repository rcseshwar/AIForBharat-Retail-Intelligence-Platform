'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Upload, Search, Download, Eye, Trash2 } from 'lucide-react'

export default function DocumentsPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkApiKey = () => {
      try {
        const apiKey = sessionStorage.getItem('openai_api_key')
        if (!apiKey) {
          router.push('/')
          return
        }
        setHasApiKey(true)
      } catch (error) {
        console.error('Error accessing sessionStorage:', error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(checkApiKey, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  const mockDocuments = [
    {
      id: '1',
      name: 'Q3 Sales Report.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: '2024-03-01',
      status: 'Processed',
      summary: 'Quarterly sales analysis showing 15% growth in electronics category'
    },
    {
      id: '2',
      name: 'Market Research.docx',
      type: 'Word',
      size: '1.8 MB',
      uploadedAt: '2024-02-28',
      status: 'Processed',
      summary: 'Comprehensive market analysis for retail intelligence sector'
    },
    {
      id: '3',
      name: 'Customer Feedback.xlsx',
      type: 'Excel',
      size: '956 KB',
      uploadedAt: '2024-02-25',
      status: 'Processing',
      summary: 'Customer satisfaction survey results and analysis'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Analysis</h1>
          <p className="text-gray-600">
            Upload and analyze business documents with AI-powered insights.
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-muted-foreground">
              87.5% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2 MB</div>
            <p className="text-xs text-muted-foreground">
              of 1 GB limit
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Your uploaded documents and their analysis status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size} • {doc.uploadedAt}</p>
                    <p className="text-sm text-gray-500 mt-1">{doc.summary}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    doc.status === 'Processed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Document Insights</CardTitle>
          <CardDescription>Key insights extracted from your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Sales Performance</h4>
              <p className="text-sm text-blue-800">
                Q3 sales report indicates strong performance in electronics category with 15% growth. Wireless products leading the segment.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Market Opportunity</h4>
              <p className="text-sm text-green-800">
                Market research document highlights emerging trends in smart home devices. Potential for 25% market expansion identified.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">Customer Feedback</h4>
              <p className="text-sm text-yellow-800">
                Customer satisfaction survey shows 4.2/5 rating. Main improvement areas: delivery speed and product packaging.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}