import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Calendar from "./calendar/Calendar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectedDay } from "../types/types";

import "./calendar/Calendar.css"

type Props = {};

type State = {
  content: string;
  selectedDay: SelectedDay;
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
      }
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
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
    const { selectedDay } = this.state;
    return (
      <div className="container">
        <Calendar onSelectDay={this.handleSelectDay} />
        {selectedDay.date !== -1 && (
          <div>
            <div className="selectedDte"><h1>Selected Day: {selectedDay.date}/{selectedDay.month + 1}/{selectedDay.year}</h1></div> 
          </div>
        )}
      </div>
    );
  }
}
