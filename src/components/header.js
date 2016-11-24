import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks(){
    if(this.props.authenticated){
      //show link to log out
      return  <li className="nav-item" >
                <Link className="nav-link" to="/logout">Log Out</Link>
              </li>
    }else{
      //show login or register
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,

        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/register">Register</Link>
        </li>
      ];
    }
  }

  render(){
    return (
      <nav className="navbar navbar-light">
        <Link to ="/" className="navbar-brand">React App </Link>
        <ul className = "nav navbar-nav">
            {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
