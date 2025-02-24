import React, {useEffect, useRef, useState } from 'react';
import { BookItem } from './BookItem.js';
import './BookList.css';
import Spinner from '../my_images/Spinner@1x-1.0s-200px-200px.svg';
import { useNavigate } from 'react-router-dom';
import {Grid, Typography, Button} from "@mui/material";//don't upgrade Grid to Grid2 because Grid2 looks bad.
import Container from "@mui/material/Container";

var list = [];
var finishedList = null;
export function BookList (props) {
    var [loading, setLoading] = useState(true);//show spinner
    var [myJSON, setMyJSON] = useState([]); 
    const navigate = useNavigate();
    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
      if (!renderAfterCalled.current) { //only fetch once
        console.log("hello world fetch");
        list = [];//reset list to prevent doubles of everything being displayed in the list 
        fetch("https://xgmdaokmq4.execute-api.us-east-2.amazonaws.com/books?")
        .then((response) => response.json())
        .then((json) =>  getList(json));
      }//else do nothing
      renderAfterCalled.current = true;
     }, []);
    // var myJSON = {};
    // var myJSONtest = [{
    //   "summary": "myTest",
    //   "createdDate": "1,725,310,421,223",p
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
      function NavigateToBookCreate () {
        console.log("called NavigateToBookCreate.");
        //props.setUserBookItem(props.bookJSON);
        navigate("/BookCreate");
    }
    function getList (json) {
        //setMyJSON(json);
        console.log("json: "+json);
        console.log("myJSON.length: "+json.length);
        json.sort((a,b) => {
            return b.id.localeCompare(a.id) // Sort Descending, try modifiedDate
        });  

        for(let x=0; x<json.length; x++){//don't need because .map iterated through all of them
          list.push(
                <Grid item xs={12} sm={4} ms={4} key={json[x].id}>
                  <BookItem key={json[x].id} bookJSON={json[x]} setUserBookItem={props.setUserBookItem}/>
                </Grid>
              );

          //list.push(myJSON.map((bookJSON) => <BookItem bookJSON={bookJSON}/>));
          console.log("running BookItem loop, count: "+x);
        }
        finishedList =  (
          <Container maxwidth="1g">
            <Typography variant="h4" align="center">
              Books Reviewed: 
            </Typography> 
            <Button variant="contained" size="medium" onClick={NavigateToBookCreate}>Create a Review</Button>
            <Grid container spacing={5} style={{ marginTop: "20px"}}>
              {list} 
             </Grid>
           </Container> ) ;//added each book item to my "Material UI" library responsive grid code
        setLoading(false);//hide spinner and rerender UI
        setMyJSON(json);//rerender UI
        console.log("after setMyJSON, myJSON.length: "+myJSON.length);//after setMyJSON
        console.log("after setLoading, loading: "+loading);
    }
      return (
        <>
        {/* <div className='booklist-container'>  */}
        { (loading) ? <><center>Loading...<p></p><img src={Spinner} alt="loading spinner..." /></center></> 
      
        : 
            (finishedList) 
        } 
        
        {/*  </div> */}
        </>
      );
    
  }