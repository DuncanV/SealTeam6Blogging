import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogsModule } from './components/blogs/blogs.module';
import { ToolbarsModule } from './components/Toolbars/toolbars.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { BlogsService } from './services/blogs.service';
import { UsersService } from './services/users.service';
import {AuthInterceptor} from "./common/AuthInterceptor";
import { CreateBlogComponent } from './components/blogs/create-blog/create-blog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DebounceClickDirective } from './common/debounce-click.directive';
import {ThemeService} from "./services/theme.service";
import {AuthModule} from "./components/auth/auth.module";

@NgModule({
  declarations: [AppComponent, ProfileComponent, CreateBlogComponent, SnackbarComponent, DebounceClickDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarsModule,
    BlogsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    AuthModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    FlexModule,
    MatDividerModule,
    MatMenuModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    BlogsService,
    UsersService
  ],
  bootstrap: [AppComponent],
  exports: [
    DebounceClickDirective
  ]
})
export class AppModule{}
