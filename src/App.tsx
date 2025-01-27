import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CurvesExplorer from './components/CurvesExplorer';
import Lissajous2DTab from './components/tabs/Lissajous2DTab';
import Lissajous3DTab from './components/tabs/Lissajous3DTab';
import Clelie3DTab from './components/tabs/Clelie3DTab';
import ExponentialTab from './components/tabs/ExponentialTab';
import HypertrochoideTab from './components/tabs/HypertrochoideTab';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curves" element={<CurvesExplorer />} />
        <Route path="/lissajous2d" element={<Lissajous2DTab curveType="lissajous2d" />} />
        <Route path="/lissajous3d" element={<Lissajous3DTab curveType="lissajous3d" />} />
        <Route path="/clelie3d" element={<Clelie3DTab curveType="clelie3d" />} />
        <Route path="/exponential" element={<ExponentialTab curveType="exponential" />} />
        <Route path="/hypertrochoide" element={<HypertrochoideTab curveType="hypertrochoide" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;