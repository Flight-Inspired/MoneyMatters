import "./App.css";
import Home from "./components/home/Home";
import AllCandidates from "./components/allCandidates/AllCandidates";
import Congress from "./components/congress/Congress";
import Presidential from "./components/presidential/Presidential";
import About from "./components/about/About";
import NavBar from "./components/navbar/NavBar";
import LegislatorDetails from "./components/legislatorDetails/LegislatorDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCUbEwConrAwiiOljSwkQTBn5wwd83WNTk",
    authDomain: "money-matters-321894732.firebaseapp.com",
    projectId: "money-matters-321894732",
    storageBucket: "money-matters-321894732.appspot.com",
    messagingSenderId: "403917843069",
    appId: "1:403917843069:web:78e4b8f5925fce83865f14",
    measurementId: "G-9GCEXMZYY5",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const server_url = "https://larsonbm.pythonanywhere.com/api";
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home serverUrl={server_url} />} />
        <Route
          path="/legislator/:bioguideId"
          element={<LegislatorDetails serverUrl={server_url} />}
        />
        <Route path="/all-candidates" element={<AllCandidates />} />
        <Route path="/congress" element={<Congress />} />
        <Route path="/presidential" element={<Presidential />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
