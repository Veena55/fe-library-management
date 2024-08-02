import BookList from './components/books/BookList';
import AddLibraryRecord from './components/library/AddLibraryRecord';
import LibraryList from './components/library/LibraryList';
import Sidebar from './components/Sidebar';
import AddStudent from './components/students/AddStudent';
import StudentList from './components/students/StudentList';

function App() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full md:w-2/10 p-2">
          <Sidebar />
        </div>
        <div className="w-full md:w-7/10 p-2 mx-auto">
          {/* <AddStudent /> */}
          {/* <AddLibraryRecord /> */}
          {/* <StudentList />
          <LibraryList />
          <BookList /> */}
        </div>
      </div>
    </>
  );
}

export default App;
