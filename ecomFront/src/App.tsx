
import './App.css';
import Header from './components/layout/headers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Pages de base (à remplacer par tes vraies pages)
const Accueil = () => <div style={{padding: 24}}>Accueil</div>;
const Boutique = () => <div style={{padding: 24}}>Boutique</div>;
const Promotions = () => <div style={{padding: 24}}>Promotions</div>;
const Contact = () => <div style={{padding: 24}}>Contact</div>;

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
