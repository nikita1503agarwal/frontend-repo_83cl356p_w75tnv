import { useAppStore } from './stores/appStore'
import Navigation from './components/Navigation'
import ChatBot from './components/ChatBot'
import HomeScreen from './screens/HomeScreen'
import DashboardScreen from './screens/DashboardScreen'
import UploadScreen from './screens/UploadScreen'
import AboutScreen from './screens/AboutScreen'

function App() {
  const { currentScreen } = useAppStore()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0E27' }}>
      <Navigation />
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'dashboard' && <DashboardScreen />}
      {currentScreen === 'upload' && <UploadScreen />}
      {currentScreen === 'about' && <AboutScreen />}
      <ChatBot />
    </div>
  )
}

export default App
