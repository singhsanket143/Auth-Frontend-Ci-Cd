import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './SignUp';
import Login from './Login';
import PasswordReset from './PasswordReset';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
