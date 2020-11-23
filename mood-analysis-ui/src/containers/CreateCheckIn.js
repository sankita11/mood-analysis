import React from 'react';
import { Link } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

import moodImage from '../utils/MoodImage';



import { gql, useMutation } from '@apollo/client';

const ADD_CHECKIN = gql`
  
  mutation CreateUserCheckIn( $input: CheckInInput) {
    createUserCheckIn(input: $input) 
  }
`;


const useStyles = makeStyles({
  
  slider: {
    width: 400,
  },
  img: {
      width: 100,
  },
  paper: {
    height: 30,
    verticalAlign: "middle",
    cursor: 'pointer'

  },
  textField : {
    marginTop : "20px"
  },
  button : {
    marginTop: "20px" 
  }
});

export default function CreateCheckIn(props) {

  const classes = useStyles();
  const [createCheckIn, {data}] = useMutation(ADD_CHECKIN);
  
  const feelingArr = ['Excited', 'Angry', 'Playful', 'Content', 'Interested', 'Sad', 'Jealous', 'Positive'];


  const [moodScore, setMoodScore] = React.useState({
    moodValue: 4,
    moodImg: moodImage(4),
  });
  const [feeling, setFeeling] = React.useState({});
  const [comment, setComment] = React.useState('');

    

  const toggleFeelingSelect = (feelingSelected) => {

    const selectedFeelings = feeling;

    if( selectedFeelings.hasOwnProperty(feelingSelected)){
      delete selectedFeelings[feelingSelected] ;
    }else{
      selectedFeelings[feelingSelected] = 1;
    }

    setFeeling( selectedFeelings);
  }
  
  const handleSliderChange = (event, newValue) => {
    setMoodScore({
      moodValue: newValue,
      moodImg: moodImage(newValue)
    })
  }

  const handleTextChange = ( event ) => {
    setComment( event.target.value)
  }

  const selectedFeeling = {
    'background' : 'lightblue'
  }

  const onSubmit = async () =>{
    
    const input = {
      moodScore: parseInt(moodScore.moodValue),
      feeling: Object.keys(feeling).toString(),
      comment: comment
    }
    
    const result = await createCheckIn( { variables: {input: input} })
    props.history.push('/');
    console.log(result);
  }


    return (
      <Container>
        <Grid container spacing={1} alignItems="center">
          <Typography variant="h5" component="h5"  gutterBottom>
              Select your mood
          </Typography>
          <Grid item xs={12} >
           <img className={classes.img} alt={moodScore.moodValue} src={moodScore.moodImg} />
          </Grid>
          <Grid item xs={12} >
            <Slider
              className={classes.slider}
              value={typeof moodScore.moodValue === 'number' ? moodScore.moodValue : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              min={1}
              max={7}
            />
          </Grid>

          <Grid container spacing={1}>
            <Typography variant="h5" component="h5" gutterBottom>
                How are you feeling today ?
            </Typography>
            <Grid container direction="row" spacing={1} >
            {
              feelingArr.map( (eachFeeling, index) => {
                return (
                  <Grid item key={index} xs={4} >
                    <Paper 
                      style={feeling[eachFeeling] ? selectedFeeling : {}}
                      onClick={() => toggleFeelingSelect(eachFeeling, index)} 
                      square={true} variant={'outlined'} 
                      className={classes.paper}>
                        {eachFeeling}
                    </Paper>
                  </Grid>
                )
              }) 
  
            }  
            </Grid>
                   
          </Grid>

          <Grid container spacing={1}>
            <TextField
            className={classes.textField}
            label="Type your optional notes here.."
            multiline
            rows={4}
            value={comment}
            fullWidth={true}
            variant="filled"
            onChange={handleTextChange}
            />
          </Grid>

          <Grid container className={classes.button} justify="center">
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
            <Link to={'/'}>
              <Button variant="contained" color="secondary">
              Cancel
            </Button>
            </Link>
          </Grid>
          
         
        </Grid>
      </Container>
    );
  
}
