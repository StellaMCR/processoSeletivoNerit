import React, { Component } from 'react';
import TabSchedule from './components/TabSchedule'
import HeadSelect from './components/HeadSelect'
import dados from './dados'
import dayjs from 'dayjs'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      agendas: dados,
      date: dayjs(),
    }
  }

editar = (idAtendente, idAppointment, notes, status )=>{
  const agendas = this.state.agendas;
  const agenda = this.state.agendas[idAtendente];
  agenda.appointments[idAppointment].notes = notes;
  agenda.appointments[idAppointment].status = status;
  agendas.splice(idAtendente,1,agenda);
  this.setState({agendas:agendas})
}
deletar = (idAtendente, idAppointment)=>{
  
  const agendas = this.state.agendas;
  const agenda = this.state.agendas[idAtendente];

  agenda.appointments.splice(idAppointment,1);
  agendas.splice(idAtendente,1,agenda);
  this.setState({agendas:agendas})
    
}
adicionar = (idAtendente, notes, status, begin, end, data )=>{
  const agendas = this.state.agendas;
  const agenda = this.state.agendas[idAtendente];
  const beginTime = `${dayjs(data).format('YYYY-MM-DD')} ${begin}` 
  const endTime = `${dayjs(data).format('YYYY-MM-DD')} ${end}` 
  const newAppointment = {notes, status, beginTime, endTime};
  agenda.appointments.push(newAppointment);
  agendas.splice(idAtendente,1,agenda);
  this.setState({agendas:agendas})
}

changeDate = (newD)=>{
  const newDate = dayjs(newD.target.value);
  this.setState({date: newDate});
}

filterAppointments

  render() {
    return (
      <div>
        <HeadSelect date={this.state.date} changeDate={this.changeDate}/>
        <br/>
        <TabSchedule agendas={this.state.agendas} editar={this.editar} deletar={this.deletar} date={this.state.date} adicionar={this.adicionar}/>
      </div>
    );
  }
}

export default App;
