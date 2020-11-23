import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Container, Button, Grid, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import moodImage from './MoodImage';

const GET_CHECKIN_INSIGNTS = gql`
  query GetMoodAverage {
    getInsights {
      averagePercentage
      moodScore
    }
    getTotalCheckin {
        total
    }
    getUserCheckIns{
        id
        moodScore
        feeling
        comment
        checkInTime
    }
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
     
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function CheckInInsignts() {

    const classes = useStyles()

    const { loading, error, data } =  useQuery(GET_CHECKIN_INSIGNTS);
    console.log(data);
    
    if (loading) return <p>Loading ...</p>;

    const userCheckIns = data["getUserCheckIns"];

    return ( 
        <Container>
            <Link to={"/new"}>
            <Button variant="contained" color="primary" >
              + How's your day going today ?
            </Button>
            </Link> 

            <Grid container alignItems="center">
                <Grid item xs={2}>
                <img width="100%" alt={data["getInsights"]["moodScore"]} src={moodImage(data["getInsights"]["moodScore"])} />
                </Grid>
                
                <Grid item xs={4}>
                    <Typography variant="h3" component="h2"  gutterBottom>
                        {data["getInsights"]["averagePercentage"]}%
                    </Typography>
                    <small>Based on {data["getTotalCheckin"]["total"]} entries</small>
                </Grid>
            </Grid>
            <Divider/>

            <Grid container alignItems="center">
            <List  className={classes.root} >
                {
                    userCheckIns.map(( eachCheckIn) => {
                        const checkInTime = new Date(parseInt(eachCheckIn.checkInTime))
                        return(
                            <ListItem key={eachCheckIn.id} button alignItems="flex-start">
                                <ListItemText>
                                    {
                                    
                                    Intl.DateTimeFormat('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                      }).format(checkInTime)
                                      
                                    }                                   
                                </ListItemText>

                                <ListItemText>
                                    {
                                    
                                    Intl.DateTimeFormat('en-GB', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                      }).format(checkInTime)
                                      
                                    }                                   
                                </ListItemText>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={eachCheckIn.moodScore}
                                        src={moodImage(eachCheckIn.moodScore)}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    {eachCheckIn.feeling}                                   
                                </ListItemText>
                                <ListItemText>
                                    {eachCheckIn.comment}                                   
                                </ListItemText>
                                <Divider/>
                            </ListItem>
                            
                        )
                        
                    })
                }
            </List>
            
            </Grid>

        </Container>
    )
}