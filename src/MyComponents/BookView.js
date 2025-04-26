import './BookView.css';
import './spinner.css';
//import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
import { useNavigate } from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import {Rating, Button} from "@mui/material";
//stuff for basic modal with redux
import BasicModal from './BasicModal';
import { /*useSelector,*/ useDispatch } from 'react-redux';
import { setBasicModalTitle, setBasicModalDescription, setShowBasicModal, setBookViewUsingModal  } from '../librarySlice';


var CreatedResponseStatusCode = 0;
export function BookView(props) {
    ///SPINNER state
    const [ShowSpinner, setShowSpinner] = useState(false);

    //Material UI Modal and redux
    const dispatch = useDispatch();

    //navigate
    const navigate = useNavigate();//initilize navigation for homepage if needed.
    
    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
          checkIfDataExistFromBookItem();
          ScrollToBeginningOfPage();
          renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
          // eslint-disable-next-line 
    }, [checkIfDataExistFromBookItem()]);
    function checkIfDataExistFromBookItem(){
        console.log("hello world title:"+props.UserBookItem.title);//test prints
        console.log("hello world:"+JSON.stringify(props.UserBookItem));//test prints
        console.log("props.UserBookItem"+props.UserBookItem);//test prints
        var emptyObj = {};//using var for comparison since adding {} to if condition always returns false.
        console.log("(JSON.stringify(props.UserBookItem) === JSON.stringify(emptyObj)) is: "+(JSON.stringify(props.UserBookItem) === JSON.stringify(emptyObj)));//test print
        if (JSON.stringify(props.UserBookItem) === JSON.stringify(emptyObj)) {
            console.log("rerouting back to homepage because props.UserBookItem was empty object because user went to BookView page without using homepage, and if I allow this it will cause the BookView page to not have any book/movie review data.");
            renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
            navigate("/");//route back to homepage
          }//else do nothing
        else {
            console.log("NOT rerouting back to homepage because props.UserBookItem was defined so this means user went to homepage and use the app to navigate to BookView page");
        }
    }
    function ScrollToBeginningOfPage (){
      const body = document.querySelector('#root');

      body.scrollIntoView({
          behavior: 'smooth'
      }, 500)
  }

    function DeleteBook () {
      setShowSpinner(true);//show spinner
      console.log("deleting title: "+props.UserBookItem.title);//test
      console.log("deleting id: "+props.UserBookItem.id);

      fetch('https://xgmdaokmq4.execute-api.us-east-2.amazonaws.com/books/'+props.UserBookItem.id,{
          method: 'DELETE',
          mode: "cors",
          headers: {
              //Accept: 'application/json',
              //"Origin": "https://programminghobby101.github.io",
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
          },
      }).then(response => {
              //setShowSpinner(false);//hide spinner
              CreatedResponseStatusCode = response.status;
              //setShowSpinner(false);//hide spinner
              // if(response.status === 200){
                  //alert("deleted book");//test
                  /* Show success modal*/ 
                  //handleShow();
                  //NOTE: I refreshed page in the next Then statement powered by the next line.
                  return response.json();//convert to string to print my API response
              //}
          }).then(json => {
                  setShowSpinner(false);//hide spinner
                //   CreatedResponseStatusCode = 500;//TEST ONLY
                  //throw new Error("CODE 1.0; Something else went wrong!, in the else of then.then of fetch.");//test only 
                  if(CreatedResponseStatusCode === 200){//tested works!
                      /* Show success modal by using Redux*/ 
                      dispatch(setBasicModalTitle("Success"));
                      dispatch(setBasicModalDescription("Success, deleted a book review out of our library of reviews!"));
                      dispatch(setBookViewUsingModal(true));
                      dispatch(setShowBasicModal(true)); 
                      console.log("From BookView page, my API delete success response: "+json); // Now you have the string data , // Use the json as needed in your component
                      navigate("/");//Go to homepage after deleting item on the BookView page, NOTE: this does not work when I use the alert("") function dialogs in the fetch promises.
                      // window.location.reload(); // this worked before the modal.
                  } else if (CreatedResponseStatusCode === 404){//tested works!
                      console.log("CODE 1.1; 404 status code returned. Book review id not found.");
                      dispatch(setBasicModalTitle("Error"));
                      dispatch(setBasicModalDescription("Error, Code 1.1 failed to delete a book review, please try again later!"));
                      dispatch(setBookViewUsingModal(true));
                      dispatch(setShowBasicModal(true));
                  }else{//tested works!
                    /* Show error modal by using Redux*/ 
                    console.log("CODE 1.2; Tried deleting a book review, Something else went wrong!, in the else of then.then of fetch.");//test 
                    throw new Error("CODE 1.2; Something else went wrong!, in the else of then.then of fetch."); 
                  }    
               })
          .catch(error =>{ // tested works!
              /* Show error modal by using Redux*/ 
              dispatch(setBasicModalTitle("Error"));
              dispatch(setBasicModalDescription("Error,CODE 1.3; Something went wrong! Sorry the book review you selected was not deleted out of our library of reviews. Please try again later."));
              dispatch(setBookViewUsingModal(true));
              dispatch(setShowBasicModal(true));
              console.log("CODE 1.3; Something went wrong(alert from fetch's catch statement)");//test

              //alert("Something went wrong(in catch)");//I only need the alert display if the API request fails //test
              console.log("CODE 1.3; my catch error: "+error);
              //setShowSpinner(false);//hide spinner
          });
    }
     function NavigateToBookList() {
        console.log("called  NavigateToBookList(Homepage).");
        navigate("/");
      }
      function NavigateToBookEdit (){
        console.log("nav to edit.");
        props.setUserBookItem(props.UserBookItem);//pass to BookEdit page
        navigate("/BookEdit");
    }
    return (
        // <div>
        //     <p>hello world!</p>
        //     <div>{JSON.stringify(props.UserBookItem)}</div>
        // </div>
        <div className="book-container">

            {/* below spinner source is from: https://www.youtube.com/watch?v=xkf0tJq-sNY*/}
            { ShowSpinner ? <div id="semiTransparenDiv" ></div> : <></> }{/*ShowSpinner*/}
            
            {/* <BasicModal open={true} title="Success" description="Success, you've created a book review in our Library of reviews!"/> */}
            <BasicModal />

          <center>
            <Button variant="contained" size="small" style={{color: "ffffff !important",fontweight:"bolder", backgroundColor: "#db2828"}} onClick={DeleteBook}> Delete </Button> 
            <Button variant="contained" size="medium" style={{color: "ffffff", fontweight:"bolder"}} onClick={NavigateToBookList}>Home</Button>
            <Button variant="contained" size="medium" style={{color: "ffffff", backgroundColor:"rgb(255, 181, 45)"}} onClick={NavigateToBookEdit}>Edit</Button>  
            
                <h1 className='my-H-Tags'>Title</h1>
                {props.UserBookItem.title}
                <h1 className='my-H-Tags'>Author</h1>
                {props.UserBookItem.author}
                <h3 className='my-H-Tags'>Rating</h3>
                <Rating name="read-only" value={Number(props.UserBookItem.rating)} readOnly />
                {/* {(props.UserBookItem.rating>1) ?  props.UserBookItem.rating+" Stars":  props.UserBookItem.rating+" Star"}  //this is the old code for ratings display */}
                <h3 className='my-H-Tags'>Reviewer</h3>
                {props.UserBookItem.reviewer}
                <h4 className='my-H-Tags'>Created Date</h4>
                {props.UserBookItem.createdDate}
                <h4 className='my-H-Tags'>Modified Date</h4>
                {(props.UserBookItem.modifiedDate === null) ?  "N/A": props.UserBookItem.modifiedDate}
                <h3 className='my-H-Tags'>Summary</h3>
                {props.UserBookItem.summary}
                <h4 className='my-H-Tags'>ID</h4>
                {props.UserBookItem.id}
          </center>
        </div>
    );
}