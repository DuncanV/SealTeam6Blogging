import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {IUser} from '../../../common/Interfaces';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signup: boolean = false;
  action: string = "Sign In";
  signUpForm: any;
  hide: boolean = true;

  usernameSignIn: string = "";
  passwordSignIn: string = "";

  signedIn: boolean | undefined;

  private subscriptions = new Subscription();

  constructor(private service: UsersService) {
    this.signup = false;
    this.action = "Sign In";
  }

  ngOnInit(): void {
    this.setupSubscriptions();

    this.setupSignUpForm();
  }

  setupSubscriptions() {
    this.subscriptions.add(
      this.service.signedIn$.subscribe(value => {
        this.signedIn = value;
      })
    );
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
    this.service.login(this.usernameSignIn, this.passwordSignIn);
  }

  signUp(): void {
    let validSignUp = true;

    if(!this.CheckRegex(this.signUpForm.filter((input: { label: string })=> input.label =="Enter Password"))){
      //Display password invalid
      validSignUp = false;
    }

    let password = this.signUpForm.filter((input: { label: string })=> input.label.includes("Enter Password"))[0];
    let passwordConfirm = this.signUpForm.filter((input: { label: string })=> input.label.includes("Confirm Password"))[0];

    if(password.value !== passwordConfirm.value){
      //display passwords dont match error
      validSignUp = false;
    }

    if (validSignUp) {
      this.service.signup(this.buildUser());
    }
  }

  buildUser() {
    return {
      username: this.signUpForm[0].value,
      firstname: this.signUpForm[1].value,
      lastname: this.signUpForm[2].value,
      password: this.signUpForm[3].value,
      passwordConfirmed: this.signUpForm[4].value,
    };
  }

  forgotPassword(): void {

  }

  CheckRegex(input:any): RegExpMatchArray | null{
    return input[0].value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
