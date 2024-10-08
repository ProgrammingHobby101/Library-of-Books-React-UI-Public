import './BookItem.css';
import BookThumbnail from '../my_images/default-book-thumbnail-bookstack.jpg';
import {useEffect, useRef, React} from 'react';
import { useNavigate } from 'react-router-dom';
//responsive cards
import { Card, CardContent, Typography, CardActions, Button} from "@mui/material";
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';


export function BookItem (props){
    const navigate = useNavigate();
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
        console.log("deleting "+props.bookJSON.title);
    }    
        return (
            // <div className="Book-Item">
                        
            //     <img src={BookThumbnail} className="Book-Thumbnail" alt="BookThumbnail"></img>
            //     <div className="myText">{props.bookJSON.title}, {props.bookJSON.author}</div>
            //     <button className="button" type="button" onClick={NavigateToBookView}>More Info...</button>
            //     <button className="button" type="button" onClick={DeleteBook}>Delete</button>
                
            // </div>

            <>                
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
                            <Button variant="contained" size="medium" onClick={DeleteBook}>Delete</Button> 
                        </CardActions>
                    </Card>
                {/* ))} */}

            </>

        );
}
