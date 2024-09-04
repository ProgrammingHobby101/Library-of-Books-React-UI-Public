//import logo from './logo.svg';
import './App.css';
import { BookList } from './MyComponents/BookList.js';

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <form>
            <label for="search">Search: </label>
            <input type="text" id="search" name="Search"/>
          </form>
        </div>
      </header>
      <BookList/>
    </div>
  );
}

export default App;
