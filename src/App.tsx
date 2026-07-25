import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import Track from './pages/Track'
import ModulePage from './pages/Module'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import Achievements from './pages/Achievements'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/track/:levelId" element={<Track />} />
        <Route path="/module/:levelId/:moduleId" element={<ModulePage />} />
        <Route path="/lesson/:levelId/:moduleId/:lessonId" element={<Lesson />} />
        <Route path="/quiz/:levelId/:moduleId" element={<Quiz />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
