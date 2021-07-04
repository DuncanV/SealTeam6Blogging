import {NgModule} from "@angular/core";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@NgModule({
    exports: [
        SignInComponent,
        SignOutComponent
    ],
    declarations: [SignInComponent, SignOutComponent],
  imports: [
    MatDialogModule,
    MatIconModule,
    CommonModule
  ]
})
export class AuthModule {}
