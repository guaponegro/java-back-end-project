import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css"; //{ Input, List} from
import './App.css';
import WeatherContainer from './WeatherContainer';
import Login from './Login';
import Navi from './Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import Profile from './Profile';

// Dark sky API key: 54027aaa136404819ab799aaa96235ce
// Google API key: AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg
class App extends Component {
  constructor(){
    super();
    this.state = {
      username: [],
      password: "",
      location: Number,
      logged_in: false,
      id: "",
      isOpen: false
    };
    this.toggle = this.toggle.bind(this)
  }
  handleInputs = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  submitRegistration = async (e) => {
    e.preventDefault();
    console.log("GOT HERE")
    console.log(this.state);
    try{
      console.log("GOT HERE, TOO")
      const createUser = await fetch('http://localhost:8080/user', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        } 
      });
      const parsedResponse = await createUser.json();
      console.log(createUser, ' this is response')
      if(parsedResponse.status == 200){
       
        this.setState({
          logged_in: true,
          // this isn't a real login - need to align it with the back-end to sort that out
          username: parsedResponse.username,
          location: parsedResponse.location,
          id: parsedResponse.id
        })
      } else if (parsedResponse.status == 500){
        console.log("INTERNAL SERVER ERROR")
      }
    }catch(err){
      console.log(err, " error")
    }
  }

  submitLogin = async (e) => {
    e.preventDefault();
    console.log(e)
    console.log("GOT LOGS")
    console.log(this.state)
    try{
      const loggedUser = await fetch('http://localhost:8080/login', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        } 
      });
      const parsedLogged = await loggedUser.json();
      console.log(loggedUser, ' login successful',parsedLogged)
      if(loggedUser.status == 200){
        console.log("here we go!!!");
        this.setState({
          logged_in: true,
          username: parsedLogged.username,
          location: parsedLogged.location,
          id: parsedLogged.id
        })
        console.log(parsedLogged,this.state);
        
      } else if (parsedLogged.status == 500){
        console.log("INTERNAL SERVER ERROR")
      }
    }catch(err){
      console.log(err, " error")
    }
  }

  deletedUser = async(id) => {
    console.log("delete user" + id);

    const deleted = await fetch("http://localhost:8080/user/" + this.state.id+"/delete", {
      //credentials: 'include',
        method: "DELETE"
    })
    this.setState({
      logged_in: false,
    })
    const deletedParsed = await deleted.json();
    console.log(deletedParsed)
  }

  submitEdits = async (e) => {
    e.preventDefault();
    try{
        const editedUser = await fetch("http://localhost:9000/users/" + this.state.id, {
          method: 'PUT',
          body: JSON.stringify(this.state),
          headers: {
            'Content-Type': 'application/json'
        } 
        });
        const parsedEdit = await editedUser.json();
        this.setState({
            username: parsedEdit.data.username,
            password: parsedEdit.data.password,
            location: parsedEdit.data.location,
        })
        console.log(this.state.location);
    }catch(err){
      console.log(err);
    }
  }

  handleLogout = async (e) => {
    console.log('GOT LOGOUT')
    this.setState({
      logged_in: false
    })
  }

  login = () => {
    return <Login submitRegistration={this.submitRegistration} handleInputs={this.handleInputs} submitLogin={this.submitLogin} logged_in={this.state.logged_in}/>
  }
  weatherContainer = () => {
    console.log(this.state.location+"going to weather"+"am i logged in?"+this.state.logged_in)
    return <WeatherContainer username={this.state.username} location={this.state.location} logged_in={this.state.logged_in} />
  }
  profile = () => {
    return <Profile handleInputs={this.handleInputs} username={this.state.username} password={this.state.password} location={this.state.location} submitEdits={this.submitEdits} id={this.state.id} isOpen={this.state.isOpen} toggle={this.toggle}/>
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    
    return (
      <div className="App">
        <Navi deletedUser ={this.deletedUser} username={this.state.username} id={this.state.id} logged_in={this.state.logged_in} handleLogout={this.handleLogout} toggle={this.toggle}/>
        {/* {this.state.isOpen ? <div/> : this.profile} */}
        <Switch>
          <Route exact path="/" render={this.login}/>
          <Route exact path="/login" render={this.login}/>
          <Route exact path="/weather" render={this.weatherContainer}/>
          <Route exact path="/user/edit" render={this.profile} />
        </Switch>
      </div>
    );
  }
}

export default App;