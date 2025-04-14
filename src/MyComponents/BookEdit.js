import './BookCreate.css';
import './spinner.css';
import {useEffect, useRef, useState, React} from 'react';
import { useNavigate } from 'react-router-dom';
//responsive cards
import {Grid, Card, CardContent,Typography, Button, TextField, Rating} from "@mui/material";
//modal
import BasicModal from './BasicModal';
//Redux
import { /*useSelector, */ useDispatch } from 'react-redux';
import { setBasicModalTitle, setBasicModalDescription, setShowBasicModal } from '../librarySlice';
// import Box from '@mui/material/Box';
// // import MUI_Button from '@mui/material/Button';//I am going to use a different button style from Material UI don't need this one 
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
//Modal (React-bootstrap)
 // import { Button as ModalButton } from 'react-bootstrap';//delete later because I don't need.
 // import Modal from 'react-bootstrap/Modal';
 // import 'bootstrap/dist/css/bootstrap.min.css';
 
export function BookCreate (props){
    var CreatedResponseStatusCode = null;
    const [StarValue, setRating] = useState(null);
    const StarRatingComponent = useRef(null);//get state from the Star Rating component.
    const navigate = useNavigate();//initilize navigation for homepage if needed.

    //FORM state
    const TitleFieldRef = useRef(null);
    const AuthorFieldRef = useRef(null);
    const RatingInputField = useRef(null);
    const ReviewerFieldRef = useRef(null);
    const SummaryFieldRef = useRef(null);
    
    //Material UI Modal and redux
    //const library = useSelector(state => state.library);
    const dispatch = useDispatch();
    
    ///SPINNER state
    const [ShowSpinner, setShowSpinner] = useState(false);
    

    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
        if (!renderAfterCalled.current) { //only fetch once
            console.log("loaded book create page.");
            //props.setUserBookItem(props.bookJSON);//don't change global state inside the componentDidMount method
          }//else do nothing
          renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
        }, []);

    function StarOnChange (event, value) {
        if(value != null){
            setRating(value);
        }else{
            console.log("StarRatingComponent.current.value: "+StarRatingComponent.current.value);
            //StarRatingComponent.current.value = StarValue;//use last value set by "setRating" hook function. 
        }
        console.log("star component value: "+value+", previous StarValue state: "+StarValue+", event.target.value: "+event.target.value+", StarRatingComponent.current.value: "+ StarRatingComponent.current.value);//this console.log uses the previous state of StarValue because  
    }
    function onSubmit (event, data) {//TEST this alert later and add the empty box to end of useEffect.
        setShowSpinner(true);//show spinner
        event.preventDefault();//prevent page refresh after submission
        //console.log(event.target.value);
        console.log("Data; TitleFieldRef: "+TitleFieldRef.current.value+", AuthorFieldRef: "+AuthorFieldRef.current.value+", StarValue: "+StarValue+", ReviewerFieldRef: "+ReviewerFieldRef.current.value+", SummaryFieldRef: "+SummaryFieldRef.current.value);
        console.log("json stringify: "+JSON.stringify({"title":TitleFieldRef.current.value, "author":AuthorFieldRef.current.value, "rating":""+StarValue, "reviewer":ReviewerFieldRef.current.value, "summary":SummaryFieldRef.current.value }));
        fetch('https://xgmdaokmq4.execute-api.us-east-2.amazonaws.com/books?',{
            method: 'PUT',
            mode: "cors",
            headers: {
                //Accept: 'application/json',
                //"Origin": "https://programminghobby101.github.io",
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({"title":TitleFieldRef.current.value, "author":AuthorFieldRef.current.value, "rating":""+StarValue, "reviewer":ReviewerFieldRef.current.value, "summary":SummaryFieldRef.current.value })
        }).then(response => {
                setShowSpinner(false);//hide spinner
                CreatedResponseStatusCode = response.status;
                if(response.status === 201){
                    //alert("created book");//test
                    /* Reset form fields */
                    TitleFieldRef.current.value = null;
                    AuthorFieldRef.current.value = null;
                    StarRatingComponent.current.value = 0;
                    setRating(0);
                    ReviewerFieldRef.current.value = null;
                    SummaryFieldRef.current.value = null;
                    /* Show success modal by using Redux*/ 
                    dispatch(setBasicModalTitle("Success"));
                    dispatch(setBasicModalDescription("Success, you've created a book review in our library of reviews!"));
                    dispatch(setShowBasicModal(true)); 

                    return response.text();//convert to string to print my API response
                }
                else if(response.status === 500){
                    return response.json(); 
                }
                else{
                    console.log("CODE 1.1; Something went wrong(from then else statement)");//test
                    return response.text();
                }    
            }).then(textData => {
                //throw new Error('CODE test...; Something went wrong(from then-then else statement) "+textData');//for testing catch only
                    if(CreatedResponseStatusCode === 201) {
                        console.log("my API create/put success response: "+textData); // Now you have the string data , // Use the textData as needed in your component
                    }
                    else if(CreatedResponseStatusCode === 500 ){
                        console.log("my API create/put DB limit error"+textData );
                        /* Show error modal by using Redux*/
                        dispatch(setBasicModalTitle("Error"));
                        dispatch(setBasicModalDescription("Error, Library book creation limit of "+JSON.parse(textData).limit+" books reached. Please try creating your book review, after deleting at least one book review on our homepage."));
                        dispatch(setShowBasicModal(true)); 
                    }
                    else{
                        console.log("CODE 1.2; Tried creating a book review, Something went wrong(from then-then else statement) "+textData); // Now you have the string data , // Use the textData as needed in your component
                        throw new Error('CODE 1.2; Something went wrong(from then-then else statement) "+textData');
                    }
                 })
            .catch(error =>{
                setShowSpinner(false);//hide spinner
                
                console.log("CODE 1.3; my catch error: "+error);
                /* Show thrown error modal by using Redux*/
                dispatch(setBasicModalTitle("Error"));
                dispatch(setBasicModalDescription("Error while creating your book review, please try again later. CODE 1.3"));
                dispatch(setShowBasicModal(true)); 
                //alert("Something went wrong(in catch)");//I only need the alert display if the API request fails //test
            });
      };   
         
     function MoveFocusToReviewField (event) {
         if(StarValue != null) {
             event.currentTarget.setCustomValidity('');
             console.log("Ratings input detected, now hiding the ratings input validation message.");
         }
         ReviewerFieldRef.current.focus(); // move focus to Review TextField form input element.
       }
     function NavigateToBookList() {//for home button
        console.log("called NavigateToBookList(Homepage).");
        navigate("/");
      }

        return (
            <div>
                
                <div className="responsive-layout-for-height" style={{ width: "100%",height:"100%",}}> {/*container for the entire page*/}
                
                {/* below spinner source is from: https://www.youtube.com/watch?v=xkf0tJq-sNY*/}
                { ShowSpinner ? <div id="semiTransparenDiv" ></div> : <></> }{/*ShowSpinner*/} 


                {/* <BasicModal open={true} title="Success" description="Success, you've created a book review in our Library of reviews!"/> */}
                <BasicModal />

                {/* I used the following in the container below to match the Card that the form is on, did this to left align home button to left edge of Card with form on it, this mostly worked because I matched the container width to "maxWidth:800" just like the card(with the form on it). );  maxWidth:800, margin: "0 auto", padding: "20px 5px" */}
                <div id="container-for-left-aligning-home-button" style={{maxWidth:800, margin: "0 auto", padding: "20px 5px"}} >
                    {/* I used 'display: inline-block' on next three elements to put button and page title on same line. */}
                    <Button variant="contained" size="medium" style={{color: "ffffff", display:"inline-block",}} onClick={NavigateToBookList}>Home</Button>
                    <div style={{display:"inline-block",position: "relative",/* Move the element to the right by 50% of the container's width */left: "40%",/* Calculates 50% of the element's width, and moves it by that amount across the X-axis to the left */transform: "translateX(-50%)"}}>   
                        <Typography variant="h4" style={{display:"inline-block", fontSize:"1.8rem"}}> Create Book Review: </Typography>
                    </div>        
                        <Card style={{maxWidth:800, margin: "0 auto", padding: "20px 5px"}}> 
                            <CardContent> 
                                <form onSubmit={onSubmit}> 
                                    <Grid container spacing={2}> 
                                        <Grid xs={12} item> 
                                            <TextField label="Title" className='responsivelayoutforWidth' placeholder="Enter Title" inputRef={TitleFieldRef} variant="outlined" fullwidth required /> 
                                        </Grid> 
                                        <Grid xs={12} item> 
                                            <TextField label="Author" className='responsivelayoutforWidth' placeholder="Enter Author" inputRef={AuthorFieldRef} variant="outlined" fullwidth required /> 
                                        </Grid> 
                                        <Grid xs={12} item> 
                                            <Typography component="legend" className='star-rating'>Rating</Typography>
                                                <div className="wrapper">
                                                    <Rating
                                                    ref={StarRatingComponent}//doesn't work
                                                    className='star-rating' 
                                                    value={StarValue}
                                                    precision={1}
                                                    onChange={StarOnChange}
                                                    tabIndex={null} //Change to null instead of zero because zero will makes tab key on PC bug happen where it creates the unwanted behavior that tabs to the rating input field. This set to zero prevents bug where a non-null-value of this.StarRatingComponent value gets passed to the RatingInputField input and then this.StarRatingComponent passes a null value then the input allows the form to get submitted.
                                                    />
                                                    <br></br>
                                                    <div className="cover-input-box-rating">
                                                        {/* cover element to overlay rating input field for form */}
                                                    </div>
                                                    <input
                                                        ref={RatingInputField}
                                                        id="RatingInput"
                                                        name="RatingInput"
                                                        className='input-box-rating'
                                                        type="number"
                                                        onInvalid={(e) => e.currentTarget.setCustomValidity('Please select a Rating') }
                                                        value={StarValue}
                                                        onFocus={MoveFocusToReviewField}
                                                        onChange={MoveFocusToReviewField}
                                                        //hidden
                                                        //readOnly
                                                        required
                                                    />
                                                </div>
                                        </Grid> 
                                        <Grid xs={12} item> 
                                            <TextField label="Reviewer" className='responsivelayoutforWidth' inputRef={ReviewerFieldRef}  id="ReviewerID" name="ReviewerID" placeholder="Enter Reviewer" variant="outlined"  fullwidth required />
                                        </Grid> 
                                        <Grid xs={12} item> 
                                            <TextField label="Summary" inputRef={SummaryFieldRef} multiline rows={4} placeholder="Type your Summary here" variant="outlined" sx={{ width: "99%" }} required /> 
                                        </Grid> 
                                        <Grid xs={12} item> 
                                            <Button type="submit" variant="contained" color="primary" fullwidth>Submit</Button>
                                        </Grid >
                                    </Grid > 
                                </form >
                            </CardContent>
                        </Card>
                </div>
            </div>    
        </div>
        );
}