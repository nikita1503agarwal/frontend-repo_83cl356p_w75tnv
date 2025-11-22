import Spline from '@splinetool/react-spline'

export default function HomeScreen() {
  return (
    <div className="pt-24 min-h-screen relative" style={{ backgroundColor: '#0A0E27' }}>
      {/* Spline cover */}
      <div className="absolute inset-0 h-[520px] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0E27]/40 to-[#0A0E27] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="pt-16 pb-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
            Emergency
            <span className="block bg-gradient-to-r from-[#667EEA] to-[#F093FB] bg-clip-text text-transparent">Medical AI</span>
            Assessment
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl">Get instant medical assessment from AI specialists. Powered by Google Gemini and 6 specialized agents.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[#667EEA] to-[#764BA2] shadow-[0_0_20px_rgba(102,126,234,0.5)]">Start Assessment</button>
            <button className="px-6 py-3 rounded-xl text-slate-200 border border-white/10 bg-white/5">View Dashboard</button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid md:grid-cols-3 gap-4 mt-6">
          {[{label:'Accuracy',value:'99.2% 🎯'},{label:'Response',value:'<1s ⚡'},{label:'Availability',value:'24/7 🌍'}].map((s,i)=> (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-[0_0_25px_rgba(102,126,234,0.4)] transition">
              <div className="text-3xl font-semibold bg-gradient-to-r from-[#667EEA] to-[#F093FB] bg-clip-text text-transparent">{s.value}</div>
              <div className="text-slate-300/80 mt-1">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-2 gap-4 mt-8">
          {[
            {icon:'🧠',title:'AI-Powered Diagnosis',desc:'6 specialist AI agents analyze your symptoms in real-time'},
            {icon:'🛡️',title:'Emergency Detection',desc:'Instant triage and urgency assessment to save lives'},
            {icon:'⚡',title:'Real-Time Monitoring',desc:'Predicts emergencies 30-60 minutes before they happen'},
            {icon:'👥',title:'Patient-Friendly',desc:'Simple, empathetic language - no medical jargon'},
          ].map((f,i)=> (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-[0_0_25px_rgba(102,126,234,0.4)] transition">
              <div className="text-4xl">{f.icon}</div>
              <div className="mt-3 text-xl font-semibold text-white">{f.title}</div>
              <div className="text-slate-300/90">{f.desc}</div>
            </div>
          ))}
        </section>

        <section className="py-12 text-slate-300">Trusted by healthcare providers worldwide 🏥 ⚕ 🔬 💊 🩺</section>
      </div>
    </div>
  )
}
