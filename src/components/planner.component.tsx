import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Calendar from "./subcomponents/Calendar";
import "./css/calendar.style.css"

type Props = {};

type State = {
  content: string;
}

export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
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

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <Calendar />
        </header>
      </div>
    );
  }
}
