import { useAppStore } from '../stores/appStore'
import { Home, LayoutDashboard, Upload, Info, MessageCircle } from 'lucide-react'
import { cn } from '../lib/utils'

export default function Navigation() {
  const { currentScreen, setCurrentScreen, isLoggedIn, user, toggleChat } = useAppStore()

  const NavLink = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setCurrentScreen(id)}
      className={cn(
        'hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-slate-200/90 transition-all',
        'hover:shadow-[0_0_20px_rgba(102,126,234,0.35)] hover:bg-white/5',
        currentScreen === id && 'bg-blue-500/20 shadow-[0_0_20px_rgba(102,126,234,0.55)]'
      )}
    >
      <Icon size={18} />
      {label}
    </button>
  )

  return (
    <div className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mt-4 h-16 w-full rounded-2xl border border-white/10 backdrop-blur-xl bg-[rgba(26,32,44,0.6)] flex items-center justify-between px-4 md:px-6">
          {/* Left - Logo */}
          <button onClick={() => setCurrentScreen('home')} className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#667EEA] to-[#F093FB] grid place-items-center font-bold text-white">M</span>
            <span className="text-xl font-semibold bg-gradient-to-br from-[#667EEA] to-[#F093FB] bg-clip-text text-transparent">MIMIQ</span>
          </button>

          {/* Center - Links */}
          <div className="flex items-center gap-2">
            <NavLink id="home" icon={Home} label="Home" />
            <NavLink id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavLink id="upload" icon={Upload} label="Upload Reports" />
            <NavLink id="about" icon={Info} label="About" />
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            <button onClick={toggleChat} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm bg-gradient-to-r from-[#667EEA] to-[#764BA2] shadow-[0_0_20px_rgba(102,126,234,0.5)] hover:shadow-[0_0_30px_rgba(102,126,234,0.7)] transition">
              <MessageCircle size={18} /> Chat with AI
            </button>

            {isLoggedIn ? (
              <div className="relative group">
                <div className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-white/90">
                  {(user?.name || 'U').slice(0,1).toUpperCase()}
                </div>
                <div className="absolute right-0 mt-2 hidden group-hover:block bg-[rgba(26,32,44,0.95)] border border-white/10 rounded-xl p-2 w-40">
                  <div className="px-3 py-2 text-slate-200/90 text-sm">{user?.name || 'User'}</div>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-200/80">Profile</button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-red-300/90">Logout</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setCurrentScreen('dashboard')} className="hidden md:inline-flex px-4 py-2 rounded-full text-sm text-slate-200/90 border border-white/10 hover:bg-white/5">Login</button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-4 inset-x-0 mx-auto w-[92%] md:hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-[rgba(26,32,44,0.7)] h-14 flex items-center justify-around">
        {[{id:'home',icon:Home},{id:'dashboard',icon:LayoutDashboard},{id:'upload',icon:Upload},{id:'about',icon:Info}].map(({id,icon:Icon}) => (
          <button key={id} onClick={() => setCurrentScreen(id)} className={cn('p-2 rounded-xl', currentScreen===id && 'bg-white/5')}> <Icon className="text-slate-200" size={22} /> </button>
        ))}
      </div>
    </div>
  )
}
