export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const colors = {
  background: '#0A0E27',
  surface: 'rgba(26, 32, 44, 0.6)',
  primary: '#667EEA',
  secondary: '#764BA2',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  text: '#F7FAFC',
  textMuted: '#94A3B8',
}
