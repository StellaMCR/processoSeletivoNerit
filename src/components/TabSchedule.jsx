import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import Appointment from "./Appointment"
import { Modal,  Paper, TextField, MenuItem, Button, Fab, Grid } from '@material-ui/core';
import dayjs from 'dayjs';
import AddIcon from '@material-ui/icons/Add';


function TabContainer({ classes, agenda, deletar, idAtendente, onEdit, data, openAdd }) {
  const appointments = agenda.appointments.map((appointment, index) =>({index:index, appointment: appointment}))
  return (
    <><List className={classes.list}>
      {appointments
        .filter(item => (data.day()===dayjs(item.appointment.beginTime).day()))
        .sort((a,b)=>(dayjs(a.appointment.beginTime)-dayjs(b.appointment.beginTime)))
        .map((item) =><Appointment appointment={item.appointment} hourSize={1} editar={onEdit} deletar={deletar} idAtendente={idAtendente} idAppointment={item.index} />

      )}
    </List>
    <Fab className={classes.fab} color="primary" onClick={()=>openAdd(idAtendente,data)}>
      <AddIcon/>
    </Fab>

    </>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '90%',
    margin: '0 auto',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    margin: '0 auto',
    marginTop: '3px',
  },
  paperModal: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '50%',
    left: '35%',
  },
  button: {
    margin: theme.spacing.unit *2,
  },
  fab:{
    left: '90%',
    margin:'20px',

  },
});

const status = [
  {
    value: 'agendado',
    label: 'Agendado',
  },
  {
    value: 'concluído',
    label: 'Concluído',
  },
];

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    open: false,
    openAdd: false,
    idAppointmentEdit:'',
    idAtendenteEdit:'',
    notasEdit:'',
    statusEdit:'',
    inicioEdit:'',
    fimEdit:'',
  
  };
/**
 * Para seleção das tabs
 */
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
 /**
 * Ações do modal para editar atendimento
 */
  handleOpen = ( idAppointmentEdit, idAtendenteEdit, notasEdit, statusEdit) => {
    this.setState({ open: true, idAppointmentEdit, idAtendenteEdit, notasEdit, statusEdit });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  onChangeNotas = (e) => {
    this.setState({ notasEdit: e.target.value });
  }
  onChangeStatus = (e) => {
    this.setState({ statusEdit: e.target.value });
  }
  onChangeInicio=(e)=>{
    this.setState({inicioEdit: e.target.value})
  }
  onChangeFim=(e)=>{
    this.setState({fimEdit: e.target.value})
  }
  /**
 * Ações do modal para adicionar atendimento
 */
  handleOpenAdd = ( idAtendenteEdit, data) => {
    this.setState({ openAdd: true, idAtendenteEdit, data });
  };
  handleCloseAdd = () => {
    this.setState({ openAdd: false });
  };


  render() {
    const { classes, theme, agendas, deletar, editar, date, adicionar } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {agendas.map((agenda, index) => <Tab label={agenda.name} key={index} />)}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {agendas.map((agenda, index) =>
             <TabContainer 
              agenda={agenda} 
              classes={classes} 
              key={index} 
              idAtendente={index} 
              deletar={deletar} 
              onEdit={this.handleOpen} 
              data={date}
              openAdd={this.handleOpenAdd} 
            />)}
        </SwipeableViews>
        {/**
        *Modal para editar agendamento
        */}
        <Modal
          aria-labelledby="modal-edit"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Paper className={classes.paperModal}>
            <TextField
              id="select-status"
              select
              label="Status Atendimento"
              className={classes.textField}
              onChange={this.onChangeStatus}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
              fullWidth
              value={this.state.statusEdit}
            >
              {status.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="write notes"
              label="Notas"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              value={this.state.notasEdit}
              onChange= {this.onChangeNotas}
            />
            <Button variant="contained" className={classes.button} onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button} 
                onClick={()=>{
                    editar(this.state.idAtendenteEdit, this.state.idAppointmentEdit, this.state.notasEdit, this.state.statusEdit)
                    this.handleClose();
                  }
                }
                >
              Salvar
            </Button>
          </Paper>

        </Modal>
        {/**
        *Modal para adicionar agendamento
        */}
        <Modal
          aria-labelledby="modal-add-appointment"
          aria-describedby="simple-modal-description"
          open={this.state.openAdd}
          onClose={this.handleCloseAdd}
        >
          <Paper className={classes.paperModal}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item direction="row">
                <TextField
                  id="select-status"
                  select
                  label="Status Atendimento"
                  className={classes.textField}
                  onChange={this.onChangeStatus}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={this.state.statusEdit}
                >
                  {status.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="write notes"
                  label="Notas"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={this.state.notasEdit}
                  onChange= {this.onChangeNotas}
                />
            </Grid>
            <Grid item direction="row" justify="space-between" alignItems="center">
                <TextField
                id="time"
                label="Início"
                onChange={this.onChangeInicio}
                value={this.state.inicioEdit}
                type="time"
                margin="normal"
                defaultValue=""
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <TextField
                id="time"
                label="Fim"
                onChange={this.onChangeFim}
                value={this.state.fimEdit}
                type="time"
                defaultValue=""
                margin="normal"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item direction="row" justify="flex-end" alignItems="flex-end">
                <Button variant="contained" className={classes.button} onClick={this.handleCloseAdd}>
                  Cancelar
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button} 
                    onClick={()=>{
                        adicionar(this.state.idAtendenteEdit, this.state.notasEdit, this.state.statusEdit, this.state.inicioEdit, this.state.fimEdit )
                        this.handleCloseAdd();
                      }
                    }
                >Salvar
                </Button>
            </Grid>
          </Grid>
          </Paper>

        </Modal>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
