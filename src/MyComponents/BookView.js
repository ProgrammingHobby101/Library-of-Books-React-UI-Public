import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';

export function BookView(props) {
    console.log("hello world title:"+props.title);
    return (
        <div className="Book-Item">
            
            
            <img src={BookThumbnail} className="Book-Thumbnail" alt="BookThumbnail"></img>
            {/* <div className="myText">{props.title}</div> */}

            <button className="button" type="button">Edit</button> 
            <button className="button" type="button">Delete</button>
            
        </div>
    );
}