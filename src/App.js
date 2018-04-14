import React, { Component } from 'react';
import * as firebase from 'firebase';

class App extends Component {
  state = {
    logged: false,
    name: '',
    email: ''
  };
  onAuthStateChanged = user => {
    if (user) {
      this.setState({
        logged: true,
        name: user.displayName,
        email: user.email
      });
    } else {
      this.setState({
        logged: false,
        name: '',
        email: ''
      });
    }
  };
  componentDidMount = () => {
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(this.onAuthStateChanged);
  };

  onGooglePopup = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  };
  onGoogleRedirect = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  };
  onEmailCreate = () => {
    const email = window.prompt('email');
    const password = window.prompt('password');
    this.auth.createUserWithEmailAndPassword(email, password).catch(err => {
      window.alert(err.message);
      this.onAuthStateChanged(null);
    });
  };
  onEmailSignIn = () => {
    const email = window.prompt('email');
    const password = window.prompt('password');
    this.auth.signInWithEmailAndPassword(email, password).catch(err => {
      window.alert(err.message);
      this.onAuthStateChanged(null);
    });
  };
  onSignOut = () => {
    console.log('signing out');
    this.auth.signOut();
  };
  renderUserInfo = () => {
    if (this.state.logged) {
      return (
        <div>
          <p>Usuário logado:</p>
          <p>{this.state.name}</p>
          <p>{this.state.email}</p>
        </div>
      );
    } else {
      return <p>Realize seu Login</p>;
    }
  };
  render = () => {
    return (
      <div>
        <center>
          {this.renderUserInfo()}
          <button onClick={this.onGooglePopup} hidden={this.state.logged}>
            Login Google (popup)
          </button>
          <br />
          <button onClick={this.onGoogleRedirect} hidden={this.state.logged}>
            Login Google (redirect)
          </button>
          <br />

          <button onClick={this.onEmailCreate} hidden={this.state.logged}>
            Criar conta - email/senha
          </button>
          <br />
          <button onClick={this.onEmailSignIn} hidden={this.state.logged}>
            Login - email/senha
          </button>
          <br />

          <button onClick={this.onSignOut} hidden={!this.state.logged}>
            signout
          </button>
          <br />
        </center>
      </div>
    );
  };
}

export default App;
