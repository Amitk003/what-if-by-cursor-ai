# What If Story Generator 🎬

An AI-powered platform for generating alternate storylines and "what if" scenarios using Google's Gemini AI. Transform your favorite stories with a simple prompt!

## ✨ Features

- **AI-Powered Story Generation**: Create unique alternate storylines using Google Gemini AI
- **Beautiful Modern UI**: Responsive design with smooth animations and intuitive interface
- **Story Management**: Save, favorite, and organize your generated stories
- **Export Options**: Download stories as text files or share them with others
- **Example Prompts**: Get inspired with curated example scenarios
- **Real-time Generation**: Watch as AI creates your story in real-time

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd what-if-story-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini AI API Key (optional for development)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

**Note**: The app works without an API key in development mode - it will use mock stories for testing.

## 🎯 Usage

1. **Enter a "What If" Scenario**: Type your creative prompt in the text area
2. **Choose from Examples**: Click on example prompts to get started quickly
3. **Generate Your Story**: Click the "Generate Story" button and watch AI work its magic
4. **Save & Share**: Favorite, copy, download, or share your generated stories

### Example Prompts

- "What if Iron Man died in the first Avengers movie?"
- "What if Harry Potter was sorted into Slytherin?"
- "What if Luke Skywalker joined the Dark Side?"
- "What if Romeo and Juliet survived?"
- "What if the dinosaurs never went extinct?"
- "What if time travel was discovered in 2024?"

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: Google Gemini AI
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Markdown**: React Markdown

## 📁 Project Structure

```
what-if-story-generator/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── StoryGenerator.tsx # Main story generator
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Styling

The app uses Tailwind CSS with custom components. You can customize:

- Colors in `tailwind.config.js`
- Component styles in `app/globals.css`
- Animations and transitions

### AI Prompts

Modify the story generation prompt in `app/api/generate-story/route.ts` to change how the AI creates stories.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- The Next.js team for the amazing framework
- The open-source community for the wonderful tools and libraries

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Made with ❤️ for storytellers everywhere** 