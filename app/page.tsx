'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wand2, BookOpen, Share2, Heart, Download } from 'lucide-react'
import StoryGenerator from '@/components/StoryGenerator'
import ComicGenerator from '@/components/ComicGenerator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false)
  const [storyType, setStoryType] = useState<'short' | 'comic'>('short')

  const features = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Viral Short Stories",
      description: "Create eye-catching, shareable stories perfect for social media"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Full Comic Stories",
      description: "Generate complete comic book stories with multiple pages and dialogue"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Share & Collaborate",
      description: "Share your favorite alternate plots with the community"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Save Favorites",
      description: "Build your collection of amazing what-if scenarios"
    }
  ]

  const examples = [
    "What if Iron Man died in the first Avengers movie?",
    "What if Harry Potter was sorted into Slytherin?",
    "What if Luke Skywalker joined the Dark Side?",
    "What if Romeo and Juliet survived?",
    "What if the dinosaurs never went extinct?",
    "What if time travel was discovered in 2024?"
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="absolute inset-0 bg-primary-50/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-primary-600 mr-3" />
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                What If
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore infinite possibilities with AI-generated alternate storylines. 
              Transform your favorite stories with a simple "what if" prompt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStoryType('short')
                  setShowGenerator(true)
                }}
                className="btn-primary text-lg px-8 py-4"
              >
                <Wand2 className="w-5 h-5 mr-2 inline" />
                Create Short Story
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStoryType('comic')
                  setShowGenerator(true)
                }}
                className="btn-secondary text-lg px-8 py-4"
              >
                <BookOpen className="w-5 h-5 mr-2 inline" />
                Create Full Comic
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Generator Section */}
      <section id="generate" className="py-16 bg-white">
        {showGenerator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {storyType === 'short' ? <StoryGenerator /> : <ComicGenerator />}
                      </div>
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose What If?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with creative storytelling to bring your wildest "what if" scenarios to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Inspired
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Try these example prompts to see the magic in action
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card cursor-pointer hover:bg-primary-50 transition-colors duration-200"
                onClick={() => {
                  setStoryType('short')
                  setShowGenerator(true)
                  // Scroll to generator section
                  setTimeout(() => {
                    const element = document.getElementById('generate')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
              >
                <p className="text-gray-700 font-medium">
                  "{example}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About What If Story Generator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passion project created to explore the infinite possibilities of storytelling through AI-powered "what if" scenarios.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6">
                We believe that every story has infinite variations. By combining the power of AI with human creativity, 
                we're unlocking new ways to explore alternate realities and inspire storytellers everywhere.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're a writer looking for inspiration, a fan exploring your favorite universes, 
                or just someone who loves a good "what if" scenario, our platform is designed for you.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Amitk003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="mailto:wowamitk45125@gmail.com"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Built with ❤️ by Amit Kumar
                </h4>
                <p className="text-gray-600 mb-4">
                  Full-stack developer passionate about AI and storytelling
                </p>
                <div className="flex justify-center space-x-4">
                  <span className="px-3 py-1 bg-primary-200 text-primary-800 rounded-full text-sm font-medium">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-secondary-200 text-secondary-800 rounded-full text-sm font-medium">
                    AI
                  </span>
                  <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">
                    Storytelling
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Currently offering all features completely free. No hidden costs, no subscriptions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="card text-center border-2 border-primary-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  FREE FOREVER
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Plan</h3>
              <div className="text-4xl font-bold text-primary-600 mb-6">
                $0
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited short stories
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited comic stories
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Download & share stories
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No ads or limitations
                </li>
              </ul>
              
              <button 
                className="btn-primary w-full"
                onClick={() => {
                  setStoryType('short')
                  setShowGenerator(true)
                  const element = document.getElementById('generate')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Start Creating Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Section */}
      <section id="help" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help you create amazing stories. Get in touch with us anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get help via email</p>
              <a
                href="mailto:wowamitk45125@gmail.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                wowamitk45125@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600 mb-4">View the source code</p>
              <a
                href="https://github.com/Amitk003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-secondary-700 font-medium"
              >
                github.com/Amitk003
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQ</h3>
              <p className="text-gray-600 mb-4">Common questions</p>
              <button 
                className="text-gray-600 hover:text-gray-700 font-medium"
                onClick={() => {
                  const element = document.getElementById('faq')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View FAQ
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about What If Story Generator
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                question: "How does the story generation work?",
                answer: "Our platform uses Google's Gemini AI to analyze your 'what if' prompts and generate creative alternate storylines. The AI understands context and creates engaging, coherent narratives based on your input."
              },
              {
                question: "What types of stories can I generate?",
                answer: "You can generate both short viral-style stories and full-length comic-style stories with multiple pages. Both formats are designed to be engaging and easy to read."
              },
              {
                question: "Is this service really free?",
                answer: "Yes! Currently, all features are completely free. You can generate unlimited stories without any cost or limitations."
              },
              {
                question: "Can I download or share my generated stories?",
                answer: "Absolutely! You can copy the generated stories and share them anywhere. The stories are yours to use as you please."
              },
              {
                question: "What if I don't have an API key?",
                answer: "No worries! If you don't have a Google Gemini API key, the system will generate mock stories that demonstrate the platform's capabilities."
              },
              {
                question: "How do I get a Google Gemini API key?",
                answer: "You can get a free API key from Google AI Studio (https://aistudio.google.com/). Simply sign up and create a new API key to unlock full AI-powered story generation."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 