import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando as páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/accounts' element={<Account />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
