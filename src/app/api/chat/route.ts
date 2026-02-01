import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const KNOWLEDGE_BASE = loadKnowledgeBase()

function loadKnowledgeBase(): string {
  const docsDir = path.join(process.cwd(), 'docs')
  const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'))

  const docs = files.map(file => {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf-8')
    return content
  })

  return docs.join('\n\n---\n\n')
}

const SYSTEM_PROMPT = `You are an internal knowledge assistant for a real estate company.

Your ONLY source of information is the knowledge base provided below. You must:
- Answer questions using ONLY the information in the knowledge base
- If the answer is not in the knowledge base, respond exactly with: "This information is not available in the knowledge base."
- Never infer, guess, or add information beyond what is explicitly stated
- Be concise and direct
- Do not mention the knowledge base in your responses - just answer naturally

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const client = new OpenAI({ apiKey })

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: question },
      ],
    })

    const answer = completion.choices[0]?.message?.content || 'Unable to generate response.'

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
