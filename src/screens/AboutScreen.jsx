export default function AboutScreen() {
  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-white">About <span className="bg-gradient-to-r from-[#667EEA] to-[#F093FB] bg-clip-text text-transparent">MIMIQ</span></h2>
      <p className="text-slate-300/90 mt-2 max-w-3xl">Medical Intelligence Multi-agent Inquiry Quest - An AI-powered real-time health monitoring and prevention system that saves lives by predicting emergencies before they become critical.</p>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {[{v:'99.2% Diagnostic Accuracy',e:'🏆'},{v:'<1s Response Time',e:'🏃‍♂️'},{v:'24/7 Always Available',e:'🌐'},{v:'100K+ Lives Saved',e:'❤️'}].map((s,i)=>(
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
            <div className="text-3xl">{s.e}</div>
            <div className="mt-2 text-xl font-semibold bg-gradient-to-r from-[#667EEA] to-[#F093FB] bg-clip-text text-transparent">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {[
          {icon:'🧠',title:'6 AI Specialists'},{icon:'⚡',title:'Real-Time Prediction'},{icon:'🛡️',title:'Emergency Triage'},{icon:'👥',title:'Patient-Friendly'}
        ].map((f,i)=>(
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-2xl">{f.icon}</div>
            <div className="text-white font-semibold mt-2">{f.title}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          {t:'🚨 Safety Monitor',d:'Emergency Detection'},
          {t:'❤ Cardiologist',d:'Heart Specialist'},
          {t:'🫁 Pulmonologist',d:'Lung Specialist'},
          {t:'🔬 Gastroenterologist',d:'Digestive System'},
          {t:'🦴 MSK Specialist',d:'Bones & Muscles'},
          {t:'🎯 Triage Agent',d:'Priority Assessment'},
        ].map((a,i)=>(
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-xl text-white font-semibold">{a.t}</div>
            <div className="text-slate-300">{a.d}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {['🧠 Google Gemini','⚡ Real-Time ML','🔒 HIPAA Compliant','📱 Smartphone Sensors'].map((t,i)=>(
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center text-slate-200">{t}</div>
        ))}
      </div>

      <div className="mt-10 text-center text-slate-200">
        <p className="max-w-3xl mx-auto">Built with care for global impact. We are always improving to save more lives and deliver compassionate, accurate guidance.</p>
        <div className="mt-3 text-xl">💙 Built with Care | 🌍 Global Impact | 🚀 Always Improving</div>
      </div>
    </div>
  )
}
