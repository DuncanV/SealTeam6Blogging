import {NgModule} from "@angular/core";
import {SignInComponent} from "./sign-in/sign-in.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {STSCommonModule} from "../../common/Common.module";

@NgModule({
  exports: [
    SignInComponent
  ],
  declarations: [SignInComponent],
  imports: [
    MatDialogModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTooltipModule,
    STSCommonModule
  ]
})
export class AuthModule {
}
