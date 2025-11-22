const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'

async function jsonFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error('API error', res.status, data)
      return { error: data?.error || `HTTP ${res.status}` }
    }
    return data
  } catch (err) {
    console.error('Network error', err)
    return { error: String(err) }
  }
}

export async function sendChatMessage(patientId, message) {
  return jsonFetch(`${API_URL}/chat`, {
    method: 'POST',
    body: JSON.stringify({ patient_id: patientId, message }),
  })
}

export async function startAnalysis(patientId) {
  return jsonFetch(`${API_URL}/analyze`, {
    method: 'POST',
    body: JSON.stringify({ patient_id: patientId }),
  })
}

export async function getResults(patientId) {
  return jsonFetch(`${API_URL}/results/${patientId}`)
}

export async function getAgentStatus() {
  return jsonFetch(`${API_URL}/agents/status`)
}

export async function healthCheck() {
  return fetch(API_URL.replace('/api', '/health')).then(r => r.json()).catch(err => ({ error: String(err) }))
}
