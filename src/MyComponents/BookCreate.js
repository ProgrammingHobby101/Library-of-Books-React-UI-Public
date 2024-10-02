import {useEffect, useRef, useState, React} from 'react';
import { useNavigate } from 'react-router-dom';
//responsive cards
import {Grid, Card, CardContent, Typography, CardActions, Button, TextField, Rating} from "@mui/material";

export function BookCreate (props){
    const navigate = useNavigate();
    const [StarValue, setRating] = useState(null);

    const renderAfterCalled = useRef(false);// this paired with useEffect will prevent useEffect from running twice in Dev mode.
    useEffect(() => { // with the useEffect empty array at end will Code here will run just like componentDidMount so that fetch only loads once
        if (!renderAfterCalled.current) { //only fetch once
            console.log("loaded book create page.");
            //props.setUserBookItem(props.bookJSON);//don't change global state inside the componentDidMount method
          }//else do nothing
          renderAfterCalled.current = true;//need this with useEffect this paired with useEffect will prevent useEffect from running twice in Dev mode.
         }, []);

    // function setRating(newValue){
    //     console.log("rating is: "+ newValue);
    // }
    const onSubmit = data => {
        console.log(data);
        alert("creating book");
      };
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
                                        <Typography component="legend">Rating</Typography>
                                                <Rating
                                                name="rating"
                                                value={StarValue}
                                                precision={1}
                                                onChange={(event, value) => {
                                                    setRating(value);
                                                }}
                                                />
                                                <br></br>
                                                <input
                                                    name="rating"
                                                    type="number"
                                                    value={StarValue}
                                                    
                                                    //hidden
                                                    //readOnly
                                                    required
                                                />
                                    </Grid> 
                                    <Grid xs={12} item> 
                                        <TextField label="Reviewer" placeholder="Enter Reviewer" variant="outlined"  fullwidth required />
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
        </div>

        );
}