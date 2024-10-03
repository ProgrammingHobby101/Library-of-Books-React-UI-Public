import './BookCreate.css';
import {useEffect, useRef, useState, React} from 'react';
import { useNavigate } from 'react-router-dom';
//responsive cards
import {Grid, Card, CardContent, Typography, Button, TextField, Rating} from "@mui/material";

export function BookCreate (props){
    const navigate = useNavigate();
    const [StarValue, setRating] = useState(null);
    var ReviewerID = document.getElementById('ReviewerID');
    const [loading, setLoading] = useState(true);
    //timer state
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    

    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    // useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
    //     let intervalId;
    //       if (isActive) {
    //         intervalId = setInterval(() => {
    //           setSeconds(prevSeconds => 0);
    //           setIsActive(false); // function resetTimer() {}
    //         }, 1000);
    //       }
    //     if (!renderAfterCalled.current) { //only fetch once
    //         console.log("loaded book create page.");
    //         //props.setUserBookItem(props.bookJSON);//don't change global state inside the componentDidMount method
    //       }//else do nothing
    //       renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
    //       return () => clearInterval(intervalId);
    //     }, [isActive, seconds]);

    useEffect(() => {
        let intervalId;
        if (isActive) {
          intervalId = setInterval(() => {
            setSeconds(prevSeconds => {setSeconds(0);
            setIsActive(false);}/* reset timer */ );
          }, 1000);
        }
    
        return () => clearInterval(intervalId);
      }, [isActive, seconds]);

    // function setRating(newValue){
    //     console.log("rating is: "+ newValue);
    // }
    const onSubmit = data => {//TEST this alert later and add the empty box to end of useEffect.
        console.log(data);
        //alert("creating book");//test
      };
      
      function startTimer() {
        setIsActive(true);
      }
    
    //   function stopTimer() {
    //     setIsActive(false);
    //   }
    
    //   function resetTimer() {
    //     setSeconds(0);
    //     setIsActive(false);
    //   }
    
      
    // function StartTimer  () { //RatingsInputFieldOnFocus
    //         if (ReviewerID!=null) { // ReviewerID != null so that the react component mounting functions don't call this focus function. 
    //                 // useTimeout(() => {
    //                 //   alert("focused on rating input field.");
    //                 //   setLoading(false);
    //                 // }, 5000);
                
    //             //ReviewerID.focus();
    //         }        
    // }
        return (

            <div style={{background: "#fce305"}}>   
                <Typography variant="h4" align="center">            
                    Book Review: 
                </Typography>    
                    <Card style={{maxWidth:800, margin: "0 auto", padding: "20px 5px"}}> 
                        <CardContent> 
                            <form onSubmit={onSubmit()}> 
                                <Grid container spacing={2}> 
                                    <Grid xs={12} item> 
                                        <TextField label="Title" placeholder="Enter Title" variant="outlined" fullwidth required /> 
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <TextField label="Author" placeholder="Enter Author" variant="outlined" fullwidth required /> 
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <Typography component="legend" className='star-rating'>Rating</Typography>
                                            <div class="wrapper">
                                                <Rating
                                                name="rating"
                                                className='star-rating'
                                                value={StarValue}
                                                precision={1}
                                                onChange={(event, value) => {
                                                    setRating(value);
                                                }}
                                                />
                                                <br></br>
                                                <div class="cover-input-box-rating">
                                                    {/* cover element to overlay rating input field for form */}
                                                </div>
                                                <input
                                                    name="rating"
                                                    className='input-box-rating'
                                                    type="number"
                                                    value={StarValue}
                                                    onFocus={startTimer}
                                                    //hidden
                                                    //readOnly
                                                    required
                                                />
                                            </div>
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <TextField label="Reviewer" id="ReviewerID" name="ReviewerID" placeholder="Enter Reviewer" variant="outlined"  fullwidth required />
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <TextField label="Summary" multiline rows={4} placeholder="Type your Summary here" variant="outlined" sx={{ width: "99%" }} required /> 
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <Button type="submit" variant="contained" color="primary" fullwidth>Submit</Button>
                                    </Grid >
                                </Grid > 
                            </form >
                        </CardContent>
                    </Card>
                    <h1>{seconds}</h1>
                    <button onClick={startTimer}>Start</button>
                    {/* <button onClick={stopTimer}>Stop</button>
                    <button onClick={resetTimer}>Reset</button> */}
        </div>

        );
}