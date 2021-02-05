import React from 'react';
import '../App.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import SideBar from '../SideBar/SideBar';
import SavedPopUp from '../SavedPopUp';
import styles from '../app.module.css';

class EditAppointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                { url: '/Appointment', title: 'Appointment Home' },
                { url: '/Appointment/Appointments', title: 'View All Appointments' },
                { url: '/Appointment/Create', title: 'Create Appointment' },
            ],
            saveModal: false,
            title: 'Appointment saved!',
            savedBackLink: "/Appointment/Appointment",
            button: "Back To Appointment",
            serviceToggle: false,
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

    componentDidMount() {
        document.title = "Edit Appointment | Body Contouring Clinic";
    }
    render() {
        return (
            <>
                <br /><br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <SideBar items={this.state.items} />
                    <div className="col-md-6">
                    <h2 className={styles.appointmentTitle}>Edit Appointment</h2>
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col xs={8}>
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                    Service(s):
                                    </Form.Label>
                                    <Col sm="8" style={{marginLeft: '0px'}} className="row">
                                        <Form.Control inline as="select" className="col-md-7">
                                            <option>Active air oxygen therapy</option>
                                            <option>Green peel</option>
                                            <option>Skin rejuventation</option>
                                            <option>laser hair removal</option>
                                        </Form.Control>
                                        <Button onClick={this.multipleService} style={{marginLeft: '50px'}}>Add Services</Button>
                                            
                                    </Col>
                                </Form.Group>
                                {this.state.serviceToggle && (                                                                                    
                                    <Form.Group as={Row}>
                                    <Form.Label column sm="4"></Form.Label>
                                        <Col sm="8" style={{marginLeft: '0px'}} className="row">
                                                <Form.Control inline as="select" className="col-md-7">
                                                    <option>Active air oxygen therapy</option>
                                                    <option>Green peel</option>
                                                    <option>Skin rejuventation</option>
                                                    <option>laser hair removal</option>
                                                </Form.Control>
                                                
                                        </Col>
                                    </Form.Group>
                                )}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                    Technician:
                                    </Form.Label>
                                    <Col sm="8">
                                            <Form.Control as="select">
                                                <option>Piper Chapman</option>
                                                <option>Alex Vause</option>
                                                <option>Daya Diaz</option>
                                                <option>Tasha Jefferson</option>
                                            </Form.Control>        
                                    </Col>
                                </Form.Group>
                                    
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Date
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="date" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Time
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="time" />
                                    </Col>
                                </Form.Group>        
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Contact Number:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="647-596-9521" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label column sm="4">
                                        Special Request:
                                    </Form.Label>        
                                    <Col sm="8">
                                        <Form.Control as="textarea" rows={3} placeholder="Vanilla essential oil" />
                                    </Col>
                                </Form.Group>
                            </Form>
                            </Col>
                            <Col></Col>
                            </Row>
                            <Row >
                                <Col></Col>
                                <Col md="auto"><Button variant="outline-secondary" href="/Appointment/Appointment">Cancel</Button></Col>
                                <Button variant="outline-info" onClick={this.showSave}>Save</Button>
                                <SavedPopUp show={this.state.saveModal} text={this.state.title} href={this.state.savedBackLink} button={this.state.button} />
                            </Row>
                    </Container>
                    </div>
                </div>
 
            </>
        )
    }
}

export default EditAppointment;