import './BookView.css';
//import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';

export function BookView(props) {
    console.log("hello world title:"+props.UserBookItem.title);
    console.log("hello world:"+JSON.stringify(props.UserBookItem));
    return (
        // <div>
        //     <p>hello world!</p>
        //     <div>{JSON.stringify(props.UserBookItem)}</div>
        // </div>
        <div className="book-container">
            <h1>Title</h1>
            {props.UserBookItem.title}
            <h1>Author</h1>
            {props.UserBookItem.author}
            <h3>Rating</h3>
            {(props.UserBookItem.rating>1) ?  props.UserBookItem.rating+" Stars":  props.UserBookItem.rating+" Star"}
            <h3>Reviewer</h3>
            {props.UserBookItem.reviewer}
            <h3>Created Date</h3>
            {props.UserBookItem.createdDate}
            <h3>Modified Date</h3>
            {(props.UserBookItem.modifiedDate === null) ?  "N/A": props.UserBookItem.modifiedDate}
            <h1>Summary</h1>
            {props.UserBookItem.summary}
            <h1>ID</h1>
            {props.UserBookItem.id}
        </div>
    );
}