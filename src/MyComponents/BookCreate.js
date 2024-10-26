import './BookCreate.css';
import {useEffect, useRef, useState, React} from 'react';
import { useNavigate } from 'react-router-dom';
//responsive cards
import {Grid, Card, CardContent, Typography, Button, TextField, Rating} from "@mui/material";

export function BookCreate (props){
    const navigate = useNavigate();
    const [StarValue, setRating] = useState(null);
    const StarRatingComponent = useRef(null);//get state from the Star Rating component.
    
    const TitleFieldRef = useRef(null);
    const AuthorFieldRef = useRef(null);
    const RatingInputField = useRef(null);
    const ReviewerFieldRef = useRef(null);
    const SummaryFieldRef = useRef(null);

    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
        if (!renderAfterCalled.current) { //only fetch once
            console.log("loaded book create page.");
            setRating(0);//prevent rating UI from being set to the previous state. 
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
    
    function MoveFocusToReviewField () {
        ReviewerFieldRef.current.focus(); // move focus to Review TextField form input element.
    }

    function onSubmit (event, data) {//TEST this alert later and add the empty box to end of useEffect.
        event.preventDefault();//prevent page refresh after submission
        //console.log(event.target.value);
        console.log("Data; TitleFieldRef: "+TitleFieldRef.current.value+", AuthorFieldRef: "+AuthorFieldRef.current.value+", StarValue: "+StarValue+", ReviewerFieldRef: "+ReviewerFieldRef.current.value+", SummaryFieldRef: "+SummaryFieldRef.current.value);
        console.log("json stringify: "+JSON.stringify({"title":TitleFieldRef.current.value, "author":AuthorFieldRef.current.value, "rating":StarValue, "reviewer":ReviewerFieldRef.current.value, "summary":SummaryFieldRef.current.value }));
        //alert("creating book");//test
        fetch('https://xgmdaokmq4.execute-api.us-east-2.amazonaws.com/books?',{
            method: 'PUT',
            mode: "cors",
            headers: {
                //Accept: 'application/json',
                "Origin": "https://programminghobby101.github.io",
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({"title":TitleFieldRef.current.value, "author":AuthorFieldRef.current.value, "rating":StarValue, "reviewer":ReviewerFieldRef.current.value, "summary":SummaryFieldRef.current.value })
        }).then(response => {
                console.log("my success"+response)
            })
            .catch(error =>{
                console.log("my catch error: "+error)
            });
      };    
      
        return (

            <div style={{background: "#fce305"}}>   
                <Typography variant="h4" align="center">            
                    Book Review: 
                </Typography>    
                    <Card style={{maxWidth:800, margin: "0 auto", padding: "20px 5px"}}> 
                        <CardContent> 
                            <form onSubmit={onSubmit}> 
                                <Grid container spacing={2}> 
                                    <Grid xs={12} item> 
                                        <TextField label="Title" placeholder="Enter Title" inputRef={TitleFieldRef} variant="outlined" fullwidth required /> 
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <TextField label="Author" placeholder="Enter Author" inputRef={AuthorFieldRef} variant="outlined" fullwidth required /> 
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <Typography component="legend" className='star-rating'>Rating</Typography>
                                            <div class="wrapper">
                                                <Rating
                                                ref={StarRatingComponent}//doesn't work
                                                className='star-rating'
                                                value={StarValue}
                                                precision={1}
                                                onChange={StarOnChange}
                                                tabIndex={null} /*Change to null instead of zero because zero will makes tab key on PC bug happen where it creates the unwanted behavior that tabs to the rating input field. This set to zero prevents bug where a non-null-value of this.StarRatingComponent value gets passed to the RatingInputField input and then this.StarRatingComponent passes a null value then the input allows the form to get submitted. */
                                                />
                                                <br></br>
                                                <div class="cover-input-box-rating">
                                                    {/* cover element to overlay rating input field for form */}
                                                </div>
                                                <input
                                                    ref={RatingInputField}
                                                    id="RatingInput"
                                                    name="RatingInput"
                                                    className='input-box-rating'
                                                    type="number"
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
                                        <TextField label="Reviewer" inputRef={ReviewerFieldRef} id="ReviewerID" name="ReviewerID" placeholder="Enter Reviewer" variant="outlined"  fullwidth required />
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

        );
}