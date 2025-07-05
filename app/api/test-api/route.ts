import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'No API key found',
        status: 'mock_mode'
      })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    
    // Test with a simple prompt
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent('Say "Hello, API is working!"')
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      success: true,
      message: text,
      api_key_length: process.env.GEMINI_API_KEY.length
    })
  } catch (error: any) {
    console.error('API test error:', error)
    return NextResponse.json({ 
      error: error.message || 'Unknown error',
      status: 'api_error'
    })
  }
} 