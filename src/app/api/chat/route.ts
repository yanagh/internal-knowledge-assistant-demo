import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const KNOWLEDGE_BASE = `# Company Overview

We are a mid-sized real estate company operating in Georgia.

We focus on:
- Residential apartments
- Commercial spaces
- Investment properties

Main markets:
- Tbilisi
- Batumi
- Kutaisi

Clients include:
- Individual buyers
- Investors
- Corporate tenants

The company works with both local and international clients.

---

# Sales Process

1. Initial client inquiry is received by a sales agent.
2. The agent qualifies the client and identifies needs.
3. Relevant properties are selected and shared with the client.
4. A presentation is prepared for the client.
5. Price negotiations may occur.
6. Final approval is required before signing any agreement.
7. Contract is signed by authorized management.

---

# Property Listing Rules

Every property presentation must include:
- Location
- Total area (square meters)
- Price
- Current status (available / reserved / sold)

Agents must NOT:
- Promise guaranteed returns
- Provide legal or tax advice
- Modify official floor plans

All descriptions should be factual and neutral.

---

# Pricing and Discounts Policy

Standard prices are approved by management.

Sales agents:
- CANNOT offer discounts independently
- MUST request approval for any price change

Discount approval:
- Up to 3%: Sales Manager approval
- Above 3%: Director approval

All approved discounts must be documented.

---

# Client Communication Guidelines

Response time:
- New inquiries: within 24 hours
- Existing clients: within 1 business day

Tone:
- Professional
- Clear
- Neutral
- No slang

Agents should avoid:
- Making informal promises
- Sharing internal information
- Discussing unapproved pricing

---

# Internal Roles and Responsibilities

Sales Agent:
- Communicates with clients
- Prepares property presentations

Sales Manager:
- Approves discounts up to 3%
- Reviews sales documents

Director:
- Approves major discounts
- Signs final agreements

Marketing Team:
- Prepares marketing materials
- Does not communicate pricing to clients`

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
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('API error:', message)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
