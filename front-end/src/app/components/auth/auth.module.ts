import {NgModule} from "@angular/core";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignOutComponent} from "./sign-out/sign-out.component";

@NgModule({
  exports: [
    SignInComponent,
    SignOutComponent
  ],
  declarations: [SignInComponent, SignOutComponent],
})
export class AuthModule {}
