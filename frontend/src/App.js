
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Public from './components/Layout/Public';
import Loading from './components/Loading';
import { useAuth } from './features/auth/useAuth';
import Favorite from './pages/Favorite';
import OpenedFolder from './pages/Folder';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shared from './pages/Shared';
import Trash from './pages/Trash';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />
  }


  return (
    <Routes>
      <Route path="/*" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="folder/:folderId" element={<OpenedFolder />} />
        <Route path="trash" element={<Trash />} />
        <Route path="started" element={<Favorite />} />
        <Route path="share-with-me" element={<Shared />} />
      </Route>

      <Route element={<Public />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  );
}

export default App;
