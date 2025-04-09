import './BookView.css';
//import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
import { useNavigate } from 'react-router-dom';
import {useEffect, useRef} from 'react';
import {Rating, Button, Typography} from "@mui/material";
//stuff for basic modal with redux
import BasicModal from './BasicModal';
import { /*useSelector,*/ useDispatch } from 'react-redux';
import { setBasicModalTitle, setBasicModalDescription, setShowBasicModal, setBookViewUsingModal  } from '../librarySlice';


var CreatedResponseStatusCode = 0;
export function BookView(props) {
    //Material UI Modal and redux
    const dispatch = useDispatch();
    
    const navigate = useNavigate();//initilize navigation for homepage if needed.
    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
          checkIfDataExistFromBookItem();
          renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
    }, []);
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

    function DeleteBook () {
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
              CreatedResponseStatusCode = response.status;
              //setShowSpinner(false);//hide spinner
              // if(response.status === 200){
                  //alert("deleted book");//test
                  /* Show success modal*/ 
                  //handleShow();
                  //NOTE: I refreshed page in the next Then statement powered by the next line.
                  return response.text();//convert to string to print my API response
              //}
          }).then(textData => {
                  if(CreatedResponseStatusCode === 200){
                      /* Show success modal by using Redux*/ 
                      dispatch(setBasicModalTitle("Success"));
                      dispatch(setBasicModalDescription("Success, deleted a book review out of our library of reviews!"));
                      dispatch(setBookViewUsingModal(true));
                      dispatch(setShowBasicModal(true)); 
                      console.log("From BookView page, my API delete success response: "+textData); // Now you have the string data , // Use the textData as needed in your component
                      navigate("/");//Go to homepage after deleting item on the BookView page, NOTE: this does not work when I use the alert("") function dialogs in the fetch promises.
                      // window.location.reload(); // this worked before the modal.
                  } else if (CreatedResponseStatusCode === 404){
                      console.log("404 status code returned. Book review id not found.");
                  }else{
                      console.log("Tried deleting a book review, Something else went wrong!, in the else of then.then of fetch.");//test 
                      throw new Error("Something else went wrong!, in the else of then.then of fetch.");                   
                  }    
               })
          .catch(error =>{
              /* Show error modal by using Redux*/ 
              dispatch(setBasicModalTitle("Error"));
              dispatch(setBasicModalDescription("Error, Something went wrong! Sorry but the book review you selected was not deleted out of our library of reviews. Please try again later."));
              dispatch(setBookViewUsingModal(true));
              dispatch(setShowBasicModal(true));
              console.log("Something went wrong(alert from fetch's catch statement)");//test
              //setShowSpinner(false);//hide spinner
              //alert("Something went wrong(in catch)");//I only need the alert display if the API request fails //test
              console.log("my catch error: "+error)
          });
    }
     function NavigateToBookList() {
        console.log("called  NavigateToBookList(Homepage).");
        navigate("/");
      }
    return (
        // <div>
        //     <p>hello world!</p>
        //     <div>{JSON.stringify(props.UserBookItem)}</div>
        // </div>
        <div className="book-container">
          <center>
            <Button variant="contained" size="small" style={{color: "ffffff !important",fontweight:"bolder", backgroundColor: "#db2828"}} onClick={DeleteBook}> Delete </Button> 
            <Button variant="contained" size="medium" style={{color: "ffffff", fontweight:"bolder"}} onClick={NavigateToBookList}>Home</Button>
            <Button variant="contained" size="medium" style={{color: "ffffff",fontweight:"bolder", backgroundColor:"rgb(255, 181, 45)"}} onClick={() => alert("to edit.")}>Edit</Button>  
            
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