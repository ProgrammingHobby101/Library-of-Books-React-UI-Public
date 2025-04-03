import './BookItem.css';
import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
import {useEffect, useRef, React} from 'react';
import { useNavigate } from 'react-router-dom';
//import { useLocation } from 'react-router'
//responsive cards
import { Card, CardContent, Typography, CardActions, Button} from "@mui/material";
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
//import DeleteIcon from '@mui/icons-material/Delete';
//stuff for basic modal
import BasicModal from './BasicModal';
import { /*useSelector,*/ useDispatch } from 'react-redux';
import { setBasicModalTitle, setBasicModalDescription, setShowBasicModal, setBookItemUsingModal  } from '../librarySlice';


var CreatedResponseStatusCode = 0;
export function BookItem (props){
    const navigate = useNavigate();
    //let location = useLocation();//old way of refreshing homepage/list-view

    //Material UI Modal and redux
    //const library = useSelector(state => state.library);
    const dispatch = useDispatch();

    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
        if (!renderAfterCalled.current) { //only fetch once
            console.log("hello world title:"+props.bookJSON);
            //props.setUserBookItem(props.bookJSON);//don't change global state inside the componentDidMount method
          }//else do nothing
          renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
         }, []);
    function NavigateToBookView () {
        console.log("called NavigateToBookView.");
        props.setUserBookItem(props.bookJSON);
        navigate("/BookView");
    }
    //const increment = () => { setMyTest(mytest+1); console.log("mytest: "+mytest); }//test
    function DeleteBook () {
        console.log("deleting title: "+props.bookJSON.title);//test
        console.log("deleting id: "+props.bookJSON.id);

        fetch('https://xgmdaokmq4.execute-api.us-east-2.amazonaws.com/books/'+props.bookJSON.id,{
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
                        dispatch(setBookItemUsingModal(true));
                        dispatch(setShowBasicModal(true)); 
                        console.log("my API delete success response: "+textData); // Now you have the string data , // Use the textData as needed in your component
                        //navigate("/");//refresh homepage, NOTE: this does not work when I use the alert("") function dialogs in the fetch promises.
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
                dispatch(setBookItemUsingModal(true));
                dispatch(setShowBasicModal(true));
                console.log("Something went wrong(alert from fetch's catch statement)");//test
                //setShowSpinner(false);//hide spinner
                //alert("Something went wrong(in catch)");//I only need the alert display if the API request fails //test
                console.log("my catch error: "+error)
            });

    }
        return (
            // <div className="Book-Item">
                        
            //     <img src={BookThumbnail} className="Book-Thumbnail" alt="BookThumbnail"></img>
            //     <div className="myText">{props.bookJSON.title}, {props.bookJSON.author}</div>
            //     <button className="button" type="button" onClick={NavigateToBookView}>More Info...</button>
            //     <button className="button" type="button" onClick={DeleteBook}>Delete</button>
                
            // </div>

            <>          
                    <BasicModal />      
                    <Card sx={{maxwidth: 345 }}> 
                        <CardActionArea> 
                            <CardMedia 
                              component="img" 
                              height="140" 
                              image={BookThumbnail}
                              alt="BookThumbnail"
                              style={{borderRadius: "5px"}}
                            />
                            <CardContent> 
                                <Typography gutterBottom variant="h5" component="div">
                                    {props.bookJSON.title} 
                                </Typography>
                                <Typography variant="body2" color="text.secondary"> 
                                    {props.bookJSON.author}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions> 
                            <Button variant="contained" size="medium" onClick={NavigateToBookView}>Info</Button>
                            <Button variant="outlined" size="medium" onClick={DeleteBook} /*startIcon={<DeleteIcon />}*/> Delete </Button>
                        </CardActions>
                    </Card>
                {/* ))} */}

            </>

        );
}
