import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import Home from './pages/Home';
import CurvesExplorer from './components/CurvesExplorer';
import Lissajous2DTab from './components/tabs/Lissajous2DTab';
import Lissajous3DTab from './components/tabs/Lissajous3DTab';
import Clelie3DTab from './components/tabs/Clelie3DTab';
import ExponentialTab from './components/tabs/ExponentialTab';
import HypertrochoideTab from './components/tabs/HypertrochoideTab';
import MaurerRoseTab from './components/tabs/MaurerRoseTab';
import HypocycloideTab from './components/tabs/HypocycloideTab';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-dark-secondary transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-800 dark:text-white" />
      ) : (
        <Sun className="w-5 h-5 text-gray-800 dark:text-white" />
      )}
    </button>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-dark transition-colors">
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/curves" element={<CurvesExplorer />} />
            <Route path="/lissajous2d" element={<Lissajous2DTab curveType="lissajous2d" />} />
            <Route path="/lissajous3d" element={<Lissajous3DTab curveType="lissajous3d" />} />
            <Route path="/clelie3d" element={<Clelie3DTab curveType="clelie3d" />} />
            <Route path="/exponential" element={<ExponentialTab curveType="exponential" />} />
            <Route path="/hypertrochoide" element={<HypertrochoideTab curveType="hypertrochoide" />} />
            <Route path="/maurerrose" element={<MaurerRoseTab curveType="maurerrose" />} />
            <Route path="/hypocycloide" element={<HypocycloideTab curveType="hypocycloide" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;