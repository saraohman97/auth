import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Login from './auth/Login'
import Home from './pages/Home';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import New from './pages/New';
import List from './components/List';

function App() {
  const { currentUser } = useContext(AuthContext)
  
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />

        <Route path='/new' element={
          <RequireAuth>
            <New />
          </RequireAuth>
        } />

        <Route path='/list' element={
          <RequireAuth>
            <List />
          </RequireAuth>
        } />
      </Routes>
      <Link to='/'><button>Home</button></Link>
    </div>
  );
}

export default App;
