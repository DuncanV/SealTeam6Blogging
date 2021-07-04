import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signup: boolean = false;
  action: string ="Sign In";
  usernameSignUp:string = "";
  nameSignup:string = "";
  emailSignup:string = "";
  passwordSignup:string = "";
  passwordConfirmSignup:string = "";
  emailSignIn:string = "";
  passwordSignIn:string = "";
  constructor() {
    this.signup = false;
    this.action = "Sign In";
  }

  ngOnInit(): void {
  }

  toggleSignup(): void{
    this.signup = !this.signup;
    this.action = this.signup?"Sign Up":"Sign in";
    this.clearInputs()
  }

  clearInputs(): void{
    this.usernameSignUp = "";
    this.nameSignup = "";
    this.emailSignup = "";
    this.passwordSignup = "";
    this.passwordConfirmSignup = "";
    this.emailSignIn = "";
    this.passwordSignIn = "";
  }

  signIn():void{

  }

  signUp():void{

  }

  forgotPassword():void{

  }

}
