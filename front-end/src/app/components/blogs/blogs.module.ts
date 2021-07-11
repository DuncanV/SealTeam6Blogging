import {NgModule} from "@angular/core";
import {BlogComponent} from "./blog-component/blog.component";
import {BlogModalComponent} from "./blog-modal/blog-modal.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {BlogContainerComponent} from "./blog-container/blog-container.component";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AppModule} from "../../app.module";

@NgModule({
  exports: [
    BlogComponent,
    BlogModalComponent,
    BlogContainerComponent
  ],
  declarations: [BlogComponent, BlogModalComponent, BlogContainerComponent],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class BlogsModule {}
