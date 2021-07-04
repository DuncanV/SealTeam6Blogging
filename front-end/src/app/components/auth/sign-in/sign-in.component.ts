import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signup: boolean = false;
  action: string = "Sign In";
  signUpForm: any;

  usernameSignIn: string = "";
  passwordSignIn: string = "";

  constructor() {
    this.signup = false;
    this.action = "Sign In";
  }

  ngOnInit(): void {
    this.setupSignUpForm();
  }

  toggleSignup(): void {
    this.signup = !this.signup;
    this.action = this.signup ? "Sign Up" : "Sign in";
    this.clearInputs()
  }

  setupSignUpForm() {
    this.signUpForm = [
      {
        label: 'Enter Username',
        value: ''
      },
      {
        label: 'Enter First Name',
        value: ''
      },
      {
        label: 'Enter Last Name',
        value: ''
      },
      {
        label: 'Enter Email Address',
        value: ''
      },
      {
        label: 'Enter Password',
        value: ''
      },
      {
        label: 'Confirm Password',
        value: ''
      }
    ];
  }

  clearInputs(): void {
    this.setupSignUpForm();
    this.usernameSignIn = "";
    this.passwordSignIn = "";
  }

  signIn(): void {

  }

  signUp(): void {

  }

  forgotPassword(): void {

  }

}
