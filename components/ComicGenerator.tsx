'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Wand2, Copy, Download, Share2, Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Comic {
  id: string
  prompt: string
  content: string
  timestamp: Date
  isFavorite: boolean
}

export default function ComicGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentComic, setCurrentComic] = useState<Comic | null>(null)
  const [comics, setComics] = useState<Comic[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const generateComic = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setCurrentPage(1)
    
    try {
      const response = await fetch('/api/generate-comic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to generate comic')
      }

      const data = await response.json()
      
      if (!data.comic) {
        throw new Error('No comic content received')
      }
      
      const newComic: Comic = {
        id: Date.now().toString(),
        prompt,
        content: data.comic,
        timestamp: new Date(),
        isFavorite: false,
      }

      setCurrentComic(newComic)
      setComics(prev => [newComic, ...prev])
      setPrompt('')
      toast.success('Comic story generated successfully!')
    } catch (error) {
      console.error('Error generating comic:', error)
      toast.error('Failed to generate comic. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const downloadComic = (comic: Comic) => {
    const element = document.createElement('a')
    const file = new Blob([`${comic.prompt}\n\n${comic.content}`], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `what-if-comic-${comic.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Comic downloaded!')
  }

  const toggleFavorite = (comicId: string) => {
    setComics(prev => prev.map(comic => 
      comic.id === comicId 
        ? { ...comic, isFavorite: !comic.isFavorite }
        : comic
    ))
    if (currentComic?.id === comicId) {
      setCurrentComic(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null)
    }
  }

  const examplePrompts = [
    "What if Iron Man died in the first Avengers movie?",
    "What if Harry Potter was sorted into Slytherin?",
    "What if Luke Skywalker joined the Dark Side?",
    "What if Romeo and Juliet survived?",
  ]

  // Function to extract pages from comic content
  const getPages = (content: string) => {
    // Split by page headers and filter out empty strings
    const pageMatches = content.split(/## Page \d+:/).filter(page => page.trim())
    return pageMatches.length > 0 ? pageMatches : [content]
  }

  const pages = currentComic ? getPages(currentComic.content) : []
  const totalPages = pages.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Generate Your "What If" Comic Story
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create a full-length comic book story with multiple pages, dialogue, and dramatic panels.
        </p>
      </div>

      {/* Input Section */}
      <div className="card">
        <div className="space-y-4">
          <label htmlFor="comic-prompt" className="block text-sm font-medium text-gray-700">
            Your "What If" Scenario
          </label>
          <textarea
            id="comic-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., What if Iron Man died in the first Avengers movie?"
            className="input-field min-h-[120px] resize-none"
            disabled={isGenerating}
          />
          
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                disabled={isGenerating}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
              >
                {example}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateComic}
            disabled={isGenerating || !prompt.trim()}
            className="btn-secondary w-full flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Comic...
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5 mr-2" />
                Generate Comic Story
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Generated Comic */}
      <AnimatePresence>
        {currentComic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Comic Story
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(currentComic.id)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      currentComic.isFavorite 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={currentComic.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(`${currentComic.prompt}\n\n${currentComic.content}`)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => downloadComic(currentComic)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Check out this "What If" comic!',
                          text: `${currentComic.prompt}\n\n${currentComic.content}`,
                        })
                      } else {
                        copyToClipboard(`${currentComic.prompt}\n\n${currentComic.content}`)
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Prompt:</p>
                <p className="text-gray-900 italic">"{currentComic.prompt}"</p>
              </div>

              {/* Page Navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-3 py-1 bg-white rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  
                  <span className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-2 px-3 py-1 bg-white rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Comic Content */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {pages[currentPage - 1] || currentComic.content}
                </ReactMarkdown>
              </div>

              <div className="text-sm text-gray-500 text-right">
                Generated on {currentComic.timestamp.toLocaleDateString()} at {currentComic.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previous Comics */}
      {comics.length > 1 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your Previous Comics
          </h3>
          <div className="space-y-4">
            {comics.slice(1).map((comic) => (
              <motion.div
                key={comic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      "{comic.prompt}"
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {comic.content.substring(0, 200)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {comic.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleFavorite(comic.id)}
                      className={`p-1 rounded transition-colors duration-200 ${
                        comic.isFavorite 
                          ? 'text-red-500' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={comic.isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentComic(comic)
                        setCurrentPage(1)
                      }}
                      className="text-secondary-600 hover:text-secondary-700 text-sm font-medium"
                    >
                      View Full
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 