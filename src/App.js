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
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<div className="App">
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
            <Route path="BookView" element={<BookView UserBookItem={UserBookItem} />} />
            <Route path="BookCreate" element={<BookCreate/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
