import {Component, OnInit} from '@angular/core';
import {createInjectableType} from "@angular/compiler";

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
        value: '',
        type:"text"
      },
      {
        label: 'Enter First Name',
        value: '',
        type:"text"
      },
      {
        label: 'Enter Last Name',
        value: '',
        type:"text"
      },
      {
        label: 'Enter Email Address',
        value: '',
        type:"text"
      },
      {
        label: 'Enter Password',
        value: '',
        type:"password"
      },
      {
        label: 'Confirm Password',
        value: '',
        type:"password"
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
    if(!this.CheckRegex(this.signUpForm.filter((input: { label: string })=> input.label =="Enter Password"))){
      //Display password invalid
    }
    let password = this.signUpForm.filter((input: { label: string })=> input.label.includes("Enter Password"))[0];
    let passwordConfirm = this.signUpForm.filter((input: { label: string })=> input.label.includes("Confirm Password"))[0];
    if(password.value !== passwordConfirm.value){
      //display passwords dont match error
    }
  }

  forgotPassword(): void {

  }

  CheckRegex(input:any): RegExpMatchArray | null{
    return input[0].value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})');
  }

}
