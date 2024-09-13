import React, {useEffect, useRef, useState } from 'react';
import {useRefresh} from 'react-tidy'
import { BookItem } from './BookItem.js';
var list = [];
export function BookList (props) {
    var [myJSON, setMyJSON] = useState([]); 
    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
      if (!renderAfterCalled.current) { //only fetch once
        console.log("hello world fetch");
        list = [];//reset list to prevent doubles of everything being displayed in the list 
        fetch("https://xgmdaokmq4.execute-api.us-east-2.amazonaws.com/books?")
        .then((response) => response.json())
        .then((json) => { getList(json)});
      }//else do nothing
      renderAfterCalled.current = true;
     }, []);
    // var myJSON = {};
    // var myJSONtest = [{
    //   "summary": "myTest",
    //   "createdDate": "1,725,310,421,223",
    //   "reviewer": "Nicholas Donald",
    //   "rating": "3",
    //   "modifiedDate": null,
    //   "id": "7",
    //   "author": "myTestAuthor1",
    //   "title": "myTestTitle1"
    //   },
    //   {
    //       "summary": "myTest",
    //       "createdDate": "1725311515699",
    //       "reviewer": "Nicholas Donald",
    //       "rating": "1",
    //       "modifiedDate": null,
    //       "id": "9",
    //       "author": "myTestAuthor4",
    //       "title": "myTestTitle4"
    //   },
    //   {
    //       "summary": "myTest4",
    //       "createdDate": "9/2/2024, 5:39:47 PM",
    //       "reviewer": "Nicholas Donald",
    //       "rating": "5",
    //       "modifiedDate": "9/2/2024, 5:40:27 PM",
    //       "id": "8",
    //       "author": "myTestAuthor2",
    //       "title": "myTestTitle2"
    //   },];

      /* force UI update */
      //const refresh = useRefresh();
      //const [, forceRender] = useState({});
      //const forceUpdate = React.useReducer(bool => !bool, true)[1];
    function startFetch() {
      
    }
    function getList (json) {
        //setMyJSON(json);
        console.log("json: "+json);
        console.log("myJSON.length: "+json.length);
        json.sort((a,b) => {
            return b.id.localeCompare(a.id) // Sort Decending
        });  

        for(let x=0; x<json.length; x++){//don't need because .map iterated through all of them
          list.push(<BookItem key={json[x].id} bookJSON={json[x]} setUserBookItem={props.setUserBookItem}/>);
          //list.push(myJSON.map((bookJSON) => <BookItem bookJSON={bookJSON}/>));
          console.log("running BookItem loop, count: "+x);
        }
        setMyJSON(json);
        console.log("after setMyJSON, myJSON.length: "+myJSON.length);//after setMyJSON
        /* force UI update */
        //forceUpdate();
        //refresh(); 
        
        // forceRender({});
    }
      return (
        list
      );
    
  }