import './BookItem.css';
import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
export function BookItem() {
    return (
        <div className="Book-Item">
            <img src={BookThumbnail} className="Book-Thumbnail" alt="BookThumbnail"></img>
            
            <button className="button" type="button">Edit</button> 
            <button className="button" type="button">Delete</button>
        </div>
    );
}