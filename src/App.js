//import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { BookList } from './MyComponents/BookList.js';
import { BookView } from './MyComponents/BookView.js';
import { BookCreate } from './MyComponents/BookCreate.js';
import { useState } from "react";

//import { ClipLoader } from '@storybook/react';
// import Spinner from 'react-bootstrap/Spinner';
function App() {
  const [UserBookItem, setUserBookItem] = useState({})
  
  return (
    <BrowserRouter basename="/Library-of-Books-React-UI-Public">
      <Routes> {/*root path, doesn't work locally without "/Library-of-Books-React-UI-Public" from the homepage variable in package.json*/}
          <Route exact path="/Library-of-Books-React-UI-Public" element={<div className="App">
              <header>
                <div>
                  <form className="my-form" >
                      <center>
                        <label htmlFor="search">Search: </label>
                        <input className="search-box" type="text" id="search" name="Search"/>
                      </center>
                  </form>
                </div>
              </header>
              
              <BookList setUserBookItem={setUserBookItem}/>
            </div> }/>
            <Route path="/BookView" element={<BookView UserBookItem={UserBookItem} />} />
            <Route path="/BookCreate" element={<BookCreate/>} />
          <Route path="*" element={<div><center>Sorry, Page not available. Please go back to the home page.</center></div>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
