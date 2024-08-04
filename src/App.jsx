import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import BookList from './components/books/BookList';
import AddBook from './components/books/AddBook';
import AddLibraryRecord from './components/library/AddLibraryRecord';
import LibraryList from './components/library/LibraryList';
import Sidebar from './components/Sidebar';
import AddStudent from './components/students/AddStudent';
import StudentList from './components/students/StudentList';
import EditStudent from './components/students/EditStudent';
import EditBook from './components/books/EditBook';
import EditLibrary from './components/library/EditLibrary';
import Home from './pages/Home';

function AppRoutes() {
  const location = useLocation();
  const showSideBar = location.pathname !== '/';
  return (
    <div className={` ${showSideBar && "flex flex-wrap"}`}>
      {showSideBar &&
        <div className="w-full md:w-2/10 p-2">
          <Sidebar />
        </div>}

      <div className={`w-full ${showSideBar ? 'md:w-7/10 p-2' : 'w-full'} mx-auto`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/all" element={<StudentList />} />
          <Route path="/student/add" element={<AddStudent />} />
          <Route path="/student/edit/:id" element={<EditStudent />} />
          <Route path="/library/all" element={<LibraryList />} />
          <Route path="/library/add" element={<AddLibraryRecord />} />
          <Route path="/library/edit/:id" element={<EditLibrary />} />
          <Route path="/book/all" element={<BookList />} />
          <Route path="/book/add" element={<AddBook />} />
          <Route path="/book/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
export default App;
