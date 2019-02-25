import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs'
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  avatar: {
    margin: 10,
    backgroundColor: 'green'
  },
  chip: {
    margin: theme.spacing.unit,
  },
 
});

const PaperSheet = (props) => {
  const { classes, appointment, hourSize, editar, deletar, idAtendente, idAppointment } = props;
  const hgt = (appointment.endTime - appointment.beginTime) * hourSize;

  return (
    <div>
      <Paper style= {{height: hgt }} className={classes.root} elevation={1}>
      <Grid  container direction="row" justify="space-between" alignItems="center">

        <Grid  item direction="row" justify="center" alignItems="center">
          <Typography component="p">
          <Chip label={`${dayjs(appointment.beginTime).format('HH:mm')} - ${dayjs(appointment.endTime).format('HH:mm')}`}/>
              <Chip label={`${appointment.status}`} className={classes.chip} variant="outlined" />
            </Typography>
            <Typography component="p">
              {`${appointment.notes}`}
            </Typography>
        </Grid>
            
        <Grid  item direction="column" justify="center" alignItems="center">
            <IconButton className={classes.button} aria-label="Delete" onClick={()=>deletar(idAtendente,idAppointment)}>
              <DeleteIcon />
            </IconButton>
            <IconButton className={classes.button} aria-label="Delete" onClick={()=>editar(idAppointment, idAtendente, appointment.notes, appointment.status)}>
            <EditIcon />
            </IconButton>
        </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);