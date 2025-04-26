//import logo from './logo.svg';
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { BookList } from './MyComponents/BookList.js';
import { BookView } from './MyComponents/BookView.js';
import { BookCreate } from './MyComponents/BookCreate.js';
import { BookEdit } from './MyComponents/BookEdit.js';
import { useState } from "react";

//import { ClipLoader } from '@storybook/react';
// import Spinner from 'react-bootstrap/Spinner';
function App() {
  const [UserBookItem, setUserBookItem] = useState({})
  
  return (
    <HashRouter >
      <Routes> {/*root path, doesn't work locally without "/Library-of-Books-React-UI-Public" from the homepage variable in package.json*/}
          <Route index path="/" element={<div className="App">
              
              <BookList setUserBookItem={setUserBookItem}/>
            </div> }/>
            <Route path="/BookView" element={<BookView UserBookItem={UserBookItem} setUserBookItem={setUserBookItem}/>} />
            <Route path="/BookCreate" element={<BookCreate/>} />
            <Route path="/BookEdit" element={<BookEdit UserBookItem={UserBookItem}/>} />
          <Route path="*" element={<div><center>Sorry, Page not available. Please go back to the home page.</center></div>} />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
