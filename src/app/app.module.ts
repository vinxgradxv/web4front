import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFormComponent} from "./login-page/user-form/user-form.component";
import {HeaderComponent} from "./common-components/header/header.component";
import {LoginService} from "./shared/login-service/login.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EntryFormComponent} from "./main-page/entry-form/entry-form.component";
import {GraphComponent} from "./main-page/graph/graph.component";

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    HeaderComponent,
    EntryFormComponent,
    GraphComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
