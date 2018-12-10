import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Icon, Button } from 'semantic-ui-react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"




export default class NavBar extends Component {


  logout = () => {
    sessionStorage.clear("credentials")
    this.props.setAuth()
  }



  render() {
    return (
      <nav className="navbar navbar-light light-blue flex-md-nowrap shadow">
        <ul className="nav nav-pills">

          <li className="nav-item">
            <Link className="nav-link" to="/"><Icon color="yellow" name="clipboard" size="large" />Dashboard</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/"><Icon color="yellow" name="wrench" size="large" />Create</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/"><Icon color="yellow" name="book" size="large" />Library</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/"><Icon color="yellow" name="share square" size="large" />Share</Link>
          </li>

          
          

        </ul>
        <p id="navTagline">Welcome to Curd Nerd!</p>
        <div className="logbtn">
        {/* <Button animated color="teal" onClick={() => {
          document.location.href = 'http://localhost:3000/login'
        }}>
          <Button.Content visible>Login</Button.Content>
          <Button.Content hidden>
            <Icon name='sign-in alternate' />
          </Button.Content>
        </Button> */}
        <Button animated color="orange" 
            onClick={this.logout}>
          <Button.Content visible>Logout</Button.Content>
          <Button.Content hidden>
            <Icon name='sign-out alternate' />
          </Button.Content>
        </Button>
        </div>      
        </nav>
    )
  }
}
