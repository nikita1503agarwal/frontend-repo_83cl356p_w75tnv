import { useEffect, useMemo, useRef, useState } from 'react'
import { X, Mic, Send } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import { sendChatMessage } from '../services/api'
import { genId } from '../stores/appStore'

export default function ChatBot() {
  const { isChatOpen, toggleChat, messages, addMessage, patientId } = useAppStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  async function handleSend() {
    if (!input.trim()) return
    const content = input.trim()
    setInput('')
    addMessage({ id: genId('msg'), role: 'user', content })
    setLoading(true)
    const res = await sendChatMessage(patientId, content)
    if (res?.response) {
      addMessage({ role: 'assistant', content: res.response })
    } else {
      addMessage({ role: 'assistant', content: 'Sorry, something went wrong. Please try again.' })
    }
    setLoading(false)
  }

  if (!isChatOpen) return null

  return (
    <div className="fixed right-5 bottom-5 z-50 w-[400px] h-[600px] md:w-[400px] md:h-[600px] sm:w-full sm:h-[100vh] sm:right-0 sm:bottom-0">
      <div className="w-full h-full rounded-2xl border border-white/10 backdrop-blur-2xl bg-[rgba(26,32,44,0.7)] shadow-[0_0_30px_rgba(102,126,234,0.5)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-t-2xl">
          <div className="flex items-center gap-3 text-white">
            <span className="text-xl">🤖</span>
            <div className="leading-tight">
              <div className="font-semibold">MIMIQ AI Assistant</div>
              <div className="text-xs text-white/80">Online • Always here to help</div>
            </div>
          </div>
          <button onClick={toggleChat} className="p-2 rounded-lg hover:bg-white/20 text-white"><X size={18} /></button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => (
            <div key={m.id} className={m.role==='user' ? 'text-right' : 'text-left'}>
              <div className={m.role==='user' ? 'inline-block max-w-[80%] px-4 py-2 rounded-2xl bg-gradient-to-r from-[#667EEA] to-[#F093FB] text-white' : 'inline-block max-w-[80%] px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-200'}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-200">
                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:300ms]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button onClick={() => setListening(!listening)} className={"p-2 rounded-xl border border-white/10 " + (listening ? 'bg-red-500/20 text-red-300' : 'bg-white/5 text-slate-200') }>
              <Mic size={18} />
            </button>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-400 outline-none" />
            <button onClick={handleSend} disabled={!input.trim() || loading} className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[#667EEA] to-[#764BA2] disabled:opacity-60">
              <Send size={18} />
            </button>
          </div>
          {listening && (
            <div className="mt-3 flex items-end gap-1 h-8">
              {[...Array(5)].map((_,i)=> (
                <span key={i} className="w-1.5 bg-gradient-to-b from-[#F093FB] to-[#667EEA] rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ height: `${8 + (i%3)*8}px`, animationDelay: `${i*0.1}s` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
