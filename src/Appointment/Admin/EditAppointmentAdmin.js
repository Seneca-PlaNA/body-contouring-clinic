import React from 'react';
import '../../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import SideBar from '../../SideBar/SideBar';
// import SavedPopUp from '../../SavedPopUp';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class EditAppointmentAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { url: '/Appointment', title: 'Appointment Home' },
        { url: '/Appointment/Admin', title: 'View All Appointments' },
        { url: '/Appointment/Admin/Create', title: 'Create Appointment' },
      ],
      saveModal: false,
      savedBackLink: '/Appointment/Admin',
      button: 'Back To Appointment',
      title: 'Appointment Saved!',
      serviceToggle: false,
      appointment: [],
      customer: [],
      schedule: [],
      times: [],
      date: [],
      service: [],
      staff: [],
      completed: false,
      allServices: [],
      allTechnicians: [],
      filterData: [],
      technician:[],
    };
    this.showSave = this.showSave.bind(this);
    this.hideSave = this.hideSave.bind(this);
  }

  multipleService = () => {
    this.setState({ serviceToggle: !this.state.serviceToggle });
  };

  showSave = () => {
    this.setState({ saveModal: true });
  };

  hideSave = () => {
    this.setState({ saveModal: false });
  };

  handlSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/appointment/${this.props.id}`,{
      method: "PUT",
      body: JSON.stringify(this.state.appointment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})
    .then((response) => (response.json()))
    .then(()=> this.setState({completed: true}))
    .catch((err) => (console.log(err)));
  }

  onContactNumChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        contactNumber: event.target.value,
      }
    }));
  }

  onSpecialRequestChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        specialRequest: event.target.value,
      }
    }));
  }

  onServiceChange(event) {
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        service: event.target.value,
      }
    }));
  }

  onAddServiceChange(event){
    this.setState(() => ({
      appointment:{
        ...this.state.appointment,
        service: event.target.value,
      }
    }));
  }

  onDateChange(event){
    var pureDate = (event.target.value).split("-");
    var searchDate = pureDate[1] + "/" + pureDate[2] +"/" + pureDate[0];
    console.log(searchDate);
    fetch(`${process.env.REACT_APP_API_URL}/workSchedule?date=${searchDate}`)
    .then(response => response.json())  
    .then((data)=>{
      console.log(data);
      this.setState({
        filterData: data
      })
    });
  }

  onTimeChange(event){
    var technicianData = [];
    this.state.filterData.forEach(function(data){

      data.times.forEach((time)=>{
          if(time._id == event.target.value)
          {
            // technicianData = technicianData.concat(data.staff);
            technicianData = technicianData.concat(data);
          }
      });
    })
    this.setState({
      technician: technicianData,
  }); 
  }

  onScheduleChange(event){
    console.log("id: "+event.target.value);
    this.setState({
      appointment:{
        ...this.state.appointment,
        schedule: event.target.value,
      }
    });
  }

  // onStaffChange(event){
  //   this.setState(() => ({
  //     appointment:{
  //       ...this.state.appointment,
  //       schedule: {
  //         staff: event.target.value,
  //       }
  //     }
  //   }));
  // }

  onDateFormatChange(dateValue){
    var pureDate = (dateValue).split("/");
    var formDate = pureDate[0] + "-" + pureDate[1] +"-" + pureDate[2];
    return formDate;
  }
  
  componentDidMount() {
    document.title = 'Edit New Appointment | Body Contouring Clinic';
    fetch(`${process.env.REACT_APP_API_URL}/appointment/${this.props.id}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        appointment: data,
        customer: data.customer.account,
        schedule: data.schedule,
        times: data.schedule.times[0],
        date: data.schedule.date,
        staff: data.schedule.staff,
        service: data.service
      });

      fetch(`${process.env.REACT_APP_API_URL}/services`)
      .then(response => response.json())  
      .then((data)=>{
        this.setState({
          allServices: data
        })
      });

      fetch(`${process.env.REACT_APP_API_URL}/staffs`)
      .then(response => response.json())  
      .then((data)=>{
        this.setState({
          allTechnicians: data
        })
      });
  });
  }

  render() {
    if(this.state.completed)
    {
      return <Redirect push to={{
        pathname: '/Appointment/Admin'
      }}/>
    }
    return (
      <>
        <br />
        <br />
        <div className="row">
          <div className="col-md-1"></div>
          <SideBar items={this.state.items} />
          <div className="col-md-8" style={{ 'margin-left': '80px' }}>
            <h2 className="PageTitle">Edit Appointment</h2>
            <Container>
              <Row>
                <Col>
                  <Form onSubmit={this.handlSubmit.bind(this)}>
                    <Form.Group as={Row} inline>
                      <Form.Label column sm="4">
                        Service(s):
                      </Form.Label>
                      <Col sm="8" style={{ marginLeft: '0px' }} className="row">
                        <Form.Control inline controlId="service" as="select" className="col-md-7" value={this.state.service._id} onChange={this.onServiceChange.bind(this)}>
                          <option value="">-- select service --</option>
                          {this.state.allServices.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option key={result._id} value={result._id}>{result.name}</option>
                          ))}
                        </Form.Control>
                        <Button onClick={this.multipleService} style={{ marginLeft: '35px' }}>
                          Add Services
                        </Button>
                      </Col>
                    </Form.Group>
                    {this.state.serviceToggle && (
                      <Form.Group as={Row}>
                        <Form.Label column sm="4"></Form.Label>
                        <Col sm="8" style={{ marginLeft: '0px' }} className="row">
                          <Form.Control inline as="select" className="col-md-7">
                          <option value="">-- select service --</option>
                          {this.state.allServices.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.name}</option>
                          ))}
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    )}
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Date
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control type="date" onChange={this.onDateChange.bind(this)}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Time
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control inline as="select" onChange={this.onTimeChange.bind(this)}>
                          <option value="">-- select time --</option>
                          {this.state.filterData.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            result.times.map((timeSlot)=>(
                              // eslint-disable-next-line react/jsx-key
                              <option value={timeSlot._id}>{timeSlot.time}</option>
                            ))
                          ))}
                          </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="staff">
                      <Form.Label column sm="4">
                        Technician:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="select" onChange={this.onScheduleChange.bind(this)}>
                          <option value="">-- select technician --</option>
                          {this.state.technician.map((result)=>(
                            // eslint-disable-next-line react/jsx-key
                            <option value={result._id}>{result.staff.account.firstName} {result.staff.account.lastName}</option>
                          ))}

                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Contact Number:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control placeholder="647-596-9521" value={this.state.appointment.contactNumber} onChange={this.onContactNumChange.bind(this)}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                      <Form.Label column sm="4">
                        Special Request:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control as="textarea" rows={3} placeholder="Vanilla essential oil" value={this.state.appointment.specialRequest} onChange={this.onSpecialRequestChange.bind(this)}/>
                      </Col>
                    </Form.Group>
                    <Row>
                      <Col></Col>
                      <Col md="auto">
                        <Button variant="outline-secondary" href="/Appointment/Admin">
                          Cancel
                        </Button>
                      </Col>
                      <Button action type="submit" variant="outline-info">
                        Save
                      </Button>
                    </Row>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
            </Container>
            <Container style={{ 'margin-top': '50px', cursor: 'pointer' }}></Container>
          </div>
        </div>
      </>
    );
  }
}

EditAppointmentAdmin.propTypes = {
  id : PropTypes.string.isRequired
}

export default EditAppointmentAdmin;
