//import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { BookList } from './MyComponents/BookList.js';
import { BookView } from './MyComponents/BookView.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="BookView" element={<BookView />} />
          <Route index element={<div className="App">
              <header>
                <div>
                  <form className="my-form" >
                    <label for="search">Search: </label>
                    <input className="search-box" type="text" id="search" name="Search"/>
                  </form>
                </div>
              </header>
              <BookList/>
            </div> }/>
          
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
