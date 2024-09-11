import './BookItem.css';
import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
import React, {Component} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';//need in BookView


export function BookItem (props) {
    
        console.log("hello world title:"+props.bookJSON);
        var SendBook = (props) => {
            const book = useSelector(state => state);
            const dispatch = useDispatch();
            dispatch(setBook(props.bookJSON));
            console.log("'More Info...' clicked", props.bookJSON);
            //console.log("'redux state...' clicked", useSelector(state => state.book));
            // alert("'More Info...' clicked");
            const navigate = useNavigate();
            navigate('/BookView');//navigate only
            //navigate('/BookView', {state: props.bookJSON});//navigate and share state
        };
        return (
            <div className="Book-Item">
                        
                <img src={BookThumbnail} className="Book-Thumbnail" alt="BookThumbnail"></img>
                <div className="myText">{props.bookJSON.title},{props.bookJSON.author}</div>
                <button className="button" onClick={SendBook} type="button">More Info...</button>
                <button className="button" type="button">Delete</button>
                
            </div>
        );
    
}
