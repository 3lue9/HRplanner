// register.component.tsx
import React, { Component } from "react";
import AuthService from "../services/auth.service";

type Props = {};

type State = {
  email: string;
  password: string;
  fullName: string;
  message: string;
  OrgCode: string;
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      OrgCode: "",
      message: ""
    };
  }

  handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, fullName, OrgCode } = this.state;

    AuthService.register(email, password, fullName, OrgCode).then(
      response => {
        this.setState({
          message: "Registration successful!",
        });
      },
      error => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
        });
      }
    );
  };

  onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    });
  };

  onChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      fullName: e.target.value,
    });
  };

  onChangeOrgCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      OrgCode: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={this.state.fullName}
              onChange={this.onChangeFullName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="orgCode">Org Code</label>
            <input
              type="text"
              className="form-control"
              name="orgCode"
              value={this.state.OrgCode}
              onChange={this.onChangeOrgCode}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block">Sign Up</button>
          </div>

          {this.state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}
