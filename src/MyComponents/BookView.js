import './BookView.css';
//import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
import { useNavigate } from 'react-router-dom';
import {useEffect, useRef} from 'react';
import {Rating} from "@mui/material";

export function BookView(props) {
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
            console.log("rerouting back to homepage because props.UserBookItem was empty object because user went to BookView page without using homepage");
            renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
            navigate("/");//route back to homepage
          }//else do nothing
        else {
            console.log("NOT rerouting back to homepage because props.UserBookItem was defined so this means user went to homepage and use the app to navigate to BookView page");
        }
    }
    return (
        // <div>
        //     <p>hello world!</p>
        //     <div>{JSON.stringify(props.UserBookItem)}</div>
        // </div>
        <div className="book-container">
          <center>
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