import { io } from 'socket.io-client'

const WS_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api').replace('/api', '')

export const socket = io(WS_URL, { transports: ['websocket', 'polling'] })

socket.on('connect', () => console.log('Connected to MIMIQ backend'))
slot = null
socket.on('disconnect', () => console.log('Disconnected from backend'))

export function subscribeToPatient(patientId) {
  socket.emit('subscribe', { patient_id: patientId })
}

export function onAgentUpdate(cb) {
  socket.on('agent_update', cb)
}

export function onAnalysisComplete(cb) {
  socket.on('analysis_complete', cb)
}

export default socket
