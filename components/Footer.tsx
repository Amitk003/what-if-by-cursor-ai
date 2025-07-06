'use client'

import { motion } from 'framer-motion'
import { Sparkles, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Generate Stories', href: '#generate' },
      { name: 'Examples', href: '#examples' },
      { name: 'Pricing', href: '#pricing' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Contact', href: 'mailto:amit.work017@outlook.com' },
    ],
    support: [
      { name: 'Help Center', href: '#help' },
              { name: 'Email Support', href: 'mailto:amit.work017@outlook.com' },
      { name: 'GitHub', href: 'https://github.com/Amitk003' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
      { name: 'Disclaimer', href: '/legal/disclaimer' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Amitk003' },
    { name: 'Email', icon: Mail, href: 'mailto:amit.work017@outlook.com' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 mb-4"
            >
              <Sparkles className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold">What If</span>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-md">
              Explore infinite possibilities with AI-generated alternate storylines. 
              Transform your favorite stories with a simple "what if" prompt.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    target={link.href.startsWith('http') || link.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    target={link.href.startsWith('http') || link.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    target={link.href.startsWith('http') || link.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    target={link.href.startsWith('http') || link.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} What If Story Generator. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Powered by AI • Built with ❤️ for storytellers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 