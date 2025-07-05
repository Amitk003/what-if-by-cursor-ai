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
      console.log('No API key found, using mock comic story')
      const mockComic = generateMockComic(prompt)
      return NextResponse.json({ comic: mockComic })
    }

    console.log('API key found, generating comic story')
    
    // Initialize Gemini AI only if we have an API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const comicPrompt = `You are a master comic book writer and artist. Create a FULL-LENGTH COMIC STORY based on this "what if" scenario: "${prompt}"

CRITICAL REQUIREMENTS:
- Create a 6-8 page comic story with detailed panels
- Use simple, human-friendly English that anyone can understand
- Make it feel like a real comic book with dialogue, action, and emotion
- Each page should have 3-4 panels with clear descriptions
- Include character dialogue in speech bubbles
- Add dramatic narration boxes for storytelling
- Make it engaging and easy to follow
- Focus on visual storytelling and emotional impact

FORMAT EACH PAGE LIKE THIS:
## Page 1: [Page Title]
**Panel 1:** [Visual description of what we see]
*Narration:* [Storytelling text]
*Character:* "Dialogue here"

**Panel 2:** [Visual description]
*Character:* "More dialogue"

**Panel 3:** [Visual description]
*Narration:* [Storytelling text]

Continue this format for 6-8 pages, making each page flow into the next. Make it feel like a real comic book that people would love to read!`

    const result = await model.generateContent(comicPrompt)
    const response = await result.response
    const comic = response.text()

    return NextResponse.json({ comic })
  } catch (error: any) {
    console.error('Error generating comic:', error)
    
    // Fallback to mock comic if API fails
    const fallbackComic = generateMockComic(prompt || "an interesting scenario")
    
    return NextResponse.json({ comic: fallbackComic })
  }
}

function generateMockComic(prompt: string): string {
  const mockComics = {
    'iron man': `# 🎬 What If Iron Man Died in the First Avengers Movie?

## Page 1: The Final Sacrifice
**Panel 1:** Tony Stark in his Iron Man suit, flying toward the Chitauri portal with a nuclear missile. His arc reactor is flickering dangerously.
*Narration:* "In the skies above New York, Tony Stark made the ultimate choice..."
*Tony:* "Jarvis, divert all power to the thrusters!"

**Panel 2:** The missile explodes inside the portal, creating a massive light show. The portal begins to collapse.
*Narration:* "The explosion was beautiful and terrible all at once."

**Panel 3:** Iron Man's suit falling from the sky, the arc reactor completely dark.
*Narration:* "And just like that, Earth's greatest defender was gone."

## Page 2: The Aftermath
**Panel 1:** The Avengers gathered around Tony's empty suit, their faces filled with shock and grief.
*Captain America:* "We could have done more... we should have done more."

**Panel 2:** Pepper Potts collapsing to her knees, tears streaming down her face.
*Pepper:* "Tony... no... please, no..."

**Panel 3:** Thor looking up at the sky, his hammer hanging limply at his side.
*Thor:* "Even gods can feel the weight of mortal loss."

## Page 3: A World Without Iron Man
**Panel 1:** Stark Industries headquarters, now with a memorial wall dedicated to Tony.
*Narration:* "The world tried to move on, but Tony's absence was felt everywhere."

**Panel 2:** The Avengers in a much smaller, less advanced headquarters.
*Captain America:* "We have to adapt. We can't rely on technology anymore."

**Panel 3:** A young Peter Parker looking at an old Iron Man poster on his wall.
*Peter:* "I wish I could have met him... learned from him..."

## Page 4: The New Threats
**Panel 1:** Ultron never being created - the Avengers fighting a different enemy.
*Narration:* "Without Tony's genius, some threats never emerged... but others became stronger."

**Panel 2:** The Avengers struggling against a powerful enemy without their usual tech support.
*Black Widow:* "We're fighting with one hand tied behind our backs!"

**Panel 3:** Thanos appearing in the distance, his army much larger than before.
*Thanos:* "Without their technological edge, they are nothing."

## Page 5: The Legacy Lives On
**Panel 1:** Peter Parker creating his own suit, inspired by Tony's legacy.
*Peter:* "I may not be Iron Man, but I can still be a hero."

**Panel 2:** The Avengers learning to fight as a team without relying on technology.
*Captain America:* "Sometimes the greatest strength comes from within."

**Panel 3:** A new generation of heroes rising up, inspired by Tony's sacrifice.
*Narration:* "Tony Stark may be gone, but his legacy will live forever."

## Page 6: The Lesson
**Panel 1:** A beautiful sunset over New York, with Iron Man's silhouette in the clouds.
*Narration:* "The greatest heroes are those who teach us that sacrifice is the ultimate form of heroism."

**Panel 2:** The Avengers standing together, stronger than ever.
*Captain America:* "We honor Tony by being the heroes he knew we could be."

**Panel 3:** The words "Tony Stark was here" written on a wall, with a small arc reactor design.
*Narration:* "And somewhere in the multiverse, Tony Stark is still fighting the good fight."`,

    'harry potter': `# 🎬 What If Harry Potter Was Sorted Into Slytherin?

## Page 1: The Sorting Ceremony
**Panel 1:** The Great Hall, filled with students. The Sorting Hat is on Harry's head, and everyone is watching intently.
*Narration:* "The moment that would change everything..."

**Panel 2:** The Sorting Hat's mouth opening wide.
*Sorting Hat:* "SLYTHERIN!"

**Panel 3:** Gasps from the crowd. Harry looks confused as he walks toward the Slytherin table.
*Narration:* "The Boy Who Lived... in Slytherin?"

## Page 2: The Slytherin Welcome
**Panel 1:** Harry sitting at the Slytherin table, surrounded by curious and suspicious faces.
*Draco:* "Well, well... the famous Harry Potter. Welcome to the house of ambition."

**Panel 2:** Harry looking around at the green and silver decorations, feeling out of place.
*Harry:* "This... this wasn't what I expected."

**Panel 3:** Ron and Hermione looking over from the Gryffindor table, confusion on their faces.
*Ron:* "Harry? In Slytherin? How is that possible?"

## Page 3: Learning New Ways
**Panel 1:** Harry in Slytherin common room, studying with other Slytherins.
*Narration:* "Harry began to learn what it meant to be a Slytherin."

**Panel 2:** Harry practicing spells with a more strategic approach.
*Harry:* "Maybe there's more to magic than just bravery..."

**Panel 3:** Harry forming friendships with other Slytherins, including some unexpected allies.
*Slytherin Student:* "You're not what we expected, Potter."

## Page 4: The Darker Path
**Panel 1:** Harry being tempted by power and prestige, the Slytherin influence growing.
*Narration:* "The house of ambition began to shape Harry in unexpected ways."

**Panel 2:** Harry using more cunning and strategy in his conflicts with Voldemort.
*Harry:* "Sometimes the best attack is the one they don't see coming."

**Panel 3:** Voldemort looking surprised as Harry outsmarts him with Slytherin tactics.
*Voldemort:* "You fight like a Slytherin... interesting."

## Page 5: The True Hero
**Panel 1:** Harry standing between light and darkness, his Slytherin cunning and his inherent goodness at war.
*Narration:* "But Harry's heart remained true, even as his methods changed."

**Panel 2:** Harry using Slytherin strategy to defeat Voldemort in a final battle.
*Harry:* "I may be a Slytherin, but I fight for what's right!"

**Panel 3:** The wizarding world celebrating, with Harry wearing Slytherin colors proudly.
*Narration:* "Harry Potter proved that greatness can come from any house."

## Page 6: A New Legacy
**Panel 1:** Future students being sorted, with Harry's story inspiring them.
*Narration:* "Harry's journey changed how the wizarding world saw Slytherin."

**Panel 2:** Harry as an adult, teaching that house affiliation doesn't determine character.
*Harry:* "It's not about which house you're in, but how you use your gifts."

**Panel 3:** A new generation of Slytherins, proud and heroic.
*Narration:* "And so, the legacy of Harry Potter, the Slytherin hero, lived on."`
  }

  // Check if the prompt contains any of our mock comic keywords
  const lowerPrompt = prompt.toLowerCase()
  
  if (lowerPrompt.includes('iron man') || lowerPrompt.includes('avengers')) {
    return mockComics['iron man']
  } else if (lowerPrompt.includes('harry potter') || lowerPrompt.includes('slytherin')) {
    return mockComics['harry potter']
  }

  // Generic mock comic for other prompts
  return `# 🎬 What If ${prompt}?

## Page 1: The Moment of Change
**Panel 1:** A dramatic scene showing the pivotal moment when everything changes.
*Narration:* "In a single heartbeat, the universe shifted forever."

**Panel 2:** Characters reacting to the change, their faces filled with shock and confusion.
*Character:* "What just happened?"

**Panel 3:** The world beginning to transform around them.
*Narration:* "Nothing would ever be the same again."

## Page 2: The Ripple Effect
**Panel 1:** The consequences of the change spreading like waves.
*Narration:* "The effects were immediate and devastating."

**Panel 2:** Relationships being tested and alliances crumbling.
*Character:* "I don't know who to trust anymore!"

**Panel 3:** New challenges emerging that no one expected.
*Narration:* "Every choice had consequences."

## Page 3: Adaptation
**Panel 1:** Characters learning to survive in the new reality.
*Character:* "We have to adapt or we won't survive."

**Panel 2:** New alliances forming in unexpected places.
*Character:* "Sometimes enemies become friends."

**Panel 3:** The characters growing stronger through adversity.
*Narration:* "In crisis, true character is revealed."

## Page 4: The New Reality
**Panel 1:** The world transformed, showing how different everything has become.
*Narration:* "This was the new normal."

**Panel 2:** Characters finding new ways to achieve their goals.
*Character:* "We can't go back, so we move forward."

**Panel 3:** Unexpected heroes emerging from the chaos.
*Narration:* "New leaders rose from the ashes."

## Page 5: The Climax
**Panel 1:** A final confrontation or challenge that tests everything.
*Character:* "This is it. Everything we've been through leads to this moment."

**Panel 2:** The characters using everything they've learned to overcome the challenge.
*Character:* "Together, we can do this!"

**Panel 3:** Victory achieved through teamwork and determination.
*Narration:* "Sometimes the greatest victories come from the darkest times."

## Page 6: The Lesson
**Panel 1:** Characters reflecting on their journey and what they've learned.
*Character:* "We may have lost everything, but we gained something more valuable."

**Panel 2:** A hopeful future beginning to emerge from the chaos.
*Narration:* "The world was different, but perhaps it was better."

**Panel 3:** The characters looking toward the future with hope and determination.
*Narration:* "For in every ending, there is also a beginning."`
} 