import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import OrgService from "../services/org.service";
import GetInfoByDay from "../services/org.service"
  


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://refctsbzuhtipgaovorf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZmN0c2J6dWh0aXBnYW92b3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1NDE3MzEsImV4cCI6MjAzNjExNzczMX0._7ft6GQigjmLbws3xDjN-c_f-RCX3TL0mOK5Pk0OOTA';

export const supabase = createClient(supabaseUrl, supabaseKey);

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string } | null
};

export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: null
    };
  }

  async componentDidMount() {
    const currentUser = await AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    } else {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const accessToken = user.id; 
        this.setState({ currentUser: { ...currentUser, accessToken }, userReady: true });
      } else {
        console.error("User is null");
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady && currentUser ? (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.name || 'Error fetching username'}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Name:</strong> {currentUser.name || 'Default Name'}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <hr></hr>
            <div>
              <strong>Org code: </strong>{currentUser.orgCode}
              <div className="form-group">

                <button
                    className="btn btn-primary btn-block"
                    onClick={() => OrgService.WriteToDB(currentUser.orgCode)}>
                    dbg - add and read form db
                </button>

                <button
                    className="btn btn-primary btn-block"
                    onClick={() => OrgService.GetInfoByDay(currentUser.orgCode, "20/07/2024")}>
                    date check
                </button>

                <button
                    className="btn btn-primary btn-block"
                    onClick={() => OrgService.verifyORG(currentUser.orgCode)}>
                    verify org
                </button>


              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
