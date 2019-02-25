import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import dayjs  from 'dayjs';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';
import { Grid, IconButton } from '@material-ui/core';


const styles = {
  card: {
    width: '90%',
    margin: '0 auto',
  },
  media: {
    height: 50,
    margin: '0 auto',

  },
  bigAvatar: {
    margin: '0 auto',
    width: 60,
    height: 60,
  },
  text:{
    margin: '0 auto',
    width: 150,
  },
  button: {
    width: 40,
    height: 40,
  },
};


const MediaCard = ({classes, date, changeDate}) =>{
  return (
      <Card className={classes.card}>
        <Avatar alt="logoHolder" src={`${process.env.PUBLIC_URL}/lotusLogo.png`} className={classes.bigAvatar} />
        <CardContent>
          <Grid container direction="row" justify="center">
            <Grid item>
              <TextField
                  id="date"
                  label="Agenda para o dia"
                  type="date"
                  defaultValue={dayjs().format("YYYY-MM-DD")}
                  className={classes.text}
                  onChange={(value)=>changeDate(value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
             {/* <Grid item>
                <IconButton  aria-label="add" color="primary">
                  <AddCircleRounded className={classes.button} />
                </IconButton>
              </Grid>*/}
          </Grid>
            
        </CardContent>
      </Card>
  );
}

export default withStyles(styles)(MediaCard);
