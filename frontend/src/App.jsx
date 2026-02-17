import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Explore from './pages/Explore';
import Detail from './pages/Detail';
import ARMode from './pages/ARMode';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AR mode is fullscreen, no navbar */}
        <Route path="/ar/:slug" element={<ARMode />} />

        {/* All other pages with navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/spot/:slug" element={<Detail />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
