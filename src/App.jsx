import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookList from './components/books/BookList';
import AddLibraryRecord from './components/library/AddLibraryRecord';
import LibraryList from './components/library/LibraryList';
import Sidebar from './components/Sidebar';
import AddStudent from './components/students/AddStudent';
import StudentList from './components/students/StudentList';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/10 p-2">
            <Sidebar />
          </div>
          <div className="w-full md:w-7/10 p-2 mx-auto">

            <Routes>
              <Route path="/student/add" element={<AddStudent />} />
              <Route path="/library/add" element={<AddLibraryRecord />} />
              <Route path="/student/all" element={<StudentList />} />
              <Route path="/book/all" element={<BookList />} />
              <Route path="/library/all" element={<LibraryList />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter >
    </>
  );
}

export default App;
