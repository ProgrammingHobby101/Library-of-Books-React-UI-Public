import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
//import { useLocation } from "react-router-dom";
import React, {Component} from 'react';
import { useSelector } from 'react-redux';//need in BookView

export class BookView extends React.Component {
    render(props) {
        //console.log("hello world title:"+props.title);
        const book = useSelector(state => state.book)
        //const [location] = useLocation();//import book
        return (
            <div>
                <div>hello world!</div>
                <p>{book}</p>
            </div>
            // <div className="Book-Item">
                
            //     <></>
            //     <img src={BookThumbnail} className="Book-Thumbnail" alt="BookThumbnail"></img>
            //     {/* <div className="myText">{props.title}</div> */}

            //     <button className="button" type="button">Edit</button> 
            //     <button className="button" type="button">Delete</button>
                
            // </div>
        );
    }
}
