import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/loginPage/LoginPage'
import RegisterPage from './pages/registerPage/RegisterPage'
import HomePage from './pages/homePage/HomePage'
import NotFoundPage from './pages/notFoundPage.jsx/NotFoundPage'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'


const HandleLogOut = () => {
  localStorage.clear()
  return <Navigate to="/login" />
}


const RegisterAndLogout = () => {
  localStorage.clear()
  return <RegisterPage />
}

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="/login" 
          element={
            <LoginPage />
          }
        >
        </Route>
        <Route
          path="/logout" 
          element={
            <HandleLogOut />
          }
        ></Route>
        <Route
          path="/register" 
          element={
            <RegisterAndLogout />
          }
        >
        </Route>
        <Route
          path="*" 
          element={<NotFoundPage />}
        >
        </Route>
      </Routes>
    </>
  )
}

export default App