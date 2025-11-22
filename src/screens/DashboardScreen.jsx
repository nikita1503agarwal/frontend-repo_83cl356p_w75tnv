import { Activity, Brain, Clock, Heart, TrendingUp } from 'lucide-react'
import { useAppStore } from '../stores/appStore'

export default function DashboardScreen() {
  const { messages } = useAppStore()
  const lastFive = messages.slice(-5)

  const StatCard = ({ icon:Icon, color, label, value }) => (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl grid place-items-center text-white`} style={{ background: `linear-gradient(135deg, ${color[0]}, ${color[1]})` }}>
          <Icon size={20} />
        </div>
        <TrendingUp className="text-emerald-300" size={18} />
      </div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      <div className="text-slate-300/80">{label}</div>
    </div>
  )

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      <div>
        <h2 className="text-3xl font-semibold text-white">Welcome back, Alex! 👋</h2>
        <p className="text-slate-300/90">Here's your health overview and recent activity</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard icon={Activity} color={["#10B981","#34D399"]} label="Health Score" value="92%" />
        <StatCard icon={Heart} color={["#EF4444","#F97316"]} label="Heart Rate" value="72 bpm" />
        <StatCard icon={Brain} color={["#764BA2","#667EEA"]} label="Stress Level" value="Low" />
        <StatCard icon={Clock} color={["#3B82F6","#60A5FA"]} label="Last Check" value="2h ago" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {/* Chat Preview */}
        <div className="md:col-span-2 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">AI Chat Assistant</h3>
            <button className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-[#667EEA] to-[#764BA2]">Open Full Chat</button>
          </div>
          <div className="mt-4 space-y-3">
            {lastFive.map(m => (
              <div key={m.id} className={m.role==='user' ? 'text-right' : 'text-left'}>
                <div className={m.role==='user' ? 'inline-block max-w-[80%] px-4 py-2 rounded-2xl bg-gradient-to-r from-[#667EEA] to-[#F093FB] text-white' : 'inline-block max-w-[80%] px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-200'}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <button className="px-3 py-2 rounded-lg border border-white/10 text-slate-200 hover:bg-white/5">Start New Conversation</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h3 className="text-white font-semibold">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            {[{icon:'💬',text:'Chat session with MIMIQ',time:'1h ago'},{icon:'🔬',text:'AI analysis completed',time:'2h ago'},{icon:'📄',text:'Report downloaded',time:'Yesterday'}].map((t,i)=>(
              <div key={i} className="flex items-start gap-3">
                <div className="text-xl">{t.icon}</div>
                <div>
                  <div className="text-slate-200">{t.text}</div>
                  <div className="text-slate-400 text-sm">{t.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[{icon:'🏃‍♂️',label:'Run Health Check'},{icon:'🧠',label:'View AI Insights'},{icon:'🚨',label:'Emergency Help'}].map((q,i)=>(
          <button key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-left hover:shadow-[0_0_25px_rgba(102,126,234,0.4)]">
            <div className="text-2xl">{q.icon}</div>
            <div className="text-white font-semibold">{q.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
