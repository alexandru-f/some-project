/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import DatePicker from "react-datepicker";
import axios from "axios";


import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import CustomInput from "components/CustomInput/CustomInput";
import { Select, MenuItem } from "@material-ui/core";
import { tsMethodSignature } from "@babel/types";
import Modal from 'react-modal';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth: '50%',
    width: '100%'
  }
};

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      reminderType: 'masina',
      reminderName: '',
      startDate: new Date(),
      endDate: new Date(),
      UID: '',
      reminders: [],
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    const { classes } = props;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  getReminders() {
    axios.get('http://localhost:8000/reminders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('cool-jwt')
      }
    })
    .then(res => {
      console.log(res);
      this.setState({
        reminders: res.data.reminders
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentWillMount() {
    const token = localStorage.getItem('cool-jwt');
    var jwtDecode = require('jwt-decode');
    var decoded = jwtDecode(token);
    this.setState({
      UID: decoded.userId
    });
    this.getReminders();
  }
  

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  handleSubmit (event) {
    event.preventDefault();
  
    const formData = {
      "name": this.state.reminderName,
      "type": this.state.reminderType,
      "UID": this.state.UID,
      "startDate": this.state.startDate,
      "endDate": this.state.endDate
    };

    console.log(formData);
    
    axios.post('http://localhost:8000/reminders', JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('cool-jwt')
      }
    }).then( res => {
      this.getReminders();
    }).catch(err => {
      console.log(err);
    });
  }

  deleteReminder (reminderID) {
    axios.delete('http://localhost:8000/reminders/' + reminderID, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('cool-jwt')
      }
    }).then ( res => {
      this.getReminders();
    })
    .catch( err => {
      console.log(err);
    });
  }

  editReminder (reminderID) {
    console.log('Selected Reminder ID: ' + reminderID);
  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <Card>
              <CardHeader color="primary">
                <h4 className={this.state.classes.cardTitleWhite}>Adauga reminder</h4>
              </CardHeader>
              <CardBody>
                <form>
                  <div>
                    <CustomInput
                      labelText="Nume reminder"
                      id="reminder-name"
                      formControlProps={{
                          fullWidth: false
                      }}
                      inputProps={{
                        name:"reminderName",
                        value:this.state.reminderName,
                        onChange:this.handleInputChange
                      }}
                    />
                  </div>
                  
                  <div>
                    <Select
                      value={this.state.reminderType}
                      onChange={this.handleInputChange}
                      inputProps={{
                        name: 'reminder-type',
                        id: 'reminder-type',
                      }}
                    >
                      <MenuItem value={'masina'}>Masina</MenuItem>
                      <MenuItem value={'casa'}>Casa</MenuItem>
                      <MenuItem value={'altele'}>Altele</MenuItem>
                    </Select>
                  </div>

                  <div>
                    <label>Start Date</label>
                    <DatePicker 
                      type="text" 
                      name="startDate" 
                      selected={this.state.startDate} 
                      dateFormat="MM/dd/yyyy"
                      onChange={this.handleStartDateChange} />
                  </div>

                  <div>
                    <label>End Date</label>
                    <DatePicker 
                      type="text" 
                      name="endDate"
                      selected={this.state.endDate} 
                      dateFormat="MM/dd/yyyy"
                      onChange={this.handleEndDateChange} 
                    />
                  </div>
                  <div>
                    <input 
                      type="submit" 
                      value="Trimite" 
                      onClick={this.handleSubmit}
                    />
                  </div>
                </form>
              </CardBody>
            </Card>
            <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          </Modal>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={this.state.classes.cardTitleWhite}>Remindere</h4>
            </CardHeader>
            <CardBody>
            <button onClick={this.openModal}>Open Modal</button>
              {this.state.reminders.length ? <Table
                tableHeaderColor="primary"
                tableHead={["Nume", "Tip", "Start Date", "End Date", "Actiuni"]}
                tableData={
                  this.state.reminders.map((item) => {
                    const startDate = <Moment format="DD/MM/YYYY">{item.startDate}</Moment>;
                    const endDate = <Moment format="DD/MM/YYYY">{item.endDate}</Moment>;
                    const actiuni = 
                    <div>
                      <button 
                        className="btn btn-outline-dark btn-sm" 
                        onClick={() => this.deleteReminder(item._id)}>
                          <i className="fas fa-trash-alt"></i>
                      </button>
                      <button 
                        className="btn btn-outline-dark btn-sm" 
                        onClick={() => this.editReminder(item._id)}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>;
                    return ([item.name, item.type, startDate, endDate, actiuni]);
                  })
                }
              /> : 'Nu ai remindere adaugate'}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          
        </GridItem>
      </GridContainer>
    );
  }
}

TableList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TableList);
