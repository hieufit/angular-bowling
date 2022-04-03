import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BowlingComponent} from './bowling/bowling.component';
import {BowlingFormComponent} from './bowling-form/bowling-form.component';
import {ToastrModule} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {BowlingService} from "./bowling.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    BowlingComponent,
    BowlingFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
    FormsModule
  ],
  providers: [
    BowlingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
