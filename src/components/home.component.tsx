import { Component } from "react";

import UserService from "../services/user.service";

type Props = {};

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
     }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>welcome to <strong>HRplanner</strong> the first planner made by equestrians for equestrians</h3> <br></br><br></br>
            to start login or register
        </header>
      </div>
    );
  }
}
