'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Upload, Search, Download, Eye, Trash2 } from 'lucide-react'

export default function DocumentsPage() {
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUserType = sessionStorage.getItem('userType') as 'free' | 'pro' | null
    if (!storedUserType) {
      router.push('/')
      return
    }
    setUserType(storedUserType)
  }, [router])

  if (!userType) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
      size: '856 KB',
      uploadedAt: '2024-02-25',
      status: 'Processing',
      summary: 'Customer satisfaction survey results and analysis'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Analysis</h1>
        <p className="text-gray-600">
          Upload and analyze business documents with AI-powered insights extraction.
          {userType === 'free' && (
            <span className="block mt-1 text-orange-600">
              Free users can upload up to 5 documents per month.
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Documents</span>
              </CardTitle>
              <CardDescription>
                Upload PDF, Word, Excel, or text files for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Supports PDF, DOCX, XLSX, TXT files up to 10MB
                </p>
                <Button disabled>
                  Choose Files
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  This is a demo interface. File upload functionality coming soon.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Document List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Your Documents</span>
              </CardTitle>
              <CardDescription>
                Manage and analyze your uploaded documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">
                          {doc.type} • {doc.size} • {doc.uploadedAt}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{doc.summary}</p>
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
                      <Button variant="ghost" size="sm" disabled>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" disabled>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" disabled>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                <Search className="mr-2 h-4 w-4" />
                Search Documents
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <FileText className="mr-2 h-4 w-4" />
                Generate Summary
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Download className="mr-2 h-4 w-4" />
                Export Analysis
              </Button>
            </CardContent>
          </Card>

          {/* Document Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Document Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Documents</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Processed</span>
                <span className="font-medium text-green-600">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Processing</span>
                <span className="font-medium text-yellow-600">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Storage Used</span>
                <span className="font-medium">5.1 MB</span>
              </div>
              {userType === 'free' && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Limit</span>
                  <span className="font-medium text-orange-600">3/5</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">Key Finding</p>
                  <p className="text-xs text-blue-800">
                    Sales reports show consistent growth in Q3
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-900">Opportunity</p>
                  <p className="text-xs text-green-800">
                    Customer feedback indicates demand for new features
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">Action Item</p>
                  <p className="text-xs text-yellow-800">
                    Market research suggests expansion opportunity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}