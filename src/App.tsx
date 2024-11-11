import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from '@/lib/theme';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MusicPlayer } from './components/layout/MusicPlayer';
import { Breadcrumb } from './components/layout/Breadcrumb';
import { Profile } from './pages/Profile';
import { Search } from './pages/Search';
import { Genres } from './pages/Genres';
import { MasterPage } from './pages/MasterPage';
import { ReleasePage } from './pages/ReleasePage';
import { ArtistPage } from './pages/ArtistPage';
import { LabelPage } from './pages/LabelPage';
import { Home } from './pages/Home';
import { FormatPage } from './pages/FormatPage';
import { GenrePage } from './pages/GenrePage';
import { StylePage } from './pages/StylePage';

export function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={theme}>
        <div className="flex h-screen bg-background text-foreground">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto pb-20">
              <div className="mx-auto max-w-7xl px-4 py-6">
                <Breadcrumb />
                <div className="mt-4">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/genres" element={<Genres />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/master/:id" element={<MasterPage />} />
                    <Route path="/release/:id" element={<ReleasePage />} />
                    <Route path="/artist/:id" element={<ArtistPage />} />
                    <Route path="/label/:id" element={<LabelPage />} />
                    <Route path="/format/:format" element={<FormatPage />} />
                    <Route path="/genre/:genre" element={<GenrePage />} />
                    <Route path="/style/:style" element={<StylePage />} />
                  </Routes>
                </div>
              </div>
            </main>
            <MusicPlayer />
          </div>
        </div>
      </div>
    </Router>
  );
}