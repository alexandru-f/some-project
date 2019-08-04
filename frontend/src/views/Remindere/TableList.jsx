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


class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      reminderType: '',
      reminderName: '',
      startDate: new Date(),
      endDate: new Date(),
      UID: '5d3c2d49a4915c3e58960292'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }
  // const { classes } = props;

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
      "reminderName": this.state.reminderName,
      "reminderType": this.state.reminderType,
      "UID": this.state.UID,
      "startDate": this.state.startDate,
      "endDate": this.state.endDate
    };

    console.log(formData);
    
    axios('/new-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
  }

  render() {
    return (
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={this.state.classes.cardTitleWhite}>Simple Table</h4>
              <p className={this.state.classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Country", "City", "Salary"]}
                tableData={[
                  ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                  ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                  ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                  ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                  ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                  ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem> */}
        <form>
            <div>
              <label>Reminder Name</label>
              <input 
                type="text" 
                name="reminderName" 
                value={this.state.reminderName} 
                onChange={this.handleInputChange} 
              />
            </div>
            
            <div>
              <label>Reminder Type</label>
              <select 
                name="reminderType" 
                value={this.state.reminderType} 
                onChange={this.handleInputChange}
              >
                <option>masina</option>
                <option>casa</option>
                <option>altele</option> 
              </select>
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
            <input 
              type="string" 
              name="UID" 
              value={this.state.UID} 
            />
            <div>
              <input 
                type="submit" 
                value="Trimite" 
                onClick={this.handleSubmit}
              />
            </div>
          </form>
      </GridContainer>
    );
  }
}

// TableList.propTypes = {
//   classes: PropTypes.object
// };

export default withStyles(styles)(TableList);
