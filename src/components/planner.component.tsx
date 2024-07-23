import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Calendar from "./calendar/Calendar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectedDay } from "../types/types";

import orgService from "../services/org.service";
import DateService from "../services/date.service"
import "./calendar/Calendar.css"

type Props = {};

type State = {
  content: string;
  selectedDay: SelectedDay;
  currentUser: {
    orgCode: string;
    // add other properties as needed
  } | null;
};

export default class Planner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: "",
      selectedDay: {
        date: -1,
        month: -1,
        year: -1
      },
      currentUser: null // Initialize as null or with default values
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data,
          currentUser: response.data.currentUser // adjust according to actual data structure
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  handleSelectDay = (selectedDay: SelectedDay) => {
    this.setState({ selectedDay });
  };

  render() {
    const { currentUser, selectedDay } = this.state;
    const formattedDate = `${selectedDay.date}/${selectedDay.month + 1}/${selectedDay.year}`;

    return (
      <div className="container">
        <Calendar onSelectDay={this.handleSelectDay} />
        {selectedDay.date !== -1 && (
          <div>
            <div className="selectedDte"><h1>Selected Day: {selectedDay.date}/{selectedDay.month + 1}/{selectedDay.year}</h1></div>
            <div className="selectedDte"><h1>Selected Day as epoch timestamp: {DateService.dateToEpoch(formattedDate)}</h1></div>
            {currentUser && (
              <div className="selectedDte">
                <h1 className="WebPlanner">
                  {`get info by day ${orgService.GetInfoByDay(currentUser.orgCode, formattedDate)}`}
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
