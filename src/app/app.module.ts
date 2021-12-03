import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFormComponent} from "./login-page/user-form/user-form.component";
import {HeaderComponent} from "./common-components/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
