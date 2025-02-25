import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './component/layout/Header';
import Login from './component/auth/Login';
import SignUp from './component/auth/SignUp';
import BookDetail from './component/book/BookDetail';
import BookRegister from './component/book/BookRegister';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      {/* ✅ QueryClientProvider 추가 */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book-register" element={<BookRegister />} />
          <Route path="/book-detail" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
