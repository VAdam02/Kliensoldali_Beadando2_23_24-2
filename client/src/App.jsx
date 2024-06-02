import NavBar from '@/components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import RegisterPage from '@/pages/RegisterPage'
import LoginPage from '@/pages/LoginPage'
import ProfilePage from '@/pages/ProfilePage'
import CreateJobPage from '@/pages/CreateJobPage'
import { Provider } from 'react-redux';
import store from '@/store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
