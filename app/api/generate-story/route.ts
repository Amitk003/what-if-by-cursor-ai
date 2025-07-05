import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  let prompt: string = ""
  
  try {
    const body = await request.json()
    prompt = body.prompt || ""

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // For development/testing, return a mock response if no API key
    if (!process.env.GEMINI_API_KEY) {
      console.log('No API key found, using mock story')
      const mockStory = generateMockStory(prompt)
      return NextResponse.json({ story: mockStory })
    }

    console.log('API key found, attempting to use Gemini AI')
    console.log('API key length:', process.env.GEMINI_API_KEY.length)

    // Initialize Gemini AI only if we have an API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    
    // Use only gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const storyPrompt = `You are a master storyteller creating viral "what if" scenarios. Write a SHORT, ENGAGING, and EYE-CATCHING alternate storyline based on: "${prompt}"

CRITICAL REQUIREMENTS:
- Keep it under 300 words (short and punchy)
- Use EMOTIONAL, DRAMATIC language that hooks readers immediately
- Create SHOCKING twists and unexpected consequences
- Use BOLD, ATTRACTIVE headings like "🔥 The Moment Everything Changed" or "💥 The Ripple Effect"
- Make it feel like a viral social media post or movie trailer
- Focus on the MOST DRAMATIC and INTERESTING aspects
- Use emojis and formatting to make it visually appealing
- End with a powerful, memorable conclusion

FORMAT EXAMPLE:
# 🎬 What If [Scenario]?

🔥 **The Moment Everything Changed**
[Dramatic opening]

💥 **The Ripple Effect** 
[Consequences & impact]

⚡ **The New Reality**
[How things are different]

🌟 **The Lesson**
[Powerful conclusion]

Make it feel like the most exciting movie trailer or viral TikTok story!`

    const result = await model.generateContent(storyPrompt)
    const response = await result.response
    const story = response.text()

    return NextResponse.json({ story })
  } catch (error) {
    console.error('Error generating story:', error)
    
    // Fallback to mock story if API fails
    const fallbackStory = generateMockStory(prompt || "an interesting scenario")
    
    return NextResponse.json({ story: fallbackStory })
  }
}

function generateMockStory(prompt: string): string {
  const mockStories = {
    'iron man': `# 🎬 What If Iron Man Died in the First Avengers Movie?

🔥 **The Moment Everything Changed**
The nuclear missile soared through the Chitauri portal, and Tony Stark's arc reactor flickered one final time. In that split second, the entire Marvel universe shifted on its axis. The genius, billionaire, playboy, philanthropist became the ultimate sacrifice.

💥 **The Ripple Effect**
Pepper Potts transformed Stark Industries into a memorial empire, while the Avengers crumbled without their technological backbone. Captain America became a broken leader, and the world lost its greatest defender. Ultron never existed, but neither did Vision - leaving Earth defenseless against the coming storm.

⚡ **The New Reality**
Thanos would have won the Infinity War easily. Without Iron Man's technology, the Avengers had no chance. But perhaps Peter Parker would have found a different mentor, or the world would have learned to rely on human courage rather than technological genius.

🌟 **The Lesson**
Sometimes the greatest heroes are those who teach us that sacrifice is the ultimate form of heroism.`,

    'harry potter': `# 🎬 What If Harry Potter Was Sorted Into Slytherin?

🔥 **The Moment Everything Changed**
The Sorting Hat's voice echoed through the Great Hall: "SLYTHERIN!" Gasps filled the air as Harry Potter, the Boy Who Lived, walked toward the emerald and silver table. In that instant, the entire wizarding world's expectations shattered.

💥 **The Ripple Effect**
Draco Malfoy became Harry's unexpected ally, while Ron and Hermione's friendship took a different path. Harry learned Slytherin's cunning and ambition, developing a strategic mind that would have made him an even more dangerous opponent to Voldemort. The house stereotypes crumbled as the wizarding world watched in shock.

⚡ **The New Reality**
Harry would have approached his battles with Voldemort using subtlety and strategy rather than brute force. He might have become a darker, more complex hero - one who understood both light and shadow. The final battle would have been a masterclass in cunning rather than courage.

🌟 **The Lesson**
True heroism isn't about which house you're in, but how you use your gifts to fight for what's right.`,

    'luke skywalker': `# 🎬 What If Luke Skywalker Joined the Dark Side?

🔥 **The Moment Everything Changed**
Luke's lightsaber ignited with a crimson blade as he accepted his father's offer. "Join me, and together we can rule the galaxy." In that moment, the last hope of the Jedi died, and the galaxy plunged into eternal darkness.

💥 **The Ripple Effect**
Princess Leia became the Rebellion's broken leader, while Han Solo faced impossible choices between love and loyalty. Darth Luke became the Empire's most terrifying weapon - a Jedi who knew all the Rebellion's secrets. The Millennium Falcon's missions failed without Luke's Force abilities.

⚡ **The New Reality**
Palpatine achieved his ultimate victory with both Vader and Luke under his control. The Empire ruled with an iron fist, crushing all resistance. Yet, even in darkness, Luke's love for his sister might have been the spark of redemption that could save the galaxy.

🌟 **The Lesson**
The path to darkness is paved with good intentions, but even the darkest souls can find their way back to the light.`
  }

  // Check if the prompt contains any of our mock story keywords
  const lowerPrompt = prompt.toLowerCase()
  
  if (lowerPrompt.includes('iron man') || lowerPrompt.includes('avengers')) {
    return mockStories['iron man']
  } else if (lowerPrompt.includes('harry potter') || lowerPrompt.includes('slytherin')) {
    return mockStories['harry potter']
  } else if (lowerPrompt.includes('luke skywalker') || lowerPrompt.includes('dark side')) {
    return mockStories['luke skywalker']
  }

  // Generic mock story for other prompts
  return `# 🎬 What If ${prompt}?

🔥 **The Moment Everything Changed**
In a single heartbeat, the universe shifted. This pivotal moment sent shockwaves through reality, transforming everything we thought we knew. The impossible became possible, and the ordinary became extraordinary.

💥 **The Ripple Effect**
The consequences were immediate and devastating. Relationships shattered, alliances crumbled, and the very fabric of existence trembled. What was once certain became uncertain, and what was impossible suddenly seemed inevitable.

⚡ **The New Reality**
In this brave new world, everything was different. The characters we knew had to adapt, evolve, and find new ways to survive. Some rose to the challenge, while others fell into darkness. The stakes were higher than ever before.

🌟 **The Lesson**
Sometimes the greatest stories are born from the moments when everything changes. It's not about what we lose, but what we discover about ourselves in the process.`
} 