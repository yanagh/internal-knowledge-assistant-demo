'use client'

import { useState, FormEvent } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'An error occurred. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col max-w-2xl mx-auto p-4">
      <header className="py-6 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Internal Knowledge Assistant</h1>
        <p className="text-sm text-gray-500 mt-1">Ask questions about company policies and procedures</p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>Ask a question to get started</p>
            <p className="text-sm mt-2">Example: "What is the discount approval process?"</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-50 text-gray-800 ml-8'
                : 'bg-white border border-gray-200 mr-8'
            }`}
          >
            <p className="text-xs font-medium text-gray-500 mb-1">
              {msg.role === 'user' ? 'You' : 'Assistant'}
            </p>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}

        {loading && (
          <div className="bg-white border border-gray-200 p-4 rounded-lg mr-8">
            <p className="text-xs font-medium text-gray-500 mb-1">Assistant</p>
            <p className="text-gray-400">Searching knowledge base...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-200 pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </main>
  )
}
