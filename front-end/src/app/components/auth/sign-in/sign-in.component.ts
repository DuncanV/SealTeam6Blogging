import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SnackbarComponent} from "../../snackbar/snackbar.component";
import {SNACKBAR_DURATION} from "../../../common/Constants/Constants";
import {EPasswordsMessages, ESnackBarType} from "../../../common/Models/Enums";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  isDarkTheme: boolean = false;

  signup: boolean = false;
  action: string = "Sign In";
  signUpForm: any;
  hide: boolean = true;

  usernameSignIn: string = "";
  passwordSignIn: string = "";

  humanQuestion: boolean = false;
  humanChecked: boolean = false;
  firstTimeLogin: boolean = true;

  signedIn: boolean | undefined;

  private subscriptions = new Subscription();

  constructor(private service: UsersService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data: any) {
    this.signup = false;
    this.action = "Sign In";
    this.isDarkTheme = data.isDarkTheme;
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
    let autoReject = !(this.firstTimeLogin || this.humanChecked == this.humanQuestion);

    this.service.login(this.usernameSignIn, this.passwordSignIn, autoReject);
    this.firstTimeLogin = false;
    this.humanQuestion = !this.humanQuestion;
  }

  signUp(): void {
    let validSignUp = true;

    if(!this.CheckRegex(this.signUpForm.filter((input: { label: string })=> input.label =="Enter Password"))){
      validSignUp = false;

      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: SNACKBAR_DURATION,
        panelClass: [ESnackBarType.error],
        data: {
          message: EPasswordsMessages.invalidPassword,
        }
      });
    }

    let password = this.signUpForm.filter((input: { label: string })=> input.label.includes("Enter Password"))[0];
    let passwordConfirm = this.signUpForm.filter((input: { label: string })=> input.label.includes("Confirm Password"))[0];

    if(password.value !== passwordConfirm.value){
      validSignUp = false;

      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: SNACKBAR_DURATION,
        panelClass: [ESnackBarType.error],
        data: {
          message: EPasswordsMessages.passwordDoNotMatch,
        }
      });
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
