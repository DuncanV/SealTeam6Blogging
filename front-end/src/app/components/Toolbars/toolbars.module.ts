import {NgModule} from "@angular/core";
import {StsNavComponent} from "./sts-nav/sts-nav.component";
import {StsFooterComponent} from "./sts-footer/sts-footer.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@NgModule({
  exports: [
    StsNavComponent,
    StsFooterComponent
  ],
  declarations: [StsNavComponent, StsFooterComponent],
  imports: [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      CommonModule,
  ]
})
export class ToolbarsModule {
}
