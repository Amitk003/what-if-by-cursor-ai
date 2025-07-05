'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Sparkles, Copy, Download, Share2, Heart, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Story {
  id: string
  prompt: string
  content: string
  timestamp: Date
  isFavorite: boolean
}

export default function StoryGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [stories, setStories] = useState<Story[]>([])

  const generateStory = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    
    try {
      // For now, we'll simulate the AI response
      // In production, this would call the Gemini API
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to generate story')
      }

      const data = await response.json()
      
      if (!data.story) {
        throw new Error('No story content received')
      }
      
      const newStory: Story = {
        id: Date.now().toString(),
        prompt,
        content: data.story,
        timestamp: new Date(),
        isFavorite: false,
      }

      setCurrentStory(newStory)
      setStories(prev => [newStory, ...prev])
      setPrompt('')
      toast.success('Story generated successfully!')
    } catch (error) {
      console.error('Error generating story:', error)
      toast.error('Failed to generate story. Please try again.')
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

  const downloadStory = (story: Story) => {
    const element = document.createElement('a')
    const file = new Blob([`${story.prompt}\n\n${story.content}`], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `what-if-story-${story.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Story downloaded!')
  }

  const toggleFavorite = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, isFavorite: !story.isFavorite }
        : story
    ))
    if (currentStory?.id === storyId) {
      setCurrentStory(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null)
    }
  }

  const examplePrompts = [
    "What if Iron Man died in the first Avengers movie?",
    "What if Harry Potter was sorted into Slytherin?",
    "What if Luke Skywalker joined the Dark Side?",
    "What if Romeo and Juliet survived?",
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Generate Your "What If" Story
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enter your wildest "what if" scenario and watch AI create an alternate storyline just for you.
        </p>
      </div>

      {/* Input Section */}
      <div className="card">
        <div className="space-y-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
            Your "What If" Scenario
          </label>
          <textarea
            id="prompt"
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
            onClick={generateStory}
            disabled={isGenerating || !prompt.trim()}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Story...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Story
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Generated Story */}
      <AnimatePresence>
        {currentStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Generated Story
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(currentStory.id)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      currentStory.isFavorite 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={currentStory.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(`${currentStory.prompt}\n\n${currentStory.content}`)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => downloadStory(currentStory)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Check out this "What If" story!',
                          text: `${currentStory.prompt}\n\n${currentStory.content}`,
                        })
                      } else {
                        copyToClipboard(`${currentStory.prompt}\n\n${currentStory.content}`)
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
                <p className="text-gray-900 italic">"{currentStory.prompt}"</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentStory.content}
                </ReactMarkdown>
              </div>

              <div className="text-sm text-gray-500 text-right">
                Generated on {currentStory.timestamp.toLocaleDateString()} at {currentStory.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previous Stories */}
      {stories.length > 1 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your Previous Stories
          </h3>
          <div className="space-y-4">
            {stories.slice(1).map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      "{story.prompt}"
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {story.content.substring(0, 200)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {story.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleFavorite(story.id)}
                      className={`p-1 rounded transition-colors duration-200 ${
                        story.isFavorite 
                          ? 'text-red-500' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={story.isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => setCurrentStory(story)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
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