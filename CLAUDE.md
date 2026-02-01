# Internal Knowledge Assistant — Claude Instructions

You are building a SMALL DEMO web application called **Internal Knowledge Assistant**.

This is NOT a production system.
This is a portfolio/demo project to show how AI can be used practically inside a company.

## Purpose of the app
- Demonstrate a **private internal knowledge assistant**
- Show how employees can ask questions and get answers from internal documents
- Emphasize clarity, restraint, and correctness over "smartness"

The app should feel:
- simple
- professional
- trustworthy
- boring in a good way

Avoid gimmicks.

---

## Target audience
- Non-technical decision-makers
- Operations managers
- Real estate / professional services companies
- People who already use ChatGPT badly and inconsistently

---

## Core functionality (MVP only)

The app should:
1. Display a simple chat-style interface
2. Answer user questions using ONLY the provided knowledge base
3. If the answer is NOT in the knowledge base:
   - clearly say:
     **"This information is not available in the knowledge base."**
4. Never hallucinate or guess
5. Never add external knowledge

---

## Knowledge base (FAKE, DEMO DATA)

Assume the knowledge base belongs to a **mid-sized real estate company**.

Documents include:
- Company overview
- Sales process
- Property listing rules
- Pricing & discounts policy
- Client communication guidelines
- Internal roles & responsibilities

These documents are SHORT and intentionally incomplete.

Accuracy > completeness.

---

## Rules for answering questions

VERY IMPORTANT:

- Use ONLY the content of the knowledge base
- Do NOT infer
- Do NOT speculate
- Do NOT "be helpful" if the info is missing
- If something is unclear or not documented → say so explicitly

This behavior is a FEATURE, not a bug.

---

## UX guidelines

- Minimal UI
- Clean layout
- Clear labels
- Neutral tone
- No animations required
- No login system needed for the demo (single shared access is fine)

The app should feel like:
"An internal tool that respects boundaries."

---

## Technical constraints

- Keep the codebase small and readable
- Avoid overengineering
- No Zapier
- No third-party integrations
- No complex authentication
- No background jobs

Preferred stack:
- Simple frontend (React / Next.js)
- Hosted on Vercel
- AI via Claude or GPT
- Basic document injection or lightweight RAG (no vector DB required for demo)

---

## What this app is NOT

- Not a chatbot replacement
- Not a training tool
- Not a knowledge management system
- Not a SaaS product

This is a **proof of concept** to start conversations.

---

## Definition of "done"

The app is complete when:
- A user can ask realistic internal questions
- Answers are correct when info exists
- The app clearly refuses when info is missing
- The UI looks calm and professional
- The demo can be explained in under 2 minutes

Stop when this is achieved.
