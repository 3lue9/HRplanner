import { Component } from "react";

import UserService from "../services/user.service";

type Props = {};

type State = {
  content: string;
}

export default class User extends Component<Props, State> {
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
          <h3>welocme to the private user's page</h3>
        </header>
      </div>
    );
  }
}
