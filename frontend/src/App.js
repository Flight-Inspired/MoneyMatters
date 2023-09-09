import './App.css';
import Home from './components/home/Home';
import LegislatorDetails from './components/legislatorDetails/LegislatorDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const server_url = 'http://127.0.0.1:5000/api';
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={ <Home serverUrl={server_url} /> } />
    
            <Route path="/legislator/:bioguideId" element={ <LegislatorDetails serverUrl={server_url} /> } /> {/* Route with a parameter */}
        </Routes>
    </Router>
  );
}

export default App;
