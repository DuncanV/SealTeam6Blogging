import {NgModule} from "@angular/core";
import {BlogComponent} from "./blog-component/blog.component";
import {BlogModalComponent} from "./blog-modal/blog-modal.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  exports: [
    BlogComponent,
    BlogModalComponent
  ],
  declarations: [BlogComponent, BlogModalComponent],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    CommonModule,
    MatDialogModule
  ]
})
export class BlogsModule {}
