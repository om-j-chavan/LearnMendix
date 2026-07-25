import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { useAuth } from './store/useAuth'
import { setActiveUser } from './store/session'

// Ensure the progress store loads the persisted account's namespace on boot
// (deterministic regardless of store import/rehydration order).
setActiveUser(useAuth.getState().currentUserId)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
