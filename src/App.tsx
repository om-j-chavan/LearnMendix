import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import RequireAuth from './components/RequireAuth'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Track from './pages/Track'
import ModulePage from './pages/Module'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import Achievements from './pages/Achievements'
import Paths from './pages/Paths'
import PathDetail from './pages/PathDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/paths" element={<Paths />} />
        <Route path="/paths/:pathId" element={<PathDetail />} />
        <Route path="/track/:levelId" element={<Track />} />
        <Route path="/module/:levelId/:moduleId" element={<ModulePage />} />
        <Route path="/lesson/:levelId/:moduleId/:lessonId" element={<Lesson />} />
        <Route path="/quiz/:levelId/:moduleId" element={<Quiz />} />
        <Route path="/achievements" element={<Achievements />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
