import './App.css';
import Home from './components/home/Home';
import Map from './components/map/Map';
import LegislatorDetails from './components/legislatorDetails/LegislatorDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const server_url = 'http://127.0.0.1:5000/api';
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={ <Home serverUrl={server_url} /> } />
            <Route path="/legislator/:bioguideId" element={ <LegislatorDetails serverUrl={server_url} /> } />
            <Route path="/map" element={<Map />} />
        </Routes>
    </Router>
  );
}

export default App;
