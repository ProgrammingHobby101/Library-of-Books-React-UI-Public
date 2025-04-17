import React, {useEffect, useRef, useState } from 'react';
import { BookItem } from './BookItem.js';
import './BookList.css';
import Spinner from '../my_images/Spinner@1x-1.0s-200px-200px.svg';
import { useNavigate } from 'react-router-dom';
import {Grid, Typography, Button} from "@mui/material";//don't upgrade Grid to Grid2 because Grid2 looks bad.
import Container from "@mui/material/Container";
//stuff for basic modal with redux
import BasicModal from './BasicModal';
import { useDispatch } from 'react-redux';
import { setBasicModalTitle, setBasicModalDescription, setShowBasicModal, setBookListUsingModal  } from '../librarySlice';
 
var list = [];
var finishedList = null;
var BooksReviewedCount = 0;
var CreatedResponseStatusCode = 0;
export function BookList (props) {
    var [loading, setLoading] = useState(true);//show spinner
    var [myJSON, setMyJSON] = useState([]); 
    
    //Material UI Modal and redux
    //const library = useSelector(state => state.library);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
      if (!renderAfterCalled.current) { //only fetch once
        console.log("hello world fetch");
        list = [];//reset list to prevent doubles of everything being displayed in the list 
        fetch("https://xgmdaokmq4.execute-api.us-east-2.amazonaws.com/books?")
        .then((response) => {
          CreatedResponseStatusCode = response.status;
          return response.json()
        })
        .then((json) =>  {//tested works
          // CreatedResponseStatusCode = 404;// tested error
          //CreatedResponseStatusCode = 500;// tested error
          //throw new Error("CODE 1.0; Something else went wrong!, in the else of then.then of fetch.");//tested and test only   
          if(CreatedResponseStatusCode === 200){ //tested works!
            //console.log("json.length or json string: "+json);
            getList(json);//create list of cards
            //IMPORTANT! No need to display success modal 
              /* Show success modal by using Redux*/ 
              // dispatch(setBasicModalTitle("Success"));
              // dispatch(setBasicModalDescription("Success, deleted a book review out of our library of reviews!"));
              // dispatch(setBookItemUsingModal(true));
              // dispatch(setShowBasicModal(true)); 
              // console.log("From BookItem page, my API delete success response: "+textData); // Now you have the string data , // Use the textData as needed in your component
              //navigate("/");//refresh homepage, NOTE: this does not work when I use the alert("") function dialogs in the fetch promises.
              // window.location.reload(); // this worked before the modal.
          } else if (CreatedResponseStatusCode === 404){//tested works! // maybe change this and the API to 200 later, because that's what Stackoverflow says.
            finishedList =  (
              <Container maxwidth="1g">
                <Typography variant="h4" align="center">
                {0} Books Reviewed: 
                </Typography> 
                <Button variant="contained" size="medium" onClick={NavigateToBookCreate}>Create a Review</Button>
                <Grid container spacing={5} style={{ marginTop: "20px"}}>
                  {list} 
                 </Grid>
               </Container> ) ;//added each book item to my "Material UI" library responsive grid code
              
              setLoading(false);//hide spinner and rerender UI
              /* Show error modal by using Redux*/ 
              console.log("CODE 1.1; 404 status code returned. Empty list of Book reviews.");
              dispatch(setBasicModalTitle("Error"));
              dispatch(setBasicModalDescription("Error, CODE 1.1; our Book reviews list is empty, please either create a Book review or visit our website again later."));
              dispatch(setBookListUsingModal(true));
              dispatch(setShowBasicModal(true));
          }else{//tested works!
              //no need to hide loading spinner here because it will be hidden in the catch.
              console.log("CODE 1.2; Tried Retrieving the list of book reviews, Something else went wrong!, in the else of then.then of fetch.");//test 
              throw new Error("CODE 1.2; Something else went wrong!, in the else of then.then of fetch.");                   
          }  
        })
        .catch(error => {//tested works!
          finishedList =  (
            <Container maxwidth="1g">
              <Typography variant="h4" align="center">
                 This website is running into errors, we apologize for the inconvience. Please revisit our homepage later...
              </Typography> 
             </Container> ) ;
          setLoading(false);//hide spinner and rerender UI
          /* Show error modal by using Redux*/ 
          dispatch(setBasicModalTitle("Error"));
          dispatch(setBasicModalDescription("Error, CODE 1.3 Something went wrong! Sorry the Book review list is not avaialble. Please try visiting this homepage again later."));
          dispatch(setBookListUsingModal(true));
          dispatch(setShowBasicModal(true));
          console.log("CODE 1.3; From BookList page, Something went wrong(alert from fetch's catch statement)");//test
          //setShowSpinner(false);//hide spinner
          //alert("Something went wrong(in catch)");//I only need the alert display if the API request fails //test
          console.log("CODE 1.3 my catch error: "+error.stack)
        });
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
        BooksReviewedCount = json.length;
        // json.sort((a,b) => { // Old sorting method
        //     return b.modifiedDate.localeCompare(a.modifiedDate) // Sort Descending, try modifiedDate
        // });  
        json.sort((a,b) => {
              return new Date(b.modifiedDate) - new Date(a.modifiedDate) // Sort Descending, try modifiedDate
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
            {BooksReviewedCount} Books Reviewed: 
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
            <BasicModal />   
            {/* <div className='booklist-container'>  */}
            { (loading) ? <div style={{ background: "#fce305",position: "absolute", height:"100%", width: "100%"}}><center>Loading...<p></p><img src={Spinner} style={{height: "50%"}} alt="loading spinner..." /></center></div> 
          
            : 
                (finishedList) 
            } 
            
            {/*  </div> */}
        </>
      );
    
  }