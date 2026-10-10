
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import ChaptersPage from './pages/ChaptersPage'
import ChapterPage from './pages/ChapterPage'
import NovelPage from './pages/NovelPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="mapa" element={<MapPage />} />
          <Route path="capitulos" element={<ChaptersPage />} />
          <Route path="capitulos/:id" element={<ChapterPage />} />
          <Route path="novela" element={<NovelPage />} />
          <Route path="nosotros" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
