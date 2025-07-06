'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toISOString().split('T')[0]}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and understand how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Performance Cookies:</strong> Help us improve website performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preference Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                We may use third-party services that place cookies on your device. These services include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Google Gemini AI for story generation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
              <p className="text-gray-600 mb-4">
                You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
              </p>
              <p className="text-gray-600 mb-4">
                Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>See what cookies you have and delete them on an individual basis</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from particular sites</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Updates to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about our Cookie Policy, please contact us at:{' '}
                <a href="mailto:amit.work017@outlook.com" className="text-primary-600 hover:text-primary-700">
                  amit.work017@outlook.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 