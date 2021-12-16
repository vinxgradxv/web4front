import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFormComponent} from "./login-page/user-form/user-form.component";
import {HeaderComponent} from "./common-components/header/header.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {EntryFormComponent} from "./main-page/entry-form/entry-form.component";
import {GraphComponent} from "./main-page/graph/graph.component";
import {TableComponent} from "./main-page/table/table.component";
import {MainComponent} from "./main-page/main/main.component";
import {AppRoutingModule} from "./app-routing.module";
import {LogoutComponent} from "./main-page/logout/logout.component";
import {EntryService} from "./shared/services/entry.service";
import {AuthService} from "./shared/services/auth.service";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
import {MessagesComponent} from "./main-page/messages/messages.component";
import {AuthComponent} from "./login-page/auth/auth.component";

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    HeaderComponent,
    EntryFormComponent,
    GraphComponent,
    TableComponent,
    MainComponent,
    LogoutComponent,
    MessagesComponent,
    AuthComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    EntryService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {


}
