import React, { Component } from 'react';
import * as firebase from 'firebase';

class App extends Component {
  state = {
    logged: false,
    name: '',
    email: ''
  };
  onAuthStateChanged = user => {
    console.log(user);
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
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          window.alert('usuario logado!');
          var token = result.credential.accessToken;
          var user = result.user;
          console.log('ok', token, user);
        }
      })
      .catch(function(error) {
        window.alert('erro no login: ' + error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('nok', errorCode, errorMessage);
      });
  };

  doAuth = provider => {
    firebase.auth().signInWithRedirect(provider);
  };

  onFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.doAuth(provider);
  };
  onGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.doAuth(provider);
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
          <br />
          <button onClick={this.onGoogle} hidden={this.state.logged}>
            Login Google
          </button>
          <br />
          <button onClick={this.onFacebook} hidden={this.state.logged}>
            Login Facebook
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
